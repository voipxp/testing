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
      hasModuleRead: 'Premium Call Records',
      hasLevel: 'Group'
    },
    {
      name: 'Premium Call Records',
      path: 'group-premium-call-records',
      angularComponent: 'groupCallRecordIndex',
      hasModuleRead: 'Premium Call Records',
      hasLevel: 'Group'
    },
    {
      name: 'User Call Report',
      path: 'user-call-report',
      angularComponent: 'groupUserCallReportIndex',
      hasModuleRead: 'Premium Call Records',
      hasLevel: 'Group'
    },
    {
      name: 'User Report',
      path: 'users-report',
      angularComponent: 'usersReport',
      hasLevel: 'Group',
      hasModuleRead: 'User Report'
    } 
]
 
