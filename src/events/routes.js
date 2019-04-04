export default [
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
]
