//import { Audits, Audit } from '@/components/audits'
import { Imports } from '@/components/imports'
import { Exports } from '@/components/exports'
import { ServiceProviderAudits } from './service-provider-audits'
export const ProvisioningRoutes = [
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
    path: 'exports',
    exact: true,
    component: Exports,
    hasLevel: 'Service Provider',
    isBreadcrumb: false
  },
  {
    name: 'Bulk Provisioning',
    path: 'bulk',
    angularComponent: 'bulkDashboard',
    hasLevel: 'Group Department',
    hasModuleRead: 'Provisioning'
  },
  {
    name: 'Devices',
    path: 'devices',
    acl: 'Reseller',
    angularComponent: 'serviceProviderDevices',
    hasLevel: 'Reseller'
  },
  {
    name: 'Delete Service Provider',
    path: 'delete',
    angularComponent: 'serviceProviderDelete',
    hasLevel: 'Reseller'
  },
  {
    name: 'Group Services',
    path: 'group-services',
    angularComponent: 'serviceProviderServices',
    hasLevel: 'Service Provider',
    serviceType: 'groupServices'
  },
  {
    name: 'Numbers',
    path: 'numbers',
    angularComponent: 'serviceProviderNumbers',
    hasLevel: 'Service Provider'
  },
  {
    name: 'Service Packs',
    path: 'service-packs',
    angularComponent: 'serviceProviderServicePacks',
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
