import { BulkSipServiceProvider } from './bulk-sip-service-provider'
import { BulkSipTrunkingTrunkEnterprise } from './bulk-sip-trunking-trunk-enterprise'
import { BulkSipTrunkingUsers } from './bulk-sip-trunking-users'
import { BulkEndpointType } from '../bulk-endpoint-type'
import { BulkSipTrunkingGroup } from './bulk-sip-trunking-group'
import { BulkMultipleTasksImport } from '../bulk-multiple-tasks-import'
import { BulkSipTrunkingTrunkGroups } from './bulk-sip-trunking-trunk-groups'
import { BulkSipTrunkingNumbers } from './bulk-sip-trunking-numbers'
import { BulkSipTrunkingGroupCallCapacity } from './bulk-sip-trunking-group-call-capacity'
import { AssignGroupServices } from './bulk-sip-trunking-group-services'
export const menu = [
  {
    name: 'Service Provider',
    localStorageKey: 'BulkSipServiceProvider',
    component: BulkSipServiceProvider
    // component: BulkSipTrunkingUsers
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
    name: 'Assign Group Services',
    localStorageKey: 'AssignGroupServices',
    component: AssignGroupServices
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
    name: 'Service Provider Task',
    localStorageKey: 'BulkSipServiceProvider',
    component: BulkMultipleTasksImport
  },
  {
    name: 'Enterprise Trunk Task',
    localStorageKey: 'BulkSipTrunkingTrunkEnterprise',
    component: BulkMultipleTasksImport
  },
  {
    name: 'Group Task',
    localStorageKey: 'BulkSipTrunkingGroup',
    component: BulkMultipleTasksImport
  },
  {
    name: 'Assign Group Services Task',
    localStorageKey: 'AssignGroupServices',
    component: BulkMultipleTasksImport
  },
  {
    name: 'Group Call Capacity Task',
    localStorageKey: 'BulkSipTrunkingGroupCallCapacity',
    component: BulkMultipleTasksImport
  },
  {
    name: 'Group Trunk Task',
    localStorageKey: 'BulkSelectGroupTrunk',
    component: BulkMultipleTasksImport
  },
  {
    name: 'Assign Numbers Task',
    localStorageKey: 'BulkSipTrunkingNumbers',
    component: BulkMultipleTasksImport
  },
  {
    name: 'Users  Task',
    localStorageKey: 'BulkSelectedUsers',
    component: BulkMultipleTasksImport
  },
  {
    name: 'Endpoint Type Task',
    localStorageKey: 'BulkEndpointType',
    component: BulkMultipleTasksImport
  }
  // {
  //   name: 'Line Port',
  //   localStorageKey: 'BulkLinePort',
  //   component: BulkMultipleTasksImport
  // }
]
