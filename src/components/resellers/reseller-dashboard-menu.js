import { ResellerProfile } from './reseller-profile'

export const dashboardMenu = [
  {
    label: 'Dashboard',
    items: [
      {
        path: 'profile',
        name: 'Business Profile',
        component: ResellerProfile,
        acl: 'Provisioning'
      },
      {
        path: 'service-providers',
        name: 'Service Providers',
        angularComponent: 'serviceProviders'
      }
    ]
  }
]
