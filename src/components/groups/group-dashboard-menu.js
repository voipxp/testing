import { GroupUserServiceSettings } from './group-user-service-settings'
import { GroupServiceSettings } from './group-service-settings'
import { GroupReportSettings } from './group-report-settings'
import { GroupDepartments } from './group-departments'
import {GroupPhoneListWithDirecotorySettings} from './group-phone-list-with-directory-settings'
import {GroupCommunicationSettings} from './group-communication-settings'
import {ProvisioningRouteSettings} from './group-provisioning-settings'
import {GroupWebPolicy} from './group-web-policy'

export const dashboardMenu = [
  {
    label: 'Dashboard',
    items: [
        {
          name: 'Administrators',
          path: 'administrators',
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
          name: 'Departments',
          path: 'departments',
          component: GroupDepartments,
          policy: 'departmentRead',
          hasLevel: 'Group'
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
          path: 'group-services',
          component: GroupServiceSettings,
          serviceType: 'groupServices'
        }, 
        {
          path: 'user-services',
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
          path:  'callProcessingPolicy' ,
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
          path:  'featureAccessCodes',
          angularComponent: 'groupFeatureAccessCodes',
          hasLevel: 'Group',
          hasModuleRead: 'Group Feature Access Codes'
        },
        {
          name: 'Group Web Policy',
          path:  'groupWebPolicy',
          component: GroupWebPolicy,
          hasLevel: 'Service Provider',
          isBreadcrumb: false
        },
        {
          name: 'Intercept Group',
          path: 'interceptGroup' ,
          angularComponent: 'groupIntercept',
          hasLevel: 'Group',
          hasModuleRead: 'Intercept Group',
          module:'Intercept Group'
        },
        {
          name: 'Network Class of Service',
          path:  'networkClassOfServices',
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
