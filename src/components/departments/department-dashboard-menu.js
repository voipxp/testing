export const dashboardMenu = [
  {
    label: 'Profile',
    items: [
       {
        path: 'users',
        name: 'Users',
        angularComponent: 'groupUsers',
        hasModuleRead: 'Department User',
        hasPolicy: 'departmentAdminUserAccess'
      },
	    {
        path: 'change-password',
        name: 'Change Password ',
        angularComponent: 'departmentChangePassword',
        hasModuleRead: 'Department Change Password'
      }
    ]
  },
  {
    label: 'Group Services',
    items: [
	    {
        path: 'autoAttendants',
        name: 'Auto Attendant',
        angularComponent: 'autoAttendants',
        hasModuleRead: 'Auto Attendant',
        hasGroupService: ['Auto Attendant', 'Auto Attendant - Standard']
      },
      {
        path: 'callCenters',
        name: 'Call Center',
        angularComponent: 'groupCallCenters',
        hasModuleRead: 'Call Center',
        hasGroupService: ['Call Center - Basic', '	Call Center Monitoring', 'Call Center - Premium', 'Call Center - Standard']
      },
      {
        path: 'flexibleSeatingHosts',
        name: 'Flexible Seating Host',
        angularComponent: 'groupFlexibleSeatingHosts',
        hasGroupService: ['Flexible Seating Guest']
      },
      {
        path: 'paging',
        name: 'Group Paging',
        angularComponent: 'groupPagingGroups',
        hasGroupService: ['Group Paging']
      },
      {
        path: 'huntGroups',
        name: 'Hunt Group',
        angularComponent: 'groupHuntGroups',
        hasGroupService: ['Hunt Group']
      },
      {
        path: 'meetMe',
        name: 'Meet-Me Conferencing',
        angularComponent: 'groupMeetMe',
        hasGroupService: ['Meet-Me Conferencing']
      },
      {
        path: 'musicOnHold',
        name: 'Music On Hold',
        angularComponent: 'groupMusicOnHoldIndex',
        hasGroupService: ['Music On Hold']
      },
      {
        path: 'trunkGroups',
        name: 'Trunk Group',
        angularComponent: 'groupTrunkGroups',
        hasGroupService: ['Trunk Group'],
        hasPolicy: 'departmentAdminTrunkGroupAccess'
      }
    ]
  },
  {
    label : 'Utilities' ,
      items : [
        {
            path:'common-phone-list',
            name:'Common Phone List',
            angularComponent: 'groupCommonPhoneList'
        },
        {
          path:'enterprise-directory',
          name:'Enterprise Directory',
          angularComponent: 'groupPhoneDirectory'
        }
      ]


  }
    ]
