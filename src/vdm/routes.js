export default [
  {
    path: '/vdm',
    component: 'vdmDashboard',
    acl: 'Provisioning',
    module: 'VDM'
  },
  {
    path: '/vdm/templates/:id',
    component: 'vdmTemplate',
    acl: 'Provisioning',
    module: 'VDM'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/vdm',
    component: 'vdmDashboard',
    acl: 'Group',
    module: 'VDM'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/vdm/templates/:id',
    component: 'vdmTemplate',
    acl: 'Group',
    module: 'VDM'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/vdm/templates/:id/device',
    component: 'vdmDevice',
    acl: 'Group',
    module: 'VDM'
  }
]
