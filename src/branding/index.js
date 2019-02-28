;(function() {
  var routes = [
    {
      path: null,
      component: 'brandingHostnames',
      acl: 'Provisioning-PaasAdmin'
    },
    {
      path: ':hostnameId',
      component: 'brandingHostname',
      acl: 'Provisioning-PaasAdmin'
    }
  ]
  angular
    .module('odin.branding', ['mp.colorPicker', 'truncate'])
    .config(function(PbsRouteProvider) {
      PbsRouteProvider.set(routes, '/branding')
    })
})()
