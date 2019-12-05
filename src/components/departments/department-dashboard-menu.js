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
