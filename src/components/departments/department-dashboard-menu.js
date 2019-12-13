export const dashboardMenu = [
  {
    label: 'Profile',
    items: [
       {
        path: 'users',
        name: 'Users',
        angularComponent: 'departmentUsers',
        hasModuleRead: 'Department User'
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
        path: 'auto-attendant',
        name: 'Auto Attendant',
        angularComponent: 'autoAttendants',
        hasModuleRead: 'Auto Attendant',
        hasUserService: ['Auto Attendant']
      },
      {
        path: 'call-centers',
        name: 'Call Centers',
        angularComponent: 'groupCallCenters',
        hasUserService: ['Call Center']
      },
      {
        path: 'flexible-seating-host',
        name: 'Flexible Seating Host',
        angularComponent: 'groupFlexibleSeatingHosts',
        hasUserService: ['Flexible Seating Guest']
      },
      {
        path: 'paging',
        name: 'Group Paging',
        angularComponent: 'groupPagingGroups',
        hasUserService: ['Group Paging']
      },
      {
        path: 'hunt-group',
        name: 'Hunt Group',
        angularComponent: 'groupHuntGroups',
        hasUserService: ['Hunt Group']
      },
      {
        path: 'meet-me-conferencing',
        name: 'Meet-Me Conferencing',
        angularComponent: 'groupMeetMe',
        hasUserService: ['Meet-Me Conferencing']
      },
      {
        path: 'trunk-group',
        name: 'Trunk Group',
        angularComponent: 'groupTrunkGroups',
        hasUserService: ['Trunk Group']
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
