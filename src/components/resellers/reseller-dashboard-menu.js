import { ResellerAdmins } from './reseller-admins'
import { ResellerProfile } from './reseller-profile'
import { ResellerDelete } from './reseller-delete'

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
        name: 'Administrators',
        component: ResellerAdmins
      }
    ]
  },
  {
    label: 'Provisioning',
    items: [
      // TODO:
      // this is hwere because we can do a getRequest as a reseller
      // need to figure out a way around this
      {
        path: 'profile',
        name: 'Business Profile',
        component: ResellerProfile,
        acl: 'Provisioning'
      },
      {
        path: 'delete-reseller',
        name: 'Delete Reseller',
        component: ResellerDelete,
        acl: 'Provisioning'
      }
    ]
  }
]
