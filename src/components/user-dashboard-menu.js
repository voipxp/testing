export const dashboardMenu = [
  {
    label: 'Dashboard',
    items: [
      {
        path: 'basic-call-logs',
        name: 'Basic Call Logs',
        angularComponent: 'userBasicCallLogs',
        service: 'Basic Call Logs'
      },
      {
        path: 'call-records',
        name: 'Call Records',
        angularComponent: 'userCallRecordDashboard',
        module: 'Premium Call Records'
      },
      {
        path: 'feature-quick-set',
        name: 'Feature Quick Set',
        angularComponent: 'userQuickSet',
        service: [
          'Call Forwarding Always',
          'Call Forwarding Busy',
          'Call Forwarding No Answer',
          'Do Not Disturb',
          'Remote Office',
          'BroadWorks Anywhere'
        ]
      }
    ]
  },
  {
    label: 'Management',
    items: [
      {
        path: 'announcements',
        name: 'Announcements',
        angularComponent: 'userAnnouncements',
        version: '20'
      },
      {
        path: 'meet-me-conferences',
        name: 'Meet-Me Conferences',
        angularComponent: 'userMeetMeConferencingConferences',
        module: 'Meet-Me Conferencing'
      },
      {
        path: 'passwords',
        name: 'Passwords',
        angularComponent: 'userPasswords'
      },
      {
        path: 'service-settings',
        name: 'Service Settings',
        angularComponent: 'userServicesDashboard'
      },
      {
        path: 'user-profile',
        name: 'User Profile',
        angularComponent: 'userProfile'
      }
    ]
  },
  {
    label: 'Provisioning',
    items: [
      {
        path: 'authorization-codes',
        name: 'Authorization Codes',
        angularComponent: 'userCommunicationBarringAuthorizationCodes',
        acl: 'Group',
        service: 'Communication Barring User-Control'
      },
      {
        path: 'calling-plans',
        name: 'Calling Plans',
        angularComponent: 'userCallingPlans',
        module: 'Provisioning',
        acl: 'Group'
      },
      {
        path: 'number-and-device',
        name: 'Number and Device',
        angularComponent: 'userAddresses',
        acl: 'Group'
      },
      {
        path: 'service-assignment',
        name: 'Service Assignment',
        angularComponent: 'userServices',
        serviceType: 'userServices',
        module: 'Provisioning',
        acl: 'Group'
      },
      {
        path: 'service-packs',
        name: 'Service Packs',
        angularComponent: 'userServices',
        serviceType: 'servicePackServices',
        module: 'Provisioning',
        acl: 'Group'
      },
      {
        path: 'shared-call-appearance',
        name: 'Shared Call Appearance',
        angularComponent: 'userSharedCallAppearanceAdmin',
        module: 'Provisioning',
        service: 'Shared Call Appearance',
        acl: 'Group'
      },
      {
        path: 'user-id-or-delete',
        name: 'User ID or Delete',
        angularComponent: 'userId',
        module: 'Provisioning',
        acl: 'Group'
      },
      {
        path: 'viewable-packs',
        name: 'Viewable Packs',
        angularComponent: 'userViewablePack',
        acl: 'Group',
        module: 'Viewable Service Packs'
      }
    ]
  }
]
