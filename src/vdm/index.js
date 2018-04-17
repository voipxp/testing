;(function() {
  var routes = [
    {
      path: null,
      component: 'vdmDashboard',
      acl: 'Provisioning',
      module: 'VDM'
    },
    {
      path: 'templates/:id',
      component: 'vdmTemplate',
      acl: 'Provisioning',
      module: 'VDM'
    },
    {
      path: 'groups/:serviceProviderId/:groupId/vdm',
      component: 'vdmDashboard',
      acl: 'Group',
      module: 'VDM'
    },
    {
      path: 'groups/:serviceProviderId/:groupId/vdm/templates/:id',
      component: 'vdmTemplate',
      acl: 'Group',
      module: 'VDM'
    },
    {
      path:
        'groups/:serviceProviderId/:groupId/vdm/templates/:templateId/:deviceName',
      component: 'vdmDevice',
      acl: 'Group',
      module: 'VDM'
    }
  ]

  angular.module('odin.vdm', []).config(function(PbsRouteProvider) {
    PbsRouteProvider.set('/vdm', routes)
  })
})()
