export default [
  {
    path: '/events',
    component: 'odinEvents',
    acl: 'PaaS Admin'
  },
  {
    path: '/events/logins',
    component: 'odinUserLoginIndex',
    acl: 'PaaS Admin'
  },
  {
    path: '/webhooks',
    component: 'odinWebhooks',
    acl: 'PaaS Admin'
  }
]
