import { BulkSipServiceProvider } from './bulk-sip-service-provider'
import { BulkSipTrunkingTrunkEnterprise } from './bulk-sip-trunking-trunk-enterprise'
import { BulkSipTrunkingUsers } from './bulk-sip-trunking-users'
import { BulkEndpointType } from '../bulk-endpoint-type'
import { BulkSipTrunkingGroup } from './bulk-sip-trunking-group'
import { BulkMultipleTasksImport } from '../bulk-multiple-tasks-import'
import { BulkSipTrunkingTrunkGroups } from './bulk-sip-trunking-trunk-groups'
import { BulkSipTrunkingNumbers } from './bulk-sip-trunking-numbers'
import { BulkSipTrunkingGroupCallCapacity } from './bulk-sip-trunking-group-call-capacity'

export const menu = [
  {
    name: 'Service Provider',
    localStorageKey: 'BulkSipServiceProvider',
    component: BulkSipServiceProvider
    // component: BulkSipTrunkingNumbers
  },
  {
    name: 'Enterprise Trunk',
    localStorageKey: 'BulkSipTrunkingTrunkEnterprise',
    component: BulkSipTrunkingTrunkEnterprise
  },
  {
    name: 'Group',
    localStorageKey: 'BulkSipTrunkingGroup',
    component: BulkSipTrunkingGroup
  },
  {
    name: 'Group Call Capacity',
    localStorageKey: 'BulkSipTrunkingGroupCallCapacity',
    component: BulkSipTrunkingGroupCallCapacity
  },
  {
    name: 'Group Trunk',
    localStorageKey: 'BulkSelectGroupTrunk',
    component: BulkSipTrunkingTrunkGroups
  },
  {
    name: 'Assign Numbers',
    localStorageKey: 'BulkSipTrunkingNumbers',
    component: BulkSipTrunkingNumbers
  },
  {
    name: 'Users',
    localStorageKey: 'BulkSelectedUsers',
    component: BulkSipTrunkingUsers
  },
  {
    name: 'Endpoint Type',
    localStorageKey: 'BulkEndpointType',
    component: BulkEndpointType
  },
  // {
  //   name: 'Line Port',
  //   localStorageKey: 'BulkLinePort',
  //   component: BulkLinePort
  // },

  /* Same above menu will be appeared for task submission */
  {
    name: 'Service Provider',
    localStorageKey: 'BulkSipServiceProvider',
    component: BulkMultipleTasksImport
  },
  {
    name: 'Enterprise Trunk',
    localStorageKey: 'BulkSipTrunkingTrunkEnterprise',
    component: BulkMultipleTasksImport
  },
  {
    name: 'Group',
    localStorageKey: 'BulkSipTrunkingGroup',
    component: BulkMultipleTasksImport
  },
  {
    name: 'Group Call Capacity',
    localStorageKey: 'BulkSipTrunkingGroupCallCapacity',
    component: BulkMultipleTasksImport
  },
  {
    name: 'Group Trunk',
    localStorageKey: 'BulkSelectGroupTrunk',
    component: BulkMultipleTasksImport
  },
  {
    name: 'Assign Numbers',
    localStorageKey: 'BulkSipTrunkingNumbers',
    component: BulkMultipleTasksImport
  },
  {
    name: 'Users',
    localStorageKey: 'BulkSelectedUsers',
    component: BulkMultipleTasksImport
  },
  {
    name: 'Endpoint Type',
    localStorageKey: 'BulkEndpointType',
    component: BulkMultipleTasksImport
  }
  // {
  //   name: 'Line Port',
  //   localStorageKey: 'BulkLinePort',
  //   component: BulkMultipleTasksImport
  // }
]
