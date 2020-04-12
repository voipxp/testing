import { UserDashboard } from '@/components/users'
import { DepartmentDashboard } from '@/components/departments'
import { CreateAutoAttendant } from '@/components/autoAttendant'
import {
  ServiceProviderDashboard
} from '@/components/service-provider'
import {
  GroupCommunicationBarring,
  GroupSpeedDial8,
  GroupExtensionLength,
  GroupWebPolicy,
  GroupNumbers,
  GroupSeriesCompletion
} from '@/components/groups'
import { SystemResellers } from '../system'
import { ResellerDashboard } from '@/components/resellers'
import { Audits, Audit } from '@/components/audits'
import { Imports, Import } from '@/components/imports'
import { Exports, Export } from '@/components/exports'

export const routes = [
  {
    path: '/account',
    angularComponent: 'myAccount'
  },
  {
    path: '/branding',
    angularComponent: 'brandingHostnames',
    isPaasAdmin: true
  },
  {
    path: '/branding/:hostnameId',
    angularComponent: 'brandingHostname',
    isPaasAdmin: true
  },
  {
    path: '/bulk',
    angularComponent: 'bulkDashboard',
    hasLevel: 'Group Department',
    hasModuleRead: 'Provisioning'
  },
  {
    path: '/bulk/csv',
    angularComponent: 'bulkCsv',
    hasLevel: 'Group',
    hasModuleRead: 'Provisioning'
  },
  {
    path: '/bulk/tasks',
    angularComponent: 'bulkTasksIndex',
    hasLevel: 'Group',
    hasModuleRead: 'Provisioning'
  },
  {
    path: '/bulk/tasks/:id',
    angularComponent: 'bulkTask',
    hasLevel: 'Group Department',
    hasModuleRead: 'Provisioning'
  },
  {
    path: '/bulk/users',
    angularComponent: 'bulkUsers',
    hasLevel: 'Group',
    hasModuleRead: 'Provisioning'
  },
  {
    path: '/bulk/import',
    angularComponent: 'bulkImport',
    hasLevel: 'Group Department',
    hasModuleRead: 'Provisioning'
  },
  {
    path: '/bulk/user.create',
    angularComponent: 'bulkUserCreate',
    hasLevel: 'Group Department',
    hasModuleRead: 'Provisioning'
  },
  {
    path: '/bulk/user.delete',
    angularComponent: 'bulkUserDelete',
    hasLevel: 'Group',
    hasModuleRead: 'Provisioning'
  },
  {
    path: '/bulk/user.move',
    angularComponent: 'bulkUserMove',
    hasLevel: 'Provisioning',
    hasModuleRead: 'Provisioning'
  },
  {
    path: '/bulk/user.services.update',
    angularComponent: 'bulkUserServicesUpdate',
    hasLevel: 'Group',
    hasModuleRead: 'Provisioning'
  },
  {
    path: '/bulk/user.number.update',
    angularComponent: 'bulkUserNumberUpdate',
    hasLevel: 'Group',
    hasModuleRead: 'Provisioning'
  },
  {
    path: '/bulk/user.sharedcallappearance.update',
    angularComponent: 'bulkUserSharedCallAppearanceUpdate',
    hasLevel: 'Group',
    hasModuleRead: 'Provisioning'
  },
  {
    path: '/bulk/user.ucone.update',
    angularComponent: 'bulkUserUcOneUpdate',
    hasLevel: 'Group',
    hasModuleRead: 'Provisioning'
  },
  {
    path: '/bulk/user.authentication.update',
    angularComponent: 'bulkUserAuthenticationUpdate',
    hasLevel: 'Group',
    hasModuleRead: 'Provisioning'
  },
  {
    path: '/bulk/user.integrated.imp.update',
    angularComponent: 'bulkUserIntegratedImpUpdate',
    hasLevel: 'Group',
    hasModuleRead: 'Provisioning'
  },

  {
    path: '/events',
    angularComponent: 'odinEvents',
    isPaasAdmin: true
  },
  {
    path: '/events/logins',
    angularComponent: 'odinUserLoginIndex',
    isPaasAdmin: true
  },
  {
    path: '/webhooks',
    angularComponent: 'odinWebhooks',
    isPaasAdmin: true
  },
  {
    path: '/groups/:serviceProviderId/:groupId',
    angularComponent: 'groupDashboard',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/profile',
    angularComponent: 'groupProfile',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/admins',
    angularComponent: 'groupAdmins',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/devices',
    angularComponent: 'groupDevices',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/devices/:deviceName',
    angularComponent: 'groupDevice',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/deviceTypes',
    angularComponent: 'groupDeviceTypes',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/deviceTypes/deviceType',
    angularComponent: 'groupDeviceType',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/directory',
    angularComponent: 'groupPhoneDirectory',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/phoneList',
    angularComponent: 'groupCommonPhoneList',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/users',
    angularComponent: 'groupUsers',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/announcements',
    angularComponent: 'groupAnnouncements',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/announcements/announcement',
    angularComponent: 'groupAnnouncement',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans',
    angularComponent: 'groupCallingPlans',
    hasLevel: 'Group',
    hasModuleRead: 'Group Calling Plans'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/incoming',
    angularComponent: 'groupIncomingCallingPlan',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/outgoing',
    angularComponent: 'groupOutgoingCallingPlan',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/outgoing/users',
    angularComponent: 'groupOutgoingCallingPlanUsers',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/digitPlan',
    angularComponent: 'groupOutgoingCallingPlanDigitPlan',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/pinholeDigitPlan',
    angularComponent: 'groupOutgoingCallingPlanPinholeDigitPlan',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/codes',
    angularComponent: 'groupOutgoingCallingPlanAuthorizationCodes',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/transfer',
    angularComponent: 'groupOutgoingCallingPlanTransferNumbers',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/digitPatterns',
    angularComponent: 'groupCallingPlanDigitPatterns',
    hasLevel: 'Group'
  },
  {
    path:
      '/groups/:serviceProviderId/:groupId/callingPlans/pinholeDigitPatterns',
    angularComponent: 'groupOutgoingCallingPlanPinholeDigitPatterns',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/collaborate',
    angularComponent: 'groupCollaborate',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/collaborate/bridge',
    angularComponent: 'groupCollaborateBridge',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/anonymousCallRejection',
    angularComponent: 'groupAnonymousCallRejection',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/automaticCallback',
    angularComponent: 'groupAutomaticCallback',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callForwardingAlways',
    angularComponent: 'groupCallForwardingAlways',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callForwardingBusy',
    angularComponent: 'groupCallForwardingBusy',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callForwardingNoAnswer',
    angularComponent: 'groupCallForwardingNoAnswer',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callForwardingNotReachable',
    angularComponent: 'groupCallForwardingNotReachable',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingLineIdDeliveryBlocking',
    angularComponent: 'groupCallingLineIdDeliveryBlocking',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callRecording',
    angularComponent: 'groupCallRecording',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/hotelingGuest',
    angularComponent: 'groupHotelingGuest',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/hotelingHost',
    angularComponent: 'groupHotelingHost',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/voiceMessagingUser',
    angularComponent: 'groupVoiceMessagingUser',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/departments',
    angularComponent: 'groupDepartments',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/departments/department',
    angularComponent: 'groupDepartment',
    hasLevel: 'Group'
  },
  {
    path:
      '/groups/:serviceProviderId/:groupId/groupCommunicationBarringAuthorizationCodes',
    angularComponent: 'groupCommunicationBarringAuthorizationCodes',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/customContactDirectories',
    angularComponent: 'groupCustomContactDirectories',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/autoAttendants',
    angularComponent: 'autoAttendants',
    hasLevel: 'Group',
    hasModuleRead: 'Auto Attendant'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/autoAttendants/autoAttendant',
    angularComponent: 'autoAttendant',
    hasLevel: 'Group Department',
    hasModuleRead: 'Auto Attendant'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callPickup',
    angularComponent: 'groupCallPickups',
    hasLevel: 'Group',
    hasModuleRead: 'Call Pickup'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/seriesCompletion',
    component: GroupSeriesCompletion,
    hasLevel: 'Group',
    hasModuleRead: 'Series Completion'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callPickup/group',
    angularComponent: 'groupCallPickup',
    hasLevel: 'Group',
    hasModuleRead: 'Call Pickup'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callPark',
    angularComponent: 'groupCallPark',
    hasLevel: 'Group',
    hasModuleRead: 'Call Park'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callPark/group',
    angularComponent: 'groupCallParkGroup',
    hasLevel: 'Group',
    hasModuleRead: 'Call Park'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/enterpriseTrunks',
    angularComponent: 'groupEnterpriseTrunks',
    hasLevel: 'Group',
    hasModuleRead: 'Trunk Group'
  },
  {
    path:
      '/groups/:serviceProviderId/:groupId/enterpriseTrunks/enterpriseTrunk',
    angularComponent: 'groupEnterpriseTrunk',
    hasLevel: 'Group',
    hasModuleRead: 'Trunk Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/trunkGroups',
    angularComponent: 'groupTrunkGroups',
    hasLevel: 'Group',
    hasModuleRead: 'Trunk Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/trunkGroups/trunkGroup',
    angularComponent: 'groupTrunkGroup',
    hasLevel: 'Group Department',
    hasModuleRead: 'Trunk Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/paging',
    angularComponent: 'groupPagingGroups',
    hasLevel: 'Group',
    hasModuleRead: 'Group Paging'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/paging/group',
    angularComponent: 'groupPagingGroup',
    hasLevel: 'Group Department',
    hasModuleRead: 'Group Paging'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/huntGroups',
    angularComponent: 'groupHuntGroups',
    hasLevel: 'Group',
    hasModuleRead: 'Hunt Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/huntGroups/huntGroup',
    angularComponent: 'groupHuntGroup',
    hasLevel: 'Group Department',
    hasModuleRead: 'Hunt Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/meetMe',
    angularComponent: 'groupMeetMe',
    hasLevel: 'Group',
    hasModuleRead: 'Meet-Me Conferencing'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/meetMe/bridge',
    angularComponent: 'groupMeetMeBridge',
    hasLevel: 'Group Department',
    hasModuleRead: 'Meet-Me Conferencing'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/musicOnHold',
    angularComponent: 'groupMusicOnHoldIndex',
    hasLevel: 'Group',
    hasModuleRead: 'Music On Hold'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/musicOnHold/instance',
    angularComponent: 'groupMusicOnHold',
    hasLevel: 'Group Department',
    hasModuleRead: 'Music On Hold'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/voiceMessaging',
    angularComponent: 'groupVoiceMessaging',
    hasLevel: 'Group',
    hasModuleRead: 'Voice Messaging Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callRecords/autoAttendant',
    angularComponent: 'autoAttendantCallRecords',
    hasLevel: 'Group',
    hasModuleRead: 'Auto Attendant Report'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callRecords/callCenter',
    angularComponent: 'groupCallCenterCallRecords',
    hasLevel: 'Group',
    hasModuleRead: 'Premium Call Records'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callRecords/userCallReport',
    angularComponent: 'groupUserCallReportIndex',
    hasLevel: 'Group',
    hasModuleRead: 'Premium Call Records'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callRecords/group',
    angularComponent: 'groupCallRecordIndex',
    hasLevel: 'Group',
    hasModuleRead: 'Premium Call Records'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/reports/users',
    angularComponent: 'usersReport',
    hasLevel: 'Group',
    hasModuleRead: 'User Report'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callCenters',
    angularComponent: 'groupCallCenters',
    hasLevel: 'Group',
    hasModuleRead: 'Call Center'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callCenters/callCenter',
    angularComponent: 'groupCallCenter',
    hasLevel: 'Group Department',
    hasModuleRead: 'Call Center'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/schedules',
    angularComponent: 'groupSchedules',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/schedules/schedule',
    angularComponent: 'groupSchedule',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/viewablePacks',
    angularComponent: 'groupViewablePacksIndex',
    hasLevel: 'Group',
    hasModuleRead: 'Viewable Service Packs'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/services/group',
    angularComponent: 'groupServices',
    hasLevel: 'Service Provider',
    serviceType: 'groupServices'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/services/user',
    angularComponent: 'groupServices',
    hasLevel: 'Service Provider',
    serviceType: 'userServices'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/services/servicePack',
    angularComponent: 'groupServices',
    hasLevel: 'Service Provider',
    serviceType: 'servicePackServices'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/assignNumbers',
    angularComponent: 'groupNumbers',
    hasLevel: 'Service Provider'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/numbers',
    component: GroupNumbers,
    hasLevel: 'Service Provider'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/delete',
    angularComponent: 'groupDelete',
    hasLevel: 'Service Provider'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/networkclassofservices',
    angularComponent: 'groupNetworkClassOfServices',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callProcessingPolicy',
    angularComponent: 'groupCallProcessingPolicy',
    hasLevel: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/intercept',
    angularComponent: 'groupIntercept',
    hasLevel: 'Group',
    hasModuleRead: 'Intercept Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/routingProfile',
    angularComponent: 'groupRoutingProfile',
    hasLevel: 'Group',
    hasModuleRead: 'Routing Profile'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/featureAccessCodes',
    angularComponent: 'groupFeatureAccessCodes',
    hasLevel: 'Group',
    hasModuleRead: 'Group Feature Access Codes'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/nightForwarding',
    angularComponent: 'groupNightForwarding',
    hasLevel: 'Group',
    hasModuleRead: 'Group Night Forwarding'
  },
  {
    path:
      '/groups/:serviceProviderId/:groupId/virtualOnNetEnterpriseExtensions',
    angularComponent: 'groupVirtualOnNetEnterpriseExtensions',
    hasLevel: 'Group',
    hasModuleRead: 'Virtual On-Net Enterprise Extensions'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/flexibleSeatingHosts',
    angularComponent: 'groupFlexibleSeatingHosts',
    hasLevel: 'Group',
    hasModuleRead: 'Flexible Seating Guest'
  },
  {
    path:
      '/groups/:serviceProviderId/:groupId/flexibleSeatingHosts/flexibleSeatingHost',
    angularComponent: 'groupFlexibleSeatingHost',
    hasLevel: 'Group Department',
    hasModuleRead: 'Flexible Seating Guest'
  },
  {
    path: '/serviceProviders/:serviceProviderId',
    component: ServiceProviderDashboard,
    hasLevel: 'Group'
  },
  {
    path: '/serviceProviders/:serviceProviderId/profile',
    angularComponent: 'serviceProviderProfile',
    hasLevel: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/groups',
    angularComponent: 'serviceProviderGroupsIndex',
    hasLevel: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/admins',
    angularComponent: 'serviceProviderAdmins',
    hasLevel: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/directory',
    angularComponent: 'serviceProviderPhoneDirectory',
    hasLevel: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/enterpriseTrunks',
    angularComponent: 'enterpriseEnterpriseTrunks',
    hasLevel: 'Service Provider',
    hasModuleRead: 'Trunk Group'
  },
  {
    path:
      '/serviceProviders/:serviceProviderId/enterpriseTrunks/enterpriseTrunk',
    angularComponent: 'enterpriseEnterpriseTrunk',
    hasLevel: 'Service Provider',
    hasModuleRead: 'Trunk Group'
  },
  {
    path: '/serviceProviders/:serviceProviderId/meetMe',
    angularComponent: 'serviceProviderMeetMe',
    hasLevel: 'Service Provider',
    hasModuleRead: 'Meet-Me Conferencing'
  },
  {
    path: '/serviceProviders/:serviceProviderId/numbers',
    angularComponent: 'serviceProviderNumbers',
    hasLevel: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/devices',
    angularComponent: 'serviceProviderDevices',
    hasLevel: 'Reseller'
  },
  {
    path: '/serviceProviders/:serviceProviderId/delete',
    angularComponent: 'serviceProviderDelete',
    hasLevel: 'Reseller'
  },
  {
    path: '/serviceProviders/:serviceProviderId/userServices',
    angularComponent: 'serviceProviderServices',
    hasLevel: 'Service Provider',
    serviceType: 'userServices'
  },
  {
    path: '/serviceProviders/:serviceProviderId/groupServices',
    angularComponent: 'serviceProviderServices',
    hasLevel: 'Service Provider',
    serviceType: 'groupServices'
  },
  {
    path: '/serviceProviders/:serviceProviderId/servicePacks',
    angularComponent: 'serviceProviderServicePacks',
    hasLevel: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/servicePacks/servicePack',
    angularComponent: 'serviceProviderServicePack',
    hasLevel: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/networkClassOfServices',
    angularComponent: 'serviceProviderNetworkClassOfServices',
    hasLevel: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/reports/users',
    angularComponent: 'usersReport',
    hasLevel: 'Service Provider',
    hasModuleRead: 'User Report'
  },
  {
    path: '/serviceProviders/:serviceProviderId/reports/callCapacity',
    angularComponent: 'serviceProviderTrunkGroupsCallCapacityReport',
    hasLevel: 'Service Provider',
    hasModuleRead: 'User Report'
  },
  {
    path: '/settings',
    angularComponent: 'odinSettings',
    isPaasAdmin: true
  },
  {
    path: '/system',
    angularComponent: 'systemDashboard',
    hasLevel: 'Provisioning'
  },
  {
    path: '/system/devices',
    angularComponent: 'systemDevices',
    hasLevel: 'System'
  },
  {
    path: '/system/licensing',
    angularComponent: 'systemLicensing',
    hasLevel: 'System'
  },
  {
    path: '/system/dn',
    angularComponent: 'systemDn',
    hasLevel: 'Provisioning'
  },
  {
    path: '/system/collaborate',
    angularComponent: 'systemCollaborate',
    hasLevel: 'System'
  },
  {
    path: '/system/networkClassOfServices',
    angularComponent: 'systemNetworkClassOfServices',
    hasLevel: 'System'
  },
  {
    path: '/system/networkClassOfServices/networkClassOfService',
    angularComponent: 'systemNetworkClassOfService',
    hasLevel: 'System'
  },
  {
    path: '/system/serviceProvidersReport',
    angularComponent: 'serviceProviderReport',
    hasLevel: 'Provisioning',
    hasModuleRead: 'User Report'
  },
  {
    path: '/system/servicePackUtilizationReport',
    angularComponent: 'systemServicePackUtilizationReport',
    hasLevel: 'Provisioning',
    hasModuleRead: 'User Report'
  },
  {
    path: '/system/systemServiceUtilizationReport',
    angularComponent: 'systemServiceUtilizationReport',
    hasLevel: 'Provisioning',
    hasModuleRead: 'User Report'
  },
  {
    path: '/serviceProviders',
    angularComponent: 'serviceProviders',
    hasLevel: 'Provisioning'
  },
  {
    path: '/vdm',
    angularComponent: 'vdmDashboard',
    hasLevel: 'Provisioning',
    hasModuleRead: 'VDM'
  },
  {
    path: '/vdm/templates/:id',
    angularComponent: 'vdmTemplate',
    hasLevel: 'Provisioning',
    hasModuleRead: 'VDM'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/vdm',
    angularComponent: 'vdmDashboard',
    hasLevel: 'Group',
    hasModuleRead: 'VDM'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/vdm/templates/:id',
    angularComponent: 'vdmTemplate',
    hasLevel: 'Group',
    hasModuleRead: 'VDM'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/vdm/templates/:id/device',
    angularComponent: 'vdmDevice',
    hasLevel: 'Group',
    hasModuleRead: 'VDM'
  },
  {
    path: '/users/:serviceProviderId/:groupId/:userId',
    component: UserDashboard
  },
  {
    path: '/groups/:serviceProviderId/:groupId/groupExtensionLength',
    component: GroupExtensionLength
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
    path: '/groups/:serviceProviderId/:groupId/groupWebPolicy',
    component: GroupWebPolicy,
    hasLevel: 'Service Provider'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/autoAttendants/visual',
    component: CreateAutoAttendant,
    hasModuleRead: 'Visual AA Builder'
  },
  {
    path: '/system/resellers',
    component: SystemResellers,
    hasLevel: 'Provisioning'
  },
  {
    path: '/resellers/:resellerId',
    component: ResellerDashboard,
    hasLevel: 'Reseller'
  },
  {
    path: '/audits',
    exact: true,
    component: Audits,
    hasLevel: 'Service Provider'
  },
  {
    path: '/audits/:id',
    component: Audit,
    hasLevel: 'Service Provider'
  },
  {
    path: '/imports',
    exact: true,
    component: Imports,
    hasLevel: 'Service Provider'
  },
  {
    path: '/imports/:id',
    component: Import,
    hasLevel: 'Service Provider'
  },
  {
    path: '/exports',
    exact: true,
    component: Exports,
    hasLevel: 'Service Provider'
  },
  {
    path: '/exports/:id',
    component: Export,
    hasLevel: 'Service Provider'
  },
  {
    path: '/department/:serviceProviderId/:groupId',
    component: DepartmentDashboard
  }
]
