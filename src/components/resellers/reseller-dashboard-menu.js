import { ResellerAdmins } from './reseller-admins'
import { ResellerProfile } from './reseller-profile'
import { ResellerDelete } from './reseller-delete'
import { ResellerServiceProviders } from './reseller-service-providers'
import { ResellerServiceProviderReport } from './reseller-service-provider-report'
import { ResellerServicePackUtilizationReport } from './reseller-service-pack-utilization-report'
import { ResellerServiceUtilizationReport } from './reseller-service-utilization-report'
import { ResellerDnReport } from './reseller-dn-report'
import { ResellerAudits } from './reseller-audits'
import { ResellerExports } from './reseller-exports'
import { ResellerImports } from './reseller-imports'

export const dashboardMenu = [
  {
    label: 'Dashboard',
    items: [
      {
        path: 'service-providers',
        name: 'Service Providers',
        component: ResellerServiceProviders
      },
      {
        path: 'profile',
        name: 'Business Profile',
        component: ResellerProfile
      },
      {
        path: 'admins',
        name: 'Administrators',
        component: ResellerAdmins
      }
    ]
  },
  {
    label: 'Reports',
    items: [
      {
        path: 'service-provider-report',
        name: 'Service Provider Report',
        component: ResellerServiceProviderReport
      },
      {
        path: 'service-pack-utilization-report',
        name: 'Service Pack Utilization',
        component: ResellerServicePackUtilizationReport
      },
      {
        path: 'service-utilization-report',
        name: 'Service Utilization',
        component: ResellerServiceUtilizationReport
      },
      {
        path: 'dn-report',
        name: 'DN Report',
        component: ResellerDnReport
      }
    ]
  },
  {
    label: 'Provisioning',
    items: [
      {
        path: 'delete-reseller',
        name: 'Delete Reseller',
        component: ResellerDelete,
        hasLevel: 'Provisioning'
      },
      {
        path: 'audits',
        name: 'Audits (beta)',
        component: ResellerAudits,
        hasLevel: 'Reseller',
        isBreadcrumb: false
      },
      {
        path: 'exports',
        name: 'Exports (beta)',
        component: ResellerExports,
        hasLevel: 'Reseller',
        isBreadcrumb: false
      },
      {
        path: 'imports',
        name: 'Imports (beta)',
        component: ResellerImports,
        hasLevel: 'Reseller',
        isBreadcrumb: false
      }
    ]
  },
  {
    label: 'Odin',
    items: [
      {
        path: 'branding',
        name: 'Branding',
        angularComponent: 'brandingHostnames',
        isLevel: 'Reseller',
        isPaasAdmin: true
      },
      {
        path: 'events',
        name: 'Event History',
        angularComponent: 'odinEvents',
        isLevel: 'Reseller',
        isPaasAdmin: true
      },
      {
        path: 'webhooks',
        name: 'Webhook History',
        angularComponent: 'odinWebhooks',
        isLevel: 'Reseller',
        isPaasAdmin: true
      },
      {
        path: 'settings',
        name: 'Settings',
        angularComponent: 'odinSettings',
        isLevel: 'Reseller',
        isPaasAdmin: true
      }
    ]
  }
]
