// Get last selected set of users to inject into component
data.$inject = ['BulkUsersService', '$q']
async function data(BulkUsersService, $q) {
  const results = await BulkUsersService.get()
  return results.users.length > 0 ? results : $q.reject('routeToSelect')
}

export default [
  {
    path: '/bulk',
    component: 'bulkDashboard',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/bulk/csv',
    component: 'bulkCsv',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/bulk/tasks',
    component: 'bulkTasksIndex',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/bulk/tasks/:id',
    component: 'bulkTask',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/bulk/users',
    component: 'bulkUsers',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/bulk/import',
    component: 'bulkImport',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/bulk/user.create',
    component: 'bulkUserCreate',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/bulk/user.delete',
    component: 'bulkUserDelete',
    acl: 'Group',
    module: 'Provisioning',
    resolve: { data }
  },
  {
    path: '/bulk/user.services.update',
    component: 'bulkUserServicesUpdate',
    acl: 'Group',
    module: 'Provisioning',
    resolve: { data }
  },
  {
    path: '/bulk/user.number.update',
    component: 'bulkUserNumberUpdate',
    acl: 'Group',
    module: 'Provisioning',
    resolve: { data }
  },
  {
    path: '/bulk/user.sharedcallappearance.update',
    component: 'bulkUserSharedCallAppearanceUpdate',
    acl: 'Group',
    module: 'Provisioning',
    resolve: { data }
  },
  {
    path: '/bulk/user.ucone.update',
    component: 'bulkUserUcOneUpdate',
    acl: 'Group',
    module: 'Provisioning',
    resolve: { data }
  }
]
