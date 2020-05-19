import { GroupUserServiceSettings } from './group-user-service-settings'
import { GroupServiceSettings } from './group-service-settings'
import { GroupDepartments } from './group-departments'
import { GroupPhoneListWithDirecotorySettings } from './group-phone-list-with-directory-settings'
import { GroupCommunicationSettings } from './group-communication-settings'
import { GroupWebPolicy } from './group-web-policy'
import { GroupExtensionLength } from './group-extension-length'
import { groupReportRoutes } from './group-report-routes'
import { GroupAssignDomains } from './group-assign-domains'
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
        policy: 'profileRead'
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
        angularComponent: 'groupUsers',
        default: true
      },
      {
        name: 'Group Settings',
        path: 'group-services',
        component: GroupServiceSettings,
        serviceType: 'groupServices'
      },
      {
        path: 'user-services',
        name: 'User Settings',
        component: GroupUserServiceSettings
      }
    ]
  },
  {
    label: 'REPORTS',
    items: [
      {
        name: 'Call Reports',
        subMenus: groupReportRoutes.callReports
      },
      {
        name: 'Utilization Reports',
        subMenus: groupReportRoutes.utilizationReports
      }
    ]
  },
  {
    label: 'PROVISIONING',
    items: [
      {
        name: 'Bulk Provisioning',
        path: 'bulk-provisioning',
        subMenus: [
          {
            name: 'Bulk Wizards',
            path: 'bulk-wizards',
            angularComponent: 'bulkDashboard',
            hasLevel: 'Group Department',
            hasModuleRead: 'Provisioning'
          },
          {
            name: 'Bulk Templates',
            path: 'bulk-Templates',
            angularComponent: 'bulkCsv',
            hasLevel: 'Group',
            hasModuleRead: 'Provisioning'
          },
          {
            name: 'Recent Tasks',
            path: 'recent-tasks',
            angularComponent: 'bulkTasksIndex',
            hasLevel: 'Group',
            hasModuleRead: 'Provisioning'
          }
        ]
      },
      {
        name: 'Resources',
        subMenus: [
          {
            name: 'Assign Numbers',
            path: 'groupNumbers',
            angularComponent: 'groupNumbers',
            hasLevel: 'Service Provider',
            isPaasAdmin: true
          },
          {
            name: 'Device Configuration',
            path: 'groupDeviceTypes',
            angularComponent: 'groupDeviceTypes',
            hasLevel: 'Group',
            isPaasAdmin: true
          },
          {
            name: 'Devices',
            path: 'groupDevices',
            angularComponent: 'groupDevices',
            hasLevel: 'Group',
            isPaasAdmin: true
          },
          {
            name: 'Group Extension Length',
            path: 'groupExtensionLength',
            component: GroupExtensionLength,
            hasLevel: 'Group',
            isPaasAdmin: true,
            isBreadcrumb: false
          },
          {
            name: 'Group Licenses',
            path: 'groupServices',
            angularComponent: 'groupServices',
            hasLevel: 'Service Provider',
            serviceType: 'groupServices',
            isPaasAdmin: true
          },
          {
            name: 'Service Pack Licenses',
            path: 'servicePacks',
            angularComponent: 'groupServices',
            serviceType: 'servicePackServices',
            hasLevel: 'Service Provider',
            isPaasAdmin: true
          },
          {
            name: 'User Licenses',
            path: 'userServices',
            angularComponent: 'groupServices',
            hasLevel: 'Service Provider',
            serviceType: 'userServices',
            isPaasAdmin: true
          },
          {
            name: 'Delete Group',
            path: 'groupDelete',
            angularComponent: 'groupDelete',
            hasLevel: 'Service Provider',
            serviceProviderPolicy: 'groupDelete',
            isPaasAdmin: true
          }
        ]
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
        name: 'Assign Domain',
        path: 'assignDomain',
        component: GroupAssignDomains,
        hasLevel: 'Group',
        isBreadcrumb: false
		  },
      {
        name: 'Call Processing Policy',
        path: 'callProcessingPolicy',
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
        path: 'featureAccessCodes',
        angularComponent: 'groupFeatureAccessCodes',
        hasLevel: 'Group',
        hasModuleRead: 'Group Feature Access Codes'
      },
      {
        name: 'Group Web Policy',
        path: 'groupWebPolicy',
        component: GroupWebPolicy,
        hasLevel: 'Service Provider',
        isBreadcrumb: false
      },
      {
        name: 'Intercept Group',
        path: 'interceptGroup',
        angularComponent: 'groupIntercept',
        hasLevel: 'Group',
        hasModuleRead: 'Intercept Group',
        module: 'Intercept Group'
      },
      {
        name: 'Network Class of Service',
        path: 'networkClassOfServices',
        angularComponent: 'groupNetworkClassOfServices',
        hasLevel: 'Group',
        hasModuleRead: 'Network Class of Service'
      },
      {
        name: 'Phone List And Directory',
        path: 'phone-list-directory',
        component: GroupPhoneListWithDirecotorySettings
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
        path: 'vdm',
        angularComponent: 'vdmDashboard',
        hasLevel: 'Group',
        hasModuleRead: 'VDM'
      }
    ]
  }
]
