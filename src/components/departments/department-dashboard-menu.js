export const dashboardMenu = [
  {
    label: 'Profile',
    items: [
       {
        path: 'users',
        name: 'Users',
        angularComponent: 'groupUsers',
        hasModuleRead: 'Department Passwrod'
      },
	    {
        path: 'change-password',
        name: 'Change Password ',
        angularComponent: 'departmentUserPassword',
        hasModuleRead: 'Department Password'
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
        hasModuleRead: 'Auto Attendant'
      },
      /*
      {
        path: 'broadworks-anywhere',
        name: 'BroadWorks Anywhere',
        angularComponent: 'departmentBroadworksAnyWhere'
      },
      */
      {
        path: 'call-centers',
        name: 'Call Centers',
        angularComponent: 'groupCallCenters'
      },
      {
        path: 'flexible-seating-host',
        name: 'Flexible Seating Host',
        angularComponent: 'groupFlexibleSeatingHosts'
      },
      {
        path: 'paging',
        name: 'Group Paging',
        angularComponent: 'groupPagingGroups'
      },
      {
        path: 'hunt-group',
        name: 'Hunt Group',
        angularComponent: 'groupHuntGroups'
      },
      {
        path: 'meet-me-conferencing',
        name: 'Meet-Me Conferencing',
        angularComponent: 'groupMeetMe'
      },
      {
        path: 'trunk-group',
        name: 'Trunk Group',
        angularComponent: 'groupTrunkGroups'
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
