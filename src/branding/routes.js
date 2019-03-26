routes.$inject = ['PbsRouteProvider']
export default function routes(PbsRouteProvider) {
  return PbsRouteProvider.set(
    [
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
    ],
    '/branding'
  )
}
