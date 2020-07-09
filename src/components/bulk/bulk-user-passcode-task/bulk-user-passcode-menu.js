import { BulkUserPasscodeServiceProvider } from './bulk-user-passcode-service-provider'
import { BulkUserPasscodeUsers } from './bulk-user-passcode-users'
import { BulkUserPasscodeGroup } from './bulk-user-passcode-group'
import { BulkUserPasscodeUpdatePasscode } from './bulk-user-passcode-update-passcode'

export const menu = [
  {
    name: 'Service Provider',
    localStorageKey: 'BulkSipServiceProvider',
    component: BulkUserPasscodeServiceProvider
  },
  {
    name: 'Group',
    localStorageKey: 'BulkSipTrunkingGroup',
    component: BulkUserPasscodeGroup
  },
  {
    name: 'Users',
    localStorageKey: 'BulkSelectedUsers',
    component: BulkUserPasscodeUsers
  },
  {
    name: 'Passwords',
    localStorageKey: 'BulkSelectedUsers',
    component: BulkUserPasscodeUpdatePasscode
  }
]
