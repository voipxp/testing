import { ReportRouteSettings } from './service-provider-report-settings'
import { Imports } from '@/components/imports'
import { Exports } from '@/components/exports'
import { ServiceProviderAudits } from './service-provider-audits'
import { BulkTasksIndex } from '@/components/bulk'
import { ServiceProviderServicePacksIndex } from '@/components/service-provider/service-provider-service-packs-index'

export const dashboardMenu = [
  {
    label: 'Dashboard',
    items: [
      {
        name: 'Groups',
        path: 'groups',
        angularComponent: 'serviceProviderGroupsIndex',
        hasLevel: 'Service Provider',
        default: true
      },
      {
        name: 'Users',
        path: 'users',
        angularComponent: 'groupUsers'
      },
      {
        name: 'Reports',
        path: 'reports',
        component: ReportRouteSettings
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
            path: 'recentTasks',
            component: BulkTasksIndex,
            hasLevel: 'Group',
            hasModuleRead: 'Provisioning'
          }
        ]
      },
      {
        name: 'Licensing',
        subMenus: [
          {
            name: 'Group Services',
            path: 'group-services',
            angularComponent: 'serviceProviderServices',
            hasLevel: 'Service Provider',
            serviceType: 'groupServices'
          },
          {
            name: 'Service Pack Services',
            path: 'servicePacks',
            component: ServiceProviderServicePacksIndex,
            hasLevel: 'Service Provider'
          },
          {
            name: 'User Services',
            path: 'user-services',
            angularComponent: 'serviceProviderServices',
            hasLevel: 'Service Provider',
            serviceType: 'userServices'
          }
        ]
      },
      {
        name: 'Resources',
        //path: 'Resources',
        subMenus: [
          {
            name: 'Devices',
            path: 'devices',
            acl: 'Reseller',
            angularComponent: 'serviceProviderDevices',
            hasLevel: 'Reseller'
          },
          {
            name: 'Routing Profile',
            path: 'routingProfile',
            angularComponent: 'serviceProviderRoutingProfile',
            hasLevel: 'Service Provider',
            module: 'Routing Profile'
          },
          {
            name: 'Delete Service Provider',
            path: 'delete',
            angularComponent: 'serviceProviderDelete',
            hasLevel: 'Reseller'
          },
          {
            name: 'Numbers',
            path: 'numbers',
            angularComponent: 'serviceProviderNumbers',
            hasLevel: 'Service Provider'
          }
        ]
      }
    ]
  },
  {
    label: 'Services',
    items: [
      {
        name: 'Enterprise Trunk',
        path: 'enterpriseTrunks',
        angularComponent: 'enterpriseEnterpriseTrunks',
        hasLevel: 'Service Provider',
        module: 'Trunk Group',
        isEnterprise: true
      },
      {
        name: 'Meet-Me Conferencing',
        path: 'meetMeConferencing',
        angularComponent: 'serviceProviderMeetMe',
        hasLevel: 'Service Provider',
        hasModuleRead: 'Meet-Me Conferencing',
        module: 'Meet-Me Conferencing'
      },
      {
        name: 'Network Class of Service',
        path: 'networkClassOfServices',
        angularComponent: 'serviceProviderNetworkClassOfServices',
        hasLevel: 'Service Provider'
      }
    ]
  },
  {
    label: 'AIM',
    items: [
      {
        path: 'audits',
        name: 'Audits',
        component: ServiceProviderAudits,
        hasLevel: 'Service Provider',
        isBreadcrumb: false
      },
      {
        name: 'Import',
        path: 'imports',
        exact: true,
        component: Imports,
        hasLevel: 'Service Provider',
        isBreadcrumb: false
      },
      {
        name: 'Migrate',
        path: 'migrations',
        exact: true,
        component: Exports,
        hasLevel: 'Service Provider',
        isBreadcrumb: false
      }
    ]
  },
  {
    label: 'Management',
    items: [
      {
        name: 'Administrators',
        path: 'Administrators',
        angularComponent: 'serviceProviderAdmins',
        hasLevel: 'Service Provider'
      },
      {
        name: 'Business Profile',
        path: 'profile',
        angularComponent: 'serviceProviderProfile',
        hasLevel: 'Service Provider'
      },
      {
        name: 'Directory',
        path: 'directory',
        angularComponent: 'serviceProviderPhoneDirectory',
        hasLevel: 'Service Provider'
      }
    ]
  },
  {
    label: 'Utilities',
    items: [
      {
        path: 'branding',
        name: 'Branding',
        angularComponent: 'brandingHostnames',
        hasLevel: 'Service Provider',
        isPaasAdmin: true
      },
      {
        path: 'events',
        name: 'Event History',
        angularComponent: 'odinEvents',
        hasLevel: 'Service Provider',
        isPaasAdmin: true
      },
      {
        path: 'settings',
        name: 'Settings',
        angularComponent: 'odinSettings',
        hasLevel: 'Service Provider',
        isPaasAdmin: true
      },
      {
        path: 'webhooks',
        name: 'Webhook History',
        angularComponent: 'odinWebhooks',
        hasLevel: 'Service Provider',
        isPaasAdmin: true
      }
    ]
  }
]
