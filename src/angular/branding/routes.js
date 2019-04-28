export default [
  {
    path: '/branding',
    component: 'brandingHostnames',
    acl: 'PaaS Admin'
  },
  {
    path: '/branding/:hostnameId',
    component: 'brandingHostname',
    acl: 'PaaS Admin'
  }
]
