import { BulkSipServiceProvider } from './bulk-sip-service-provider'
import { BulkSipTrunkingTrunkEnterprise } from './bulk-sip-trunking-trunk-enterprise'
import { BulkSipTrunkingUsers } from './bulk-sip-trunking-users'
import { BulkSipTrunkingGroup } from './bulk-sip-trunking-group'
import { BulkSipTrunkingTrunkGroups } from './bulk-sip-trunking-trunk-groups'
import { BulkSipTrunkingNumbers } from './bulk-sip-trunking-numbers'
import { BulkSipTrunkingGroupCallCapacity } from './bulk-sip-trunking-group-call-capacity'
import { AssignGroupServices } from './bulk-sip-trunking-group-services'

/* Tasks */
import { BulkSipTrunkingCommonViewTask } from './tasks/bulk-sip-trunking-common-view-task'
import { BulkSipUsersTask } from './tasks/bulk-sip-users-task'
import { BulkSipTrunkingTrunkGroupsTask } from './tasks/bulk-sip-trunking-trunk-groups-task'
import { BulkSipTrunkingGroupServicesTask } from './tasks/bulk-sip-trunking-group-services-task'

export const menu = [
  {
    name: 'Service Provider',
    localStorageKey: 'BulkSipServiceProvider',
    component: BulkSipServiceProvider
    // component: BulkSipTrunkingTrunkGroupsTask
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
    name: 'Group Services',
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
  // {
  //   name: 'Endpoint Type',
  //   localStorageKey: 'BulkEndpointType',
  //   component: BulkEndpointType
  // },
  // {
  //   name: 'Line Port',
  //   localStorageKey: 'BulkLinePort',
  //   component: BulkLinePort
  // },

  /* Same above menu will be appeared for task submission */
  {
    name: 'Service Provider Task',
    localStorageKey: 'BulkSipServiceProvider',
    component: BulkSipTrunkingCommonViewTask
  },
  {
    name: 'Enterprise Trunk Task',
    localStorageKey: 'BulkSipTrunkingTrunkEnterprise',
    component: BulkSipTrunkingCommonViewTask
  },
  {
    name: 'Group Task',
    localStorageKey: 'BulkSipTrunkingGroup',
    component: BulkSipTrunkingCommonViewTask
  },
  {
    name: 'Group Services Task',
    localStorageKey: 'AssignGroupServices',
    component: BulkSipTrunkingGroupServicesTask
  },
  {
    name: 'Group Call Capacity Task',
    localStorageKey: 'BulkSipTrunkingGroupCallCapacity',
    component: BulkSipTrunkingCommonViewTask
  },
  {
    name: 'Group Trunk Task',
    localStorageKey: 'BulkSelectGroupTrunk',
    component: BulkSipTrunkingTrunkGroupsTask
  },
  {
    name: 'Assign Numbers Task',
    localStorageKey: 'BulkSipTrunkingNumbers',
    component: BulkSipTrunkingCommonViewTask
  },
  {
    name: 'Users  Task',
    localStorageKey: 'BulkSelectedUsers',
    component: BulkSipUsersTask
  },
  // {
  //   name: 'Endpoint Type Task',
  //   localStorageKey: 'BulkEndpointType',
  //   component: BulkSipTrunkingCommonViewTask
  // }
  // {
  //   name: 'Line Port',
  //   localStorageKey: 'BulkLinePort',
  //   component: BulkSipTrunkingCommonViewTask
  // }
]
