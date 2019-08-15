import { ResellerAdmins } from './reseller-admins'
export const dashboardMenu = [
  {
    label: 'Dashboard',
    items: [
      {
        path: 'service-providers',
        name: 'Service Providers',
        angularComponent: 'serviceProviders'
      },
      {
        path: 'admins',
        name: 'Reseller Admins',
        component: ResellerAdmins
      }
    ]
  }
]
