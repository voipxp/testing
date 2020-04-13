import { Audits, Audit } from '@/components/audits'
import { Imports, Import } from '@/components/imports'
import { Exports, Export } from '@/components/exports'
export const ProvisioningRoutes = [
		{
         
        name: 'Audit (beta)',
        module: 'Audit',
        exact: true,
		component: Audits,
		hasLevel: 'Service Provider'
      },
      {
         
        name: 'Import (beta)',
        module: 'Import',
		path: 'imports',
		exact: true,
		component: Imports,
		hasLevel: 'Service Provider'
      },
	  {
		path: '/imports/:id',
		component: Import,
		hasLevel: 'Service Provider'
	  },
      {
        name: 'Export (beta)',
        module: 'Export',
        path: 'exports',
		exact: true,
		component: Exports,
		hasLevel: 'Service Provider'
      },
	  {
		path: '/exports/:id',
		component: Export,
		hasLevel: 'Service Provider'
	  },
	  
      {
        name: 'Bulk Provisioning',
        path: 'bulk',
		angularComponent: 'bulkDashboard',
		hasLevel: 'Group Department',
		hasModuleRead: 'Provisioning'
	  },
      {
         
        name: 'Delete Service Provider',
        path:  'delete' ,
		angularComponent: 'serviceProviderDelete',
        acl: 'Reseller',
		hasLevel: 'Reseller'
      },
      {
         
        name: 'Numbers',
        path:  'numbers',
		angularComponent: 'serviceProviderNumbers',
        hasLevel: 'Service Provider'		
      },
      {
        name: 'Devices',
        path:  'devices',
        acl: 'Reseller',
		angularComponent: 'serviceProviderDevices',
		hasLevel: 'Reseller'

      },
      {
         
        name: 'Service Packs',
        path:  'servicePacks' ,
        module: 'Service Packs'
      },
      {
        name: 'User Services',
        path:  'userServices',
		angularComponent: 'serviceProviderServices',
		hasLevel: 'Service Provider',
		serviceType: 'userServices'		
      },
      {
         
        name: 'Group Services',
        path:  'groupServices',
		angularComponent: 'serviceProviderServices',
		hasLevel: 'Service Provider',
		serviceType: 'groupServices'
      },
]

 
