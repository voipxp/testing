import { BulkUserPasswordServiceProvider } from './bulk-user-password-service-provider'
import { BulkUserPasswordUsers } from './bulk-user-password-users'
import { BulkUserPasswordGroup } from './bulk-user-password-group'
import { BulkUserPasswordUpdatePassword } from './bulk-user-password-update-password'

export const menu = [
  {
    name: 'Service Provider',
    localStorageKey: 'BulkSipServiceProvider',
    component: BulkUserPasswordServiceProvider
  },
  {
    name: 'Group',
    localStorageKey: 'BulkSipTrunkingGroup',
    component: BulkUserPasswordGroup
  },
  {
    name: 'Users',
    localStorageKey: 'BulkSelectedUsers',
    component: BulkUserPasswordUsers
  },
  {
    name: 'Passwords',
    localStorageKey: 'BulkSelectedUsers',
    component: BulkUserPasswordUpdatePassword
  }
]
