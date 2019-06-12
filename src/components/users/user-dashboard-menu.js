import { UserServiceSettings } from './user-service-settings'
import { UserAlternateUserId } from './user-alternate-user-id'
import { UserRegistration } from './user-registration'

export const dashboardMenu = [
  {
    label: 'Dashboard',
    items: [
      {
        path: 'basic-call-logs',
        name: 'Basic Call Logs',
        angularComponent: 'userBasicCallLogs',
        services: ['Basic Call Logs']
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
        services: [
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
        component: UserServiceSettings
      },
      {
        path: 'user-alternate-user-ids',
        name: 'Alternate User ID',
        component: UserAlternateUserId,
        version: '20'
      },
      {
        path: 'user-registration',
        name: 'User Registration',
        component: UserRegistration
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
        services: ['Communication Barring User-Control']
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
        services: [
          'Shared Call Appearance',
          'Shared Call Appearance 5',
          'Shared Call Appearance 10',
          'Shared Call Appearance 15',
          'Shared Call Appearance 20',
          'Shared Call Appearance 25',
          'Shared Call Appearance 30',
          'Shared Call Appearance 35'
        ],
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
