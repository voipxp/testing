import React from 'react'
import { AppMenu, AppBreadcrumb } from '@/components/app'

const routes = [
  {
    path: 'call-records',
    name: 'Call Records',
    section: 'Dashboard',
    angularComponent: 'userCallRecordDashboard'
  },
  {
    path: 'basic-call-logs',
    name: 'Basic Call Logs',
    section: 'Dashboard',
    angularComponent: 'userBasicCallLogs'
  },
  {
    path: 'feature-quick-set',
    name: 'Feature Quick Set',
    section: 'Dashboard',
    angularComponent: 'userQuickSet'
  },
  {
    path: 'announcements',
    name: 'Announcements',
    section: 'Management',
    angularComponent: 'userAnnouncements',
    version: '20'
  },
  {
    path: 'user-profile',
    name: 'User Profile',
    section: 'Management',
    angularComponent: 'userProfile'
  },
  {
    path: 'passwords',
    name: 'Passwords',
    section: 'Management',
    angularComponent: 'userPasswords'
  },
  {
    path: 'service-settings',
    name: 'Service Settings',
    section: 'Management',
    angularComponent: 'userServicesDashboard'
  },
  {
    path: 'meet-me-conferences',
    name: 'Meet-Me Conferences',
    section: 'Management',
    angularComponent: 'userMeetMeConferencingConferences'
  },
  {
    path: 'addresses',
    name: 'Addresses',
    section: 'Provisioning',
    angularComponent: 'userAddresses'
  },
  {
    path: 'authorization-codes',
    name: 'Authorization Codes',
    section: 'Provisioning',
    angularComponent: 'userCommunicationBarringAuthorizationCodes'
  },
  {
    path: 'service-assignment',
    name: 'Service Assignment',
    section: 'Provisioning',
    angularComponent: 'userServices',
    bindings: { serviceType: 'userServices' }
  },
  {
    path: 'service-packs',
    name: 'Service Packs',
    section: 'Provisioning',
    angularComponent: 'userServices',
    bindings: { serviceType: 'servicePackServices' }
  },
  {
    path: 'calling-plans',
    name: 'Calling Plans',
    section: 'Provisioning',
    angularComponent: 'userCallingPlans'
  },
  {
    path: 'user-id-or-delete',
    name: 'User ID or Delete',
    section: 'Provisioning',
    angularComponent: 'userId'
  },
  {
    path: 'shared-call-appearance',
    name: 'Shared Call Appearance',
    section: 'Provisioning',
    angularComponent: 'userSharedCallAppearanceAdmin'
  },
  {
    path: 'viewable-packs',
    name: 'Viewable Packs',
    section: 'Provisioning',
    angularComponent: 'userViewablePack'
  }
]

const UserDashboard = () => {
  return (
    <>
      <AppBreadcrumb />
      <AppMenu routes={routes} />
    </>
  )
}

export default UserDashboard
