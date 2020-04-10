import {
  GroupSpeedDial8,
  GroupSeriesCompletion
} from '@/components/groups'
export const groupReportRoutes = [
  {
      name: 'Auto Receptionist',
      path: 'autoAttendant',
      angularComponent: 'autoAttendantCallRecords',
      hasLevel: 'Group',
      hasModuleRead: 'Auto Attendant Report'
      },
      {
      name: 'Call Center Agent Report',
      path: 'callCenter',
      angularComponent: 'groupCallCenterCallRecords',
      hasLevel: 'Group',
      hasModuleRead: 'Premium Call Records'
      },
      {
      name: 'Premium Call Records',
      path: 'groupPremiumCallReport',
      angularComponent: 'groupCallRecordIndex',
      hasLevel: 'Group',
      hasModuleRead: 'Premium Call Records'
      },
      {
      name: 'User Call Report',
      path: 'userCallReport',
      angularComponent: 'groupUserCallReportIndex',
      hasLevel: 'Group',
      hasModuleRead: 'Premium Call Records'
      },
      {
      name: 'User Report',
      path: 'usersReport',
      angularComponent: 'usersReport',
      hasLevel: 'Group',
      hasModuleRead: 'User Report'
      } 
]
 
