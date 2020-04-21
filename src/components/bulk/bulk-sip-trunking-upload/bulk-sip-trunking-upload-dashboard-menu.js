import { BulkSipTrunkingUploadTask } from './bulk-sip-trunking-upload-task'
// import { BulkSipTrunkingTrunkGroupsTask } from './bulk-sip-trunking-trunk-groups-task'
import { BulkSipTrunkingAuthWizTask } from './bulk-sip-trunking-auth-wiz-task'

export const menu = [
  {
    name: 'service.provider.bulk.clone',
    task: 'service.provider.bulk.clone',
    localStorageKey: 'BulkSipServiceProviderWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'trunk.group.call.capacity (Enterprise)',
    task: 'trunk.group.call.capacity',
    localStorageKey: 'BulkSipTrunkingTrunkEnterpriseWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'group.bulk.clone',
    task: 'group.bulk.clone',
    localStorageKey: 'BulkSipTrunkingGroupWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'group.services.update',
    task: 'group.services.update',
    localStorageKey: 'AssignGroupServicesWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'trunk.group.call.capacity (Group)',
    task: 'trunk.group.call.capacity',
    localStorageKey: 'BulkSipTrunkingGroupCallCapacityWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'group.device.upsert',
    task: 'group.device.upsert',
    localStorageKey: 'GroupDeviceCreateWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'group.trunk.group.create',
    task: 'group.trunk.group.create',
    localStorageKey: 'BulkSelectGroupTrunkWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'group.dns.assign',
    task: 'group.dns.assign',
    localStorageKey: 'BulkSipTrunkingNumbersWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'user.create',
    task: 'user.create',
    localStorageKey: 'BulkSelectedUsersWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'group.trunk.group.update',
    task: 'group.trunk.group.update',
    localStorageKey: 'BulkSipTrunkingTrunkPilotUserWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'user.services.update',
    task: 'user.services.update',
    localStorageKey: 'BulkSipTrunkingUserServicesWiz',
    component: BulkSipTrunkingUploadTask
  },
  {
    name: 'user.authentication.update',
    task: 'user.authentication.update',
    localStorageKey: 'BulkSipTrunkingAuthenticationWiz',
    component: BulkSipTrunkingAuthWizTask
  }
]
