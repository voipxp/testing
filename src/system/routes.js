export default [
  {
    path: '/system',
    component: 'systemDashboard',
    acl: 'Provisioning'
  },
  {
    path: '/system/devices',
    component: 'systemDevices',
    acl: 'System'
  },
  {
    path: '/system/licensing',
    component: 'systemLicensing',
    acl: 'System'
  },
  {
    path: '/system/dn',
    component: 'systemDn',
    acl: 'Provisioning'
  },
  {
    path: '/system/collaborate',
    component: 'systemCollaborate',
    acl: 'System'
  },
  {
    path: '/system/networkClassOfServices',
    component: 'systemNetworkClassOfServices',
    acl: 'System'
  },
  {
    path: '/system/networkClassOfServices/networkClassOfService',
    component: 'systemNetworkClassOfService',
    acl: 'System'
  },
  {
    path: '/system/serviceProvidersReport',
    component: 'serviceProviderReport',
    acl: 'Provisioning',
    module: 'User Report'
  },
  {
    path: '/serviceProviders',
    component: 'serviceProvidersIndex',
    acl: 'Provisioning'
  }
]
