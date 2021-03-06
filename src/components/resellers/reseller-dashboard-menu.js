import { ResellerAdmins } from './reseller-admins'
import { ResellerProfile } from './reseller-profile'
import { ResellerDelete } from './reseller-delete'
import { ResellerServiceProviders } from './reseller-service-providers'
import { ResellerServiceProviderReport } from './reseller-service-provider-report'
import { ResellerServicePackUtilizationReport } from './reseller-service-pack-utilization-report'
import { ResellerServiceUtilizationReport } from './reseller-service-utilization-report'
import { ServiceProviderOdinSupport } from '../service-provider/service-provider-odin-support'
import { ResellerDnReport } from './reseller-dn-report'
import { ResellerAudits } from './reseller-audits'
import { ResellerExports } from './reseller-exports'
import { ResellerImports } from './reseller-imports'

export const dashboardMenu = [
  {
    label: 'Dashboard',
    items: [
      {
        path: 'admins',
        name: 'Administrators',
        component: ResellerAdmins
      },
      {
        path: 'profile',
        name: 'Business Profile',
        component: ResellerProfile
      },
      {
        path: 'service-providers',
        name: 'Service Providers',
        component: ResellerServiceProviders,
        default: true
      }
    ]
  },
  {
    label: 'Reports',
    items: [
      {
        path: 'dn-report',
        name: 'DN Report',
        component: ResellerDnReport
      },
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
      }
    ]
  },
  {
    label: 'Provisioning',
    items: [
      {
        path: 'audits',
        name: 'Audits',
        component: ResellerAudits,
        hasLevel: 'Reseller',
        isBreadcrumb: false
      },
      {
        path: 'delete-reseller',
        name: 'Delete Reseller',
        component: ResellerDelete,
        hasLevel: 'Provisioning'
      },
      {
        path: 'exports',
        name: 'Migrate',
        component: ResellerExports,
        hasLevel: 'Reseller',
        isBreadcrumb: false
      },
      {
        path: 'imports',
        name: 'Imports',
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
        path: 'settings',
        name: 'Settings',
        angularComponent: 'odinSettings',
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
        name: 'Support',
        path: 'support',
        component: ServiceProviderOdinSupport,
        hasLevel: 'Service Provider'
      }
    ]
  }
]
