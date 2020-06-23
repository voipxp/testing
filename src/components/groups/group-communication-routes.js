import {
  GroupCommunicationBarring
} from '@/components/groups'

export const GroupCommunication = [
      {
        name: 'Comm Barring',
        path: 'comm-barring',
		    component: GroupCommunicationBarring,
        hasModuleRead :  'Comm Barring',
		    isBreadcrumb: false
      },
	  {
        name: 'Comm Barring Auth Codes',
        path:  'commBarringAuthCodes',
        angularComponent: 'groupCommunicationBarringAuthorizationCodes',
        hasLevel: 'Group',
        hasModuleRead : 'Comm Barring Auth Codes'
    },
    {
      name: 'Calling Plans',
      path:  'callingPlans',
      angularComponent: 'groupCallingPlans',
      hasLevel: 'Group'
    }
]

