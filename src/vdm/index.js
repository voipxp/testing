;(function() {
  function acl(type) {
    return function(ACL) {
      'ngInject'
      return ACL.allow(type)
    }
  }
  function module(name) {
    return function(Module) {
      'ngInject'
      return Module.allow(name)
    }
  }

  angular.module('odin.vdm', [])

  angular.module('odin.vdm').config(function routeConfig($routeProvider) {
    $routeProvider
      .when('/vdm', {
        template: '<vdm-dashboard module="$resolve.module"></vdm-dashboard>',
        resolve: {
          acl: acl('Provisioning'),
          module: module('VDM')
        }
      })
      .when('/vdm/templates/:id', {
        template: '<vdm-template module="$resolve.module"></vdm-template>',
        resolve: {
          acl: acl('Provisioning'),
          module: module('VDM')
        }
      })
      .when('/groups/:serviceProviderId/:groupId/vdm', {
        template: '<vdm-dashboard module="$resolve.module"></vdm-dashboard>',
        resolve: {
          acl: acl('Group'),
          module: module('VDM')
        }
      })
      .when('/groups/:serviceProviderId/:groupId/vdm/templates/:id', {
        template: '<vdm-template module="$resolve.module"></vdm-template>',
        resolve: {
          acl: acl('Group'),
          module: module('VDM')
        }
      })
      .when(
        '/groups/:serviceProviderId/:groupId/vdm/templates/:templateId/:deviceName',
        {
          template: '<vdm-device module="$resolve.module"></vdm-device>',
          resolve: {
            acl: acl('Group'),
            module: module('VDM')
          }
        }
      )
  })
})()
