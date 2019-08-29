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
        hasUserService: ['Basic Call Logs']
      },
      {
        path: 'call-records',
        name: 'Call Records',
        angularComponent: 'userCallRecordDashboard',
        hasModuleRead: 'Premium Call Records'
      },
      {
        path: 'feature-quick-set',
        name: 'Feature Quick Set',
        angularComponent: 'userQuickSet',
        hasUserService: [
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
        hasVersion: '20'
      },
      {
        path: 'meet-me-conferences',
        name: 'Meet-Me Conferences',
        angularComponent: 'userMeetMeConferencingConferences',
        hasModuleRead: 'Meet-Me Conferencing'
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
        path: 'user-schedules',
        name: 'User Schedules',
        angularComponent: 'userSchedules'
      },
      {
        path: 'user-alternate-user-ids',
        name: 'Alternate User ID',
        component: UserAlternateUserId,
        hasVersion: '20'
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
        hasLevel: 'Group',
        hasUserService: ['Communication Barring User-Control']
      },
      {
        path: 'calling-plans',
        name: 'Calling Plans',
        angularComponent: 'userCallingPlans',
        hasModuleRead: 'Provisioning',
        hasLevel: 'Group'
      },
      {
        path: 'number-and-device',
        name: 'Number and Device',
        angularComponent: 'userAddresses',
        hasLevel: 'Group'
      },
      {
        path: 'service-assignment',
        name: 'Service Assignment',
        angularComponent: 'userServices',
        serviceType: 'userServices',
        hasModuleRead: 'Provisioning',
        hasLevel: 'Group'
      },
      {
        path: 'service-packs',
        name: 'Service Packs',
        angularComponent: 'userServices',
        serviceType: 'servicePackServices',
        hasModuleRead: 'Provisioning',
        hasLevel: 'Group'
      },
      {
        path: 'shared-call-appearance',
        name: 'Shared Call Appearance',
        angularComponent: 'userSharedCallAppearanceAdmin',
        hasModuleRead: 'Provisioning',
        hasUserService: [
          'Shared Call Appearance',
          'Shared Call Appearance 5',
          'Shared Call Appearance 10',
          'Shared Call Appearance 15',
          'Shared Call Appearance 20',
          'Shared Call Appearance 25',
          'Shared Call Appearance 30',
          'Shared Call Appearance 35'
        ],
        hasLevel: 'Group'
      },
      {
        path: 'user-id-or-delete',
        name: 'User ID or Delete',
        angularComponent: 'userId',
        hasModuleRead: 'Provisioning',
        hasLevel: 'Group'
      },
      {
        path: 'viewable-packs',
        name: 'Viewable Packs',
        angularComponent: 'userViewablePack',
        hasLevel: 'Group',
        hasModuleRead: 'Viewable Service Packs'
      }
    ]
  }
]
