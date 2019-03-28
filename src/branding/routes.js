export default [
  {
    path: '/branding',
    component: 'brandingHostnames',
    acl: 'Provisioning-PaasAdmin'
  },
  {
    path: '/branding/:hostnameId',
    component: 'brandingHostname',
    acl: 'Provisioning-PaasAdmin'
  }
]
