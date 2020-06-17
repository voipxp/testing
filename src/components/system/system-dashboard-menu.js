import { ReportRouteSettings } from './system-report-settings'
import { Audits } from '@/components/audits'
import { Imports } from '@/components/imports'
import { Exports } from '@/components/exports'
import { ServiceProviderOdinSupport } from '@/components/service-provider/service-provider-odin-support'
import { SystemNetworkClassOfServicesIndex } from '@/components/system/system-network-class-of-services-index'
import { BulkTasksIndex } from '@/components/bulk'
import { SystemDomains } from './system-domains'
export const dashboardMenu = [
  {
    label: 'Dashboard',
    items: [
      {
        name: 'Service Providers',
        path: 'serviceProviders',
        angularComponent: 'serviceProviders',
        limitTo: 10,
        default: true
      },
      {
        name: 'VDM',
        path: 'vdm',
        angularComponent: 'vdmDashboard',
        hasLevel: 'System',
        module: 'VDM',
        hasModuleRead: 'VDM'
      }
    ]
  },
  {
    label: 'PROVISIONING',
    items: [
      {
        name: 'Bulk Provisioning',
        // path: 'bulk-provisioning',
        hasLevel: 'Provisioning',
        hasModuleRead: 'Provisioning',
        subMenus: [
          {
            name: 'Bulk Wizards',
            path: 'bulk-wizards',
            angularComponent: 'bulkDashboard',
            hasLevel: 'Provisioning',
            hasModuleRead: 'Provisioning'
          },
          {
            name: 'Bulk Templates',
            path: 'bulk-Templates',
            angularComponent: 'bulkCsv',
            hasLevel: 'Provisioning',
            hasModuleRead: 'Provisioning'
          },
          {
            name: 'Recent Tasks',
            path: 'recentTasks',
            component: BulkTasksIndex,
            hasLevel: 'Provisioning',
            hasModuleRead: 'Provisioning'
          }
        ]
      }
    ]
  },
  {
    label: 'AIM',
    items: [
      {
        path: 'audits',
        name: 'Audits',
        component: Audits,
        isBreadcrumb: false
      },
      {
        name: 'Import',
        path: 'imports',
        exact: true,
        component: Imports,
        hasLevel: 'Provisioning',
        isBreadcrumb: false
      },
      {
        name: 'Migrate',
        path: 'migrations',
        exact: true,
        component: Exports,
        hasLevel: 'Provisioning',
        isBreadcrumb: false
      }
    ]
  },
  {
    label: 'Report',
    items: [
      {
        name: 'Reports',
        path: 'report',
        component: ReportRouteSettings,
        hasLevel: 'Provisioning'
      }
    ]
  },

  {
    label: 'Management',
    items: [
      {
        name: 'Collaborate',
        path: 'systemCollaborate',
        angularComponent: 'systemCollaborate',
        acl: 'System',
        hasLevel: 'System'
      },
      {
        name: 'Devices',
        path: 'devices',
        angularComponent: 'systemDevices',
        acl: 'System',
        hasLevel: 'System'
      },
	  {
		name: 'Domains',
		component: SystemDomains,
		path: 'domains',
		hasLevel: 'System',
		isBreadcrumb: false
	  },
      {
        name: 'Network Class of Services',
        path: 'networkClassOfServices',
        component: SystemNetworkClassOfServicesIndex,
        hasLevel: 'System'
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
        hasLevel: 'Provisioning',
        isPaasAdmin: true
      },
      {
        name: 'Login History',
        path: 'userLogin',
        angularComponent: 'odinUserLoginIndex',
        isPaasAdmin: false
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
        hasLevel: 'Provisioning',
        isPaasAdmin: true
      },
      {
        name: 'Support',
        path: 'support',
        component: ServiceProviderOdinSupport,
        hasLevel: 'Service Provider'
      }
    ]
  }
]
