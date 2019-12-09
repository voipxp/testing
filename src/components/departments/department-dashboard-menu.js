export const dashboardMenu = [
  {
    label: 'Profile',
    items: [
       {
        path: 'users',
        name: 'Users',
        angularComponent: 'departmentUsers',
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
        angularComponent: 'departmentAutoAttendant'
      },
      {
        path: 'broadworks-anywhere',
        name: 'BroadWorks Anywhere',
        angularComponent: 'departmentBroadworksAnyWhere'
      },
      {
        path: 'call-centers',
        name: 'Call Centers',
        angularComponent: 'departmentCallCenters'
      },
      {
        path: 'flexible-seatingHost',
        name: 'Flexible Seating Host',
        angularComponent: 'departmentFlexibleSeatingHosts'
      },
      {
        path: 'group-paging',
        name: 'Group Paging',
        angularComponent: 'departmentGroupPaging'
      },
      {
        path: 'hunt-group',
        name: 'Hunt Group',
        angularComponent: 'departmentHuntGroup'
      },
      {
        path: 'instant-group-call',
        name: 'Instant Group Call',
        angularComponent: 'departmentInstantGroupCall'
      },
      {
        path: 'meet-me-conferencing',
        name: 'Meet-Me Conferencing',
        angularComponent: 'departmentMeetMeConferencing'
      },
      {
        path: 'trunk-group',
        name: 'Trunk Group',
        angularComponent: 'departmentTrunkGroup'
      }
    ]
  },
  {
    label : 'Utilities' ,
      items : [
        {
            path:'common-phone-list',
            name:'Common Phone List',
            angularComponent: 'departmentCommonPhoneList'
        },
        {
          path:'enterprise-directory',
          name:'Enterprise Directory',
          angularComponent: 'departmentEnterpriseDirectory'
        }
      ]


  }
    ]
