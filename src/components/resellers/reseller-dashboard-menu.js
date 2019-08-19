import { ResellerAdmins } from './reseller-admins'
import { ResellerProfile } from './reseller-profile'
import { ResellerDelete } from './reseller-delete'
import { ResellerServiceProviders } from './reseller-service-providers'

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
    label: 'Provisioning',
    items: [
      {
        path: 'delete-reseller',
        name: 'Delete Reseller',
        component: ResellerDelete,
        hasLevel: 'Provisioning'
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
