import React from 'react'

const components = {
  Dashboard: {
    'call-records': {
      name: 'Call Records',
      angularComponent: 'userCallRecordDashboard'
    },
    'feature-quick-set': {
      name: 'Feature Quick Set',
      angularComponent: 'userQuickSet'
    }
  },
  Management: {
    'user-profile': {
      name: 'User Profile',
      angularComponent: 'userProfile'
    },
    'passwords': {
      name: 'Passwords',
      angularComponent: 'userPasswords'
    },
    'announcements': {
      name: 'Announcements',
      angularComponent: 'userAnnouncements'
    },
    'service-settings': {
      name: 'Service Settings',
      angularComponent: 'userServicesDashboard'
    },
    'meet-me-conferences': {
      name: 'Meet-Me Conferences',
      angularComponent: 'userMeetMeConferencingConferences'
    }
  },
  Provisioning: {
    'addresses': {
      name: 'Addresses',
      angularComponent: 'userAddresses'
    },
    'authorization-codes': {
      name: 'Authorization Codes',
      angularComponent: 'userCommunicationBarringAuthorizationCodes'
    },
    'service-assignment': {
      name: 'Service Assignment',
      angularComponent: 'userServices',
      bindings: { serviceType: 'userServices' }
    },
    'service-packs': {
      name: 'Service Packs',
      angularComponent: 'userServices',
      bindings: { serviceType: 'servicePackServices' }
    },
    'calling-plans': {
      name: 'Calling Plans',
      angularComponent: 'userCallingPlans'
    },
    'user-id-or-delete': {
      name: 'User ID or Delete',
      angularComponent: 'userId'
    },
    'shared-call-appearance': {
      name: 'Shared Call Appearance',
      angularComponent: 'userSharedCallAppearanceAdmin'
    },
    'viewable-packs': {
      name: 'Viewable Packs',
      angularComponent: 'userViewablePack'
    }
  }
}

export default components
