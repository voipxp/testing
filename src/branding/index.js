;(function() {
  var routes = [
    {
      path: null,
      component: 'brandingHostnames',
      acl: 'Provisioning'
    },
    {
      path: ':hostnameId',
      component: 'brandingHostname',
      acl: 'Provisioning'
    }
  ]
  angular
    .module('odin.branding', ['mp.colorPicker', 'truncate'])
    .config(function(PbsRouteProvider) {
      PbsRouteProvider.set(routes, '/branding')
    })
})()
