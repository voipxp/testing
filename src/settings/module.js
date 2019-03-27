import angular from 'angular'

routes.$inject = ['PbsRouteProvider']
function routes(PbsRouteProvider) {
  PbsRouteProvider.set([
    {
      path: '/settings',
      component: 'odinSettings',
      acl: 'Provisioning-PaasAdmin'
    }
  ])
}

angular.module('odin.settings', []).config(routes)
