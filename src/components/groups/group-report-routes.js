import { GroupNumbers } from './group-numbers'
import { GroupSharedCallAppearancesReport } from './group-shared-call-appearances-report'
import { GroupPushNotificationRegistration } from './group-push-notification-registration'
export const groupReportRoutes = {
  callReports: [
    {
      name: 'Auto Receptionist',
      path: 'auto-attendant',
      angularComponent: 'autoAttendantCallRecords',
      hasModuleRead: 'Auto Attendant Report',
      hasLevel: 'Group'
    },
    {
      name: 'Call Center Agent Report',
      path: 'call-center-agent-report',
      angularComponent: 'groupCallCenterCallRecords',
      hasLevel: 'Group'
    },
    {
      name: 'Premium Call Records',
      path: 'premium-call-records',
      angularComponent: 'groupCallRecordIndex',
      hasLevel: 'Group'
    },
    {
      name: 'User Call Report',
      path: 'user-call-report',
      angularComponent: 'groupUserCallReportIndex',
      hasLevel: 'Group'
    }
  ],
  utilizationReports: [
    {
      name: 'Numbers',
      path: 'numbers',
      component: GroupNumbers,
      hasLevel: 'Service Provider',
      isBreadcrumb: false
    },
    {
      name: 'Shared Call Appearances Report',
      path: 'sharedCallAppearancesReport',
      component: GroupSharedCallAppearancesReport,
      hasLevel: 'Group',
      isBreadcrumb: false
    },
    {
      name: 'Push Notification Registration',
      path: 'pushNotificationRegistration',
      component: GroupPushNotificationRegistration,
      hasLevel: 'Group',
      isBreadcrumb: false
    },
    {
      name: 'User Report',
      path: 'users-report',
      angularComponent: 'usersReport',
      hasLevel: 'Group'
    }
  ]
}
