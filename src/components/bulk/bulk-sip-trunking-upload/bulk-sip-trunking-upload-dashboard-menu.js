import { BulkSipTrunkingUploadTask } from './bulk-sip-trunking-upload-task'

export const menu = [
  {
    name: 'Service Provider Task',
    localStorageKey: 'BulkSipServiceProvider',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Enterprise Trunk Task',
    localStorageKey: 'BulkSipTrunkingTrunkEnterprise',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Group Task',
    localStorageKey: 'BulkSipTrunkingGroup',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Group Services Task',
    localStorageKey: 'AssignGroupServices',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Group Call Capacity Task',
    localStorageKey: 'BulkSipTrunkingGroupCallCapacity',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Group Trunk Task',
    localStorageKey: 'BulkSelectGroupTrunk',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Assign Numbers Task',
    localStorageKey: 'BulkSipTrunkingNumbers',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Users  Task',
    localStorageKey: 'BulkSelectedUsers',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Trunk Groups Pilot User',
    localStorageKey: 'BulkSipTrunkingTrunkPilotUser',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Users Services Task',
    localStorageKey: 'BulkSipTrunkingUserServices',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Sip Authentication Task',
    localStorageKey: 'BulkSipTrunkingAuthentication',
    component: BulkSipTrunkingUploadTask
  }
]
