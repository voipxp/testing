import {
  GroupCommunicationBarring
} from '@/components/groups'
export const GroupCommunication = [
      {
        name: 'Comm Barring',
        path: 'groupCommunicationBarring',
		component: GroupCommunicationBarring,
        hasModuleRead :  'Comm Barring',
		isBreadcrumb: false	
      },
	  { 
        name: 'Comm Barring Auth Codes',
        path:  'groupCommunicationBarringAuthorizationCodes',
        angularComponent: 'groupCommunicationBarringAuthorizationCodes',
        hasLevel: 'Group',
        hasModuleRead : 'Comm Barring Auth Codes'
	  },
]
 
