import { GroupNumbers } from './group-numbers'
import { GroupSharedCallAppearancesReport } from './group-shared-call-appearances-report'
export const groupReportRoutes = [
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
      name: 'Numbers',
      path: 'numbers',
      component: GroupNumbers,
      hasLevel: 'Service Provider',
      isBreadcrumb: false
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
    },
    {
      name: 'User Report',
      path: 'users-report',
      angularComponent: 'usersReport',
      hasLevel: 'Group'
    },
    {
      name: 'sharedCallAppearancesReport',
      path: 'sharedCallAppearancesReport',
      component: GroupSharedCallAppearancesReport,
      hasLevel: 'Group',
      isBreadcrumb: false
    }
]
 
