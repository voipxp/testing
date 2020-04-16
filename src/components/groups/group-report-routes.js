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
      path: 'callCenter',
      angularComponent: 'groupCallCenterCallRecords',
      hasModuleRead: 'Premium Call Records',
      hasLevel: 'Group'
    },
    {
      name: 'Premium Call Records',
      path: 'group-premium-callReport',
      angularComponent: 'groupCallRecordIndex',
      hasModuleRead: 'Premium Call Records',
      hasLevel: 'Group'
    },
    {
      name: 'User Call Report',
      path: 'userCallReport',
      angularComponent: 'groupUserCallReportIndex',
      hasModuleRead: 'Premium Call Records',
      hasLevel: 'Group'
    },
    {
      name: 'User Report',
      path: 'usersReport',
      angularComponent: 'usersReport',
      hasLevel: 'Group',
      hasModuleRead: 'User Report'
    } 
]
 
