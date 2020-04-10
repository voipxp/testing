import {
  GroupWebPolicy,
  GroupCommunicationBarring
} from '@/components/groups'
import { GroupUserServiceSettings } from './group-user-service-settings'
import { GroupServiceSettings } from './group-service-settings'
import { GroupReportSettings } from './group-report-settings'
export const dashboardMenu = [
  {
    label: 'Dashboard',
    items: [
      {
        name: 'Departments',
        path: 'departments',
        angularComponent: 'groupDepartments',
        hasLevel: 'Group'},
      {
	    name: 'Administrators',
	    path: 'admins',
	    angularComponent: 'groupAdmins',
	    hasLevel: 'Group'
      },
      
	  /*
      {
        name: 'Administrators',
        path: 'groupAdmins',
        policy: 'profileRead',
        component: GroupAdmins,
        hasLevel: 'Group'
      },
	  */
	   
      {
        name: 'Business Profile',
        path: 'profile',
        angularComponent: 'groupProfile',
        policy: 'profileRead',
      },
       {
		name: 'Users',
        path: 'users',
        angularComponent: 'groupUsers'
		//component : GroupUserService
      },
	   {
		name: 'Reports',
        path: 'reports',
        component: GroupReportSettings
      },
	  ]
  },
  {
    label: 'Services',
    items: [
	    {
        name: 'Group Services',
        path: 'group-service',
        component: GroupServiceSettings,
        serviceType: 'groupServices'
      }, 
      {
        path: 'user-service',
        name: 'User Services',
        component: GroupUserServiceSettings
      }
    ]
  },
  {
    label: 'Management',
    items: [
      {
        name: 'Announcements',
        path: 'announcements',
        angularComponent: 'groupAnnouncements',
        version: '20'
      },
	  
      {
        name: 'Bulk Provisioning',
        path: 'bulk',
		angularComponent: 'bulkDashboard',
		hasLevel: 'Group Department'
      },
	  {
        name: 'Comm Barring',
        path: 'groupCommunicationBarring',
		component: GroupCommunicationBarring,
        isBreadcrumb: false		
      },
	  { 
        name: 'Comm Barring Auth Codes',
        path:  'groupCommunicationBarringAuthorizationCodes',
        angularComponent: 'groupCommunicationBarringAuthorizationCodes',
        hasLevel: 'Group'
	  },
	  {
        name: 'Custom Directory',
        path: 'customContactDirectories' ,
		angularComponent: 'groupCustomContactDirectories',
		hasLevel: 'Group'
      },
	  {
        name: 'Common Phone List',
        path: 'phoneList',
		angularComponent: 'groupCommonPhoneList',
		hasLevel: 'Group'
      },
      {
        name: 'Calling Plans',
        path:  'callingPlans', 
		angularComponent: 'groupCallingPlans',
		hasLevel: 'Group'
      },
	  {
        name: 'Call Processing Policy',
        path:  'callProcessingPolicy' ,
		angularComponent: 'groupCallProcessingPolicy',
		hasLevel: 'Group'
      },
      {
        name: 'Directory',
        path: 'directory',
		angularComponent: 'groupPhoneDirectory',
		hasLevel: 'Group' 
      },
      {
        
        name: 'Feature Access Codes',
        path:  'featureAccessCodes',
        angularComponent: 'groupFeatureAccessCodes',
        hasLevel: 'Group',
        hasModuleRead: 'Group Feature Access Codes'
      },
      {
        name: 'Intercept Group',
        path: 'intercept' ,
        angularComponent: 'groupIntercept',
		hasLevel: 'Group',
        hasModuleRead: 'Intercept Group'
      },
	  {
        name: 'Network Class of Service',
        path:  'networkclassofservices',
		angularComponent: 'groupNetworkClassOfServices',
		hasLevel: 'Group'
	  },
      {
        name: 'Schedules',
        path: 'schedules',
		angularComponent: 'groupSchedules',
		hasLevel: 'Group'
      },
      {
        name: 'Viewable Packs',
        path: 'viewablePacks',
        angularComponent: 'groupViewablePacksIndex',
        hasLevel: 'Group',
        hasModuleRead: 'Viewable Service Packs'
      },
      { 
        name: 'VDM',
        path:  'vdm',
		angularComponent: 'vdmDashboard',
		hasLevel: 'Group',
		hasModuleRead: 'VDM'
      }
    ]
  }/* ,
  {
    label: 'Reports',
    items: [
      {
      name: 'Auto Receptionist',
      path: 'autoAttendant',
      angularComponent: 'autoAttendantCallRecords',
      hasLevel: 'Group',
      hasModuleRead: 'Auto Attendant Report'
      },
      {
      name: 'Call Center Agent Report',
      path: 'callCenter',
      angularComponent: 'groupCallCenterCallRecords',
      hasLevel: 'Group',
      hasModuleRead: 'Premium Call Records'
      },
      {
      name: 'Premium Call Records',
      path: 'groupPremiumCallReport',
      angularComponent: 'groupCallRecordIndex',
      hasLevel: 'Group',
      hasModuleRead: 'Premium Call Records'
      },
      {
      name: 'User Call Report',
      path: 'userCallReport',
      angularComponent: 'groupUserCallReportIndex',
      hasLevel: 'Group',
      hasModuleRead: 'Premium Call Records'
      },
      {
      name: 'User Report',
      path: 'usersReport',
      angularComponent: 'usersReport',
      hasLevel: 'Group',
      hasModuleRead: 'User Report'
      } 
	  ]
	} */
]
