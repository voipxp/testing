routes.$inject = ['PbsRouteProvider']
export default function routes(PbsRouteProvider) {
  PbsRouteProvider.set([
    {
      path: '/events',
      component: 'odinEvents',
      acl: 'Provisioning-PaasAdmin'
    },
    {
      path: '/events/logins',
      component: 'odinUserLoginIndex',
      acl: 'Provisioning-PaasAdmin'
    },
    {
      path: '/webhooks',
      component: 'odinWebhooks',
      acl: 'Provisioning-PaasAdmin'
    }
  ])
}
