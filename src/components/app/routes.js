import { UserDashboard } from '@/components/users'
import { GroupSpeedDial8 } from '../groups/group-speed-dial-8'
import { GroupCommunicationBarring } from '../groups/group-communication-barring'
import { Test1 } from '../test/test-1'
import { Test2 } from '../test/test-2'

export const routes = [
  {
    path: '/account',
    angularComponent: 'myAccount'
  },
  {
    path: '/branding',
    angularComponent: 'brandingHostnames',
    acl: 'PaaS Admin'
  },
  {
    path: '/branding/:hostnameId',
    angularComponent: 'brandingHostname',
    acl: 'PaaS Admin'
  },
  {
    path: '/bulk',
    angularComponent: 'bulkDashboard',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/bulk/csv',
    angularComponent: 'bulkCsv',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/bulk/tasks',
    angularComponent: 'bulkTasksIndex',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/bulk/tasks/:id',
    angularComponent: 'bulkTask',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/bulk/users',
    angularComponent: 'bulkUsers',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/bulk/import',
    angularComponent: 'bulkImport',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/bulk/user.create',
    angularComponent: 'bulkUserCreate',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/bulk/user.delete',
    angularComponent: 'bulkUserDelete',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/bulk/user.services.update',
    angularComponent: 'bulkUserServicesUpdate',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/bulk/user.number.update',
    angularComponent: 'bulkUserNumberUpdate',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/bulk/user.sharedcallappearance.update',
    angularComponent: 'bulkUserSharedCallAppearanceUpdate',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/bulk/user.ucone.update',
    angularComponent: 'bulkUserUcOneUpdate',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/events',
    angularComponent: 'odinEvents',
    acl: 'PaaS Admin'
  },
  {
    path: '/events/logins',
    angularComponent: 'odinUserLoginIndex',
    acl: 'PaaS Admin'
  },
  {
    path: '/webhooks',
    angularComponent: 'odinWebhooks',
    acl: 'PaaS Admin'
  },
  {
    path: '/groups/:serviceProviderId/:groupId',
    angularComponent: 'groupDashboard',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/profile',
    angularComponent: 'groupProfile',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/admins',
    angularComponent: 'groupAdmins',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/devices',
    angularComponent: 'groupDevices',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/deviceTypes',
    angularComponent: 'groupDeviceTypes',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/deviceTypes/deviceType',
    angularComponent: 'groupDeviceType',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/directory',
    angularComponent: 'groupPhoneDirectory',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/phoneList',
    angularComponent: 'groupCommonPhoneList',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/users',
    angularComponent: 'groupUsers',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/announcements',
    angularComponent: 'groupAnnouncements',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/announcements/announcement',
    angularComponent: 'groupAnnouncement',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans',
    angularComponent: 'groupCallingPlans',
    acl: 'Group',
    module: 'Group Calling Plans'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/incoming',
    angularComponent: 'groupIncomingCallingPlan',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/outgoing',
    angularComponent: 'groupOutgoingCallingPlan',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/outgoing/users',
    angularComponent: 'groupOutgoingCallingPlanUsers',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/digitPlan',
    angularComponent: 'groupOutgoingCallingPlanDigitPlan',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/pinholeDigitPlan',
    angularComponent: 'groupOutgoingCallingPlanPinholeDigitPlan',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/codes',
    angularComponent: 'groupOutgoingCallingPlanAuthorizationCodes',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/transfer',
    angularComponent: 'groupOutgoingCallingPlanTransferNumbers',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/digitPatterns',
    angularComponent: 'groupCallingPlanDigitPatterns',
    acl: 'Group'
  },
  {
    path:
      '/groups/:serviceProviderId/:groupId/callingPlans/pinholeDigitPatterns',
    angularComponent: 'groupOutgoingCallingPlanPinholeDigitPatterns',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/collaborate',
    angularComponent: 'groupCollaborate',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/collaborate/bridge',
    angularComponent: 'groupCollaborateBridge',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/anonymousCallRejection',
    angularComponent: 'groupAnonymousCallRejection',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/automaticCallback',
    angularComponent: 'groupAutomaticCallback',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callForwardingAlways',
    angularComponent: 'groupCallForwardingAlways',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callForwardingBusy',
    angularComponent: 'groupCallForwardingBusy',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callForwardingNoAnswer',
    angularComponent: 'groupCallForwardingNoAnswer',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callForwardingNotReachable',
    angularComponent: 'groupCallForwardingNotReachable',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingLineIdDeliveryBlocking',
    angularComponent: 'groupCallingLineIdDeliveryBlocking',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callRecording',
    angularComponent: 'groupCallRecording',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/hotelingGuest',
    angularComponent: 'groupHotelingGuest',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/hotelingHost',
    angularComponent: 'groupHotelingHost',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/voiceMessagingUser',
    angularComponent: 'groupVoiceMessagingUser',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/departments',
    angularComponent: 'groupDepartments',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/departments/department',
    angularComponent: 'groupDepartment',
    acl: 'Group'
  },
  {
    path:
      '/groups/:serviceProviderId/:groupId/groupCommunicationBarringAuthorizationCodes',
    angularComponent: 'groupCommunicationBarringAuthorizationCodes',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/customContactDirectories',
    angularComponent: 'groupCustomContactDirectories',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/autoAttendants',
    angularComponent: 'autoAttendants',
    acl: 'Group',
    module: 'Auto Attendant'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/autoAttendants/autoAttendant',
    angularComponent: 'autoAttendant',
    acl: 'Group',
    module: 'Auto Attendant'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callPickup',
    angularComponent: 'groupCallPickups',
    acl: 'Group',
    module: 'Call Pickup'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callPickup/group',
    angularComponent: 'groupCallPickup',
    acl: 'Group',
    module: 'Call Pickup'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callPark',
    angularComponent: 'groupCallPark',
    acl: 'Group',
    module: 'Call Park'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callPark/group',
    angularComponent: 'groupCallParkGroup',
    acl: 'Group',
    module: 'Call Park'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/enterpriseTrunks',
    angularComponent: 'groupEnterpriseTrunks',
    acl: 'Group',
    module: 'Trunk Group'
  },
  {
    path:
      '/groups/:serviceProviderId/:groupId/enterpriseTrunks/enterpriseTrunk',
    angularComponent: 'groupEnterpriseTrunk',
    acl: 'Group',
    module: 'Trunk Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/trunkGroups',
    angularComponent: 'groupTrunkGroups',
    acl: 'Group',
    module: 'Trunk Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/trunkGroups/trunkGroup',
    angularComponent: 'groupTrunkGroup',
    acl: 'Group',
    module: 'Trunk Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/paging',
    angularComponent: 'groupPagingGroups',
    acl: 'Group',
    module: 'Group Paging'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/paging/group',
    angularComponent: 'groupPagingGroup',
    acl: 'Group',
    module: 'Group Paging'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/huntGroups',
    angularComponent: 'groupHuntGroups',
    acl: 'Group',
    module: 'Hunt Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/huntGroups/huntGroup',
    angularComponent: 'groupHuntGroup',
    acl: 'Group',
    module: 'Hunt Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/meetMe',
    angularComponent: 'groupMeetMe',
    acl: 'Group',
    module: 'Meet-Me Conferencing'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/meetMe/bridge',
    angularComponent: 'groupMeetMeBridge',
    acl: 'Group',
    module: 'Meet-Me Conferencing'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/musicOnHold',
    angularComponent: 'groupMusicOnHoldIndex',
    acl: 'Group',
    module: 'Music On Hold'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/musicOnHold/instance',
    angularComponent: 'groupMusicOnHold',
    acl: 'Group',
    module: 'Music On Hold'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/voiceMessaging',
    angularComponent: 'groupVoiceMessaging',
    acl: 'Group',
    module: 'Voice Messaging Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callRecords/autoAttendant',
    angularComponent: 'autoAttendantCallRecords',
    acl: 'Group',
    module: 'Auto Attendant Report'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callRecords/callCenter',
    angularComponent: 'groupCallCenterCallRecords',
    acl: 'Group',
    module: 'Premium Call Records'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callRecords/userCallReport',
    angularComponent: 'groupUserCallReportIndex',
    acl: 'Group',
    module: 'Premium Call Records'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callRecords/group',
    angularComponent: 'groupCallRecordIndex',
    acl: 'Group',
    module: 'Premium Call Records'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/reports/users',
    angularComponent: 'usersReport',
    acl: 'Group',
    module: 'User Report'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callCenters',
    angularComponent: 'groupCallCenters',
    acl: 'Group',
    module: 'Call Center'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callCenters/callCenter',
    angularComponent: 'groupCallCenter',
    acl: 'Group',
    module: 'Call Center'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/schedules',
    angularComponent: 'groupSchedules',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/schedules/schedule',
    angularComponent: 'groupSchedule',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/viewablePacks',
    angularComponent: 'groupViewablePacksIndex',
    acl: 'Group',
    module: 'Viewable Service Packs'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/services/group',
    angularComponent: 'groupServices',
    acl: 'Service Provider',
    serviceType: 'groupServices'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/services/user',
    angularComponent: 'groupServices',
    acl: 'Service Provider',
    serviceType: 'userServices'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/services/servicePack',
    angularComponent: 'groupServices',
    acl: 'Service Provider',
    serviceType: 'servicePackServices'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/numbers',
    angularComponent: 'groupNumbers',
    acl: 'Service Provider'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/delete',
    angularComponent: 'groupDelete',
    acl: 'Service Provider'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/networkclassofservices',
    angularComponent: 'groupNetworkClassOfServices',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callProcessingPolicy',
    angularComponent: 'groupCallProcessingPolicy',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/intercept',
    angularComponent: 'groupIntercept',
    acl: 'Group',
    module: 'Intercept Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/routingProfile',
    angularComponent: 'groupRoutingProfile',
    acl: 'Group',
    module: 'Routing Profile'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/featureAccessCodes',
    angularComponent: 'groupFeatureAccessCodes',
    acl: 'Group',
    module: 'Group Feature Access Codes'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/nightForwarding',
    angularComponent: 'groupNightForwarding',
    acl: 'Group',
    module: 'Group Night Forwarding'
  },
  {
    path:
      '/groups/:serviceProviderId/:groupId/virtualOnNetEnterpriseExtensions',
    angularComponent: 'groupVirtualOnNetEnterpriseExtensions',
    acl: 'Group',
    module: 'Virtual On-Net Enterprise Extensions'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/flexibleSeatingHosts',
    angularComponent: 'groupFlexibleSeatingHosts',
    acl: 'Group',
    module: 'Flexible Seating Guest'
  },
  {
    path:
      '/groups/:serviceProviderId/:groupId/flexibleSeatingHosts/flexibleSeatingHost',
    angularComponent: 'groupFlexibleSeatingHost',
    acl: 'Group',
    module: 'Flexible Seating Guest'
  },
  {
    path: '/serviceProviders/:serviceProviderId',
    angularComponent: 'serviceProviderDashboard',
    acl: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/profile',
    angularComponent: 'serviceProviderProfile',
    acl: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/groups',
    angularComponent: 'serviceProviderGroupsIndex',
    acl: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/admins',
    angularComponent: 'serviceProviderAdmins',
    acl: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/directory',
    angularComponent: 'serviceProviderPhoneDirectory',
    acl: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/enterpriseTrunks',
    angularComponent: 'enterpriseEnterpriseTrunks',
    acl: 'Service Provider',
    module: 'Trunk Group'
  },
  {
    path:
      '/serviceProviders/:serviceProviderId/enterpriseTrunks/enterpriseTrunk',
    angularComponent: 'enterpriseEnterpriseTrunk',
    acl: 'Service Provider',
    module: 'Trunk Group'
  },
  {
    path: '/serviceProviders/:serviceProviderId/meetMe',
    angularComponent: 'serviceProviderMeetMe',
    acl: 'Service Provider',
    module: 'Meet-Me Conferencing'
  },
  {
    path: '/serviceProviders/:serviceProviderId/numbers',
    angularComponent: 'serviceProviderNumbers',
    acl: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/devices',
    angularComponent: 'serviceProviderDevices',
    acl: 'Provisioning'
  },
  {
    path: '/serviceProviders/:serviceProviderId/delete',
    angularComponent: 'serviceProviderDelete',
    acl: 'Provisioning'
  },
  {
    path: '/serviceProviders/:serviceProviderId/userServices',
    angularComponent: 'serviceProviderServices',
    acl: 'Service Provider',
    serviceType: 'userServices'
  },
  {
    path: '/serviceProviders/:serviceProviderId/groupServices',
    angularComponent: 'serviceProviderServices',
    acl: 'Service Provider',
    serviceType: 'groupServices'
  },
  {
    path: '/serviceProviders/:serviceProviderId/servicePacks',
    angularComponent: 'serviceProviderServicePacks',
    acl: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/servicePacks/servicePack',
    angularComponent: 'serviceProviderServicePack',
    acl: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/networkClassOfServices',
    angularComponent: 'serviceProviderNetworkClassOfServices',
    acl: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/reports/users',
    angularComponent: 'usersReport',
    acl: 'Service Provider',
    module: 'User Report'
  },
  {
    path: '/serviceProviders/:serviceProviderId/reports/callCapacity',
    angularComponent: 'serviceProviderTrunkGroupsCallCapacityReport',
    acl: 'Service Provider',
    module: 'User Report'
  },
  {
    path: '/settings',
    angularComponent: 'odinSettings',
    acl: 'PaaS Admin'
  },
  {
    path: '/system',
    angularComponent: 'systemDashboard',
    acl: 'Provisioning'
  },
  {
    path: '/system/devices',
    angularComponent: 'systemDevices',
    acl: 'System'
  },
  {
    path: '/system/licensing',
    angularComponent: 'systemLicensing',
    acl: 'System'
  },
  {
    path: '/system/dn',
    angularComponent: 'systemDn',
    acl: 'Provisioning'
  },
  {
    path: '/system/collaborate',
    angularComponent: 'systemCollaborate',
    acl: 'System'
  },
  {
    path: '/system/networkClassOfServices',
    angularComponent: 'systemNetworkClassOfServices',
    acl: 'System'
  },
  {
    path: '/system/networkClassOfServices/networkClassOfService',
    angularComponent: 'systemNetworkClassOfService',
    acl: 'System'
  },
  {
    path: '/system/serviceProvidersReport',
    angularComponent: 'serviceProviderReport',
    acl: 'Provisioning',
    module: 'User Report'
  },
  {
    path: '/system/servicePackUtilizationReport',
    angularComponent: 'systemServicePackUtilizationReport',
    acl: 'Provisioning',
    module: 'User Report'
  },
  {
    path: '/system/systemServiceUtilizationReport',
    angularComponent: 'systemServiceUtilizationReport',
    acl: 'Provisioning',
    module: 'User Report'
  },
  {
    path: '/serviceProviders',
    angularComponent: 'serviceProviders',
    acl: 'Provisioning'
  },
  {
    path: '/vdm',
    angularComponent: 'vdmDashboard',
    acl: 'Provisioning',
    module: 'VDM'
  },
  {
    path: '/vdm/templates/:id',
    angularComponent: 'vdmTemplate',
    acl: 'Provisioning',
    module: 'VDM'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/vdm',
    angularComponent: 'vdmDashboard',
    acl: 'Group',
    module: 'VDM'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/vdm/templates/:id',
    angularComponent: 'vdmTemplate',
    acl: 'Group',
    module: 'VDM'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/vdm/templates/:id/device',
    angularComponent: 'vdmDevice',
    acl: 'Group',
    module: 'VDM'
  },
  {
    path: '/users/:serviceProviderId/:groupId/:userId',
    component: UserDashboard
  },
  {
    path: '/groups/:serviceProviderId/:groupId/speedDial8',
    component: GroupSpeedDial8
  },
  {
    path: '/groups/:serviceProviderId/:groupId/groupCommunicationBarring',
    component: GroupCommunicationBarring
  },
  {
    path: '/test-1',
    component: Test1
  },
  {
    path: '/test-2',
    component: Test2
  }
]
