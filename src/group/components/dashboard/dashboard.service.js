/*
  This service simply caches the assigned services and reloads
  them in the background
*/
;(function() {
  angular
    .module('odin.group')
    .factory('GroupDashboardService', GroupDashboardService)

  function GroupDashboardService(
    Module,
    ServiceProviderService,
    GroupPermissionService,
    GroupPolicyService,
    ServiceProviderPolicyService,
    $q,
    ACL
  ) {
    var service = { load: load, prepareCard: prepareCard }
    var Permission
    var _isEnterprise

    return service

    function load(serviceProviderId, groupId) {
      return $q
        .all([
          GroupPolicyService.load(),
          ServiceProviderPolicyService.load(),
          Module.load(),
          loadServiceProvider(serviceProviderId)
        ])
        .then(function() {
          return GroupPermissionService.load(serviceProviderId, groupId)
        })
        .then(function(data) {
          Permission = data
        })
    }

    function loadServiceProvider(serviceProviderId) {
      return ServiceProviderService.show(serviceProviderId).then(function(
        data
      ) {
        _isEnterprise = data.isEnterprise
      })
    }

    function isEnterprise() {
      return !!_isEnterprise
    }

    function prepareCard(card) {
      // check we have the right version
      if (card.version && !ACL.hasVersion(card.version)) return

      // check for admin access
      if (card.admin && !ACL.has('Service Provider')) return

      // check for prov access
      if (card.provisioning && !ACL.has('Provisioning')) return

      // check for isEnterprise requirements
      if (card.isEnterprise && !isEnterprise()) return
      if (card.isEnterprise === false && isEnterprise()) return

      // check service cards
      if (card.service) {
        // check it is assigned and accessible
        card.active = Permission.read(card.service)
        // set the alias and activate it
        card.name = card.name || Module.alias(card.service)
        // only skip below if we are denied access
        if (!card.active) return
      }

      // check modules (PBS stuff)
      if (card.module) {
        // check permissions
        card.active = Module.read(card.module)
        // set the alias and activate it
        card.name = card.name || Module.alias(card.module)
        // only skip below if we are denied access
        if (!card.active) return
      }

      // check for admin policies
      if (card.policy) {
        var func = GroupPolicyService[card.policy]
        if (_.isFunction(func)) {
          card.active = func()
        }
        // only skip below if we are denied access
        if (!card.active) return
      }

      if (card.serviceProviderPolicy) {
        func = ServiceProviderPolicyService[card.serviceProviderPolicy]
        if (_.isFunction(func)) {
          card.active = func()
        }
        // only skip below if we are denied access
        if (!card.active) return
      }

      // everything else is activated
      card.active = true
    }
  }
})()
