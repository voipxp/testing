import { BulkSipTrunkingUploadTask } from './bulk-sip-trunking-upload-task'
// import { BulkSipTrunkingTrunkGroupsTask } from './bulk-sip-trunking-trunk-groups-task'
import { BulkSipTrunkingAuthWizTask } from './bulk-sip-trunking-auth-wiz-task'

export const menu = [
  {
    name: 'Service Provider Task',
    task: 'service.provider.bulk.clone',
    localStorageKey: 'BulkSipServiceProviderWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Enterprise Trunk Task',
    task: 'trunk.group.call.capacity',
    localStorageKey: 'BulkSipTrunkingTrunkEnterpriseWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Group Task',
    task: 'group.bulk.clone',
    localStorageKey: 'BulkSipTrunkingGroupWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Group Services Task',
    task: 'group.services.update',
    localStorageKey: 'AssignGroupServicesWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Group Call Capacity Task',
    task: 'trunk.group.call.capacity',
    localStorageKey: 'BulkSipTrunkingGroupCallCapacityWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Group Device Create',
    task: 'group.device.create',
    localStorageKey: 'GroupDeviceCreateWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Group Trunk Task',
    task: 'group.trunk.group.create',
    localStorageKey: 'BulkSelectGroupTrunkWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Assign Numbers Task',
    task: 'group.dns.assign',
    localStorageKey: 'BulkSipTrunkingNumbersWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Users  Task',
    task: 'user.create',
    localStorageKey: 'BulkSelectedUsersWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Trunk Groups Pilot User',
    task: 'group.trunk.group.update',
    localStorageKey: 'BulkSipTrunkingTrunkPilotUserWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Users Services Task',
    task: 'user.services.update',
    localStorageKey: 'BulkSipTrunkingUserServicesWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'Sip Authentication Task',
    task: 'user.authentication.update',
    localStorageKey: 'BulkSipTrunkingAuthenticationWiz',
    component: BulkSipTrunkingAuthWizTask
  }
]
