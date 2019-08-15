import { ResellerAdmins } from './reseller-admins'
import { ResellerProfile } from './reseller-profile'
import { ResellerDelete } from './reseller-delete'

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
      },
      {
        path: 'admins',
        name: 'Reseller Admins',
        component: ResellerAdmins
      },
      {
        path: 'delete-reseller',
        name: 'Delete Reseller',
        component: ResellerDelete
      }
    ]
  }
]
