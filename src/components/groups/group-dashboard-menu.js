import { GroupUserServiceSettings } from './group-user-service-settings'
import { GroupServiceSettings } from './group-service-settings'
import { GroupReportSettings } from './group-report-settings'
import { GroupDepartments } from './group-departments'
import {GroupPhoneListWithDirecotorySettings} from './group-phone-list-with-directory-settings'
import {GroupCommunicationSettings} from './group-communication-settings'
import {ProvisioningRouteSettings} from './group-provisioning-settings'
export const dashboardMenu = [
  {
    label: 'Dashboard',
    items: [
        {
          name: 'Departments',
          path: 'departments',
          component: GroupDepartments,
          policy: 'departmentRead',
          hasLevel: 'Group'
        },
        {
          name: 'Administrators',
          path: 'admins',
          angularComponent: 'groupAdmins',
          hasLevel: 'Group',
          module: true
        },
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
        },
		{
          name: 'Provisioning',
          path: 'Provisioning',
          component: ProvisioningRouteSettings,
          hasLevel: 'Service Provider',
          module: true
        },
        {
          name: 'Reports',
          path: 'reports',
          component: GroupReportSettings
        }
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
          name: 'Call Processing Policy',
          path:  'call-processing-policy' ,
          angularComponent: 'groupCallProcessingPolicy',
          hasLevel: 'Group'
        },
        {
          name: 'Comm Barring',
          path: 'comm-barring',
          component: GroupCommunicationSettings
        },
        {
          name: 'Feature Access Codes',
          path:  'feature-access-codes',
          angularComponent: 'groupFeatureAccessCodes',
          hasLevel: 'Group',
          hasModuleRead: 'Group Feature Access Codes'
        },
        {
          name: 'Intercept Group',
          path: 'intercept' ,
          angularComponent: 'groupIntercept',
          hasLevel: 'Group',
          hasModuleRead: 'Intercept Group',
          module:'Intercept Group'
        },
        {
          name: 'Network Class of Service',
          path:  'network-class-of-services',
          angularComponent: 'groupNetworkClassOfServices',
          hasLevel: 'Group',
          hasModuleRead: 'Network Class of Service'
        },
        {
          name: 'Schedules',
          path: 'schedules',
		      angularComponent: 'groupSchedules',
		      hasLevel: 'Group'
        },
        {
          name: 'Phone List And Directory',
          path: 'phone-list-directory',
          component: GroupPhoneListWithDirecotorySettings
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
  } 
]
