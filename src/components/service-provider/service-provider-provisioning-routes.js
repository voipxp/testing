//import { Audits, Audit } from '@/components/audits'
import { Imports } from '@/components/imports'
import { Exports } from '@/components/exports'
import { ServiceProviderAudits } from './service-provider-audits'
export const ProvisioningRoutes = [
       {
        path: 'audits',
        name: 'Audits (beta)',
        component: ServiceProviderAudits,
        hasLevel: 'Service Provider',
        isBreadcrumb: false
      },
		 
      {
         
        name: 'Import (beta)',
		path: 'imports',
		exact: true,
		component: Imports,
		hasLevel: 'Service Provider'
      },
      {
        name: 'Export (beta)',
        path: 'exports',
		exact: true,
		component: Exports,
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
         
        name: 'Group Services',
        path:  'groupServices',
		angularComponent: 'serviceProviderServices',
		hasLevel: 'Service Provider',
		serviceType: 'groupServices'
      },
      {
         
        name: 'Numbers',
        path:  'numbers',
		angularComponent: 'serviceProviderNumbers',
        hasLevel: 'Service Provider'		
      },
      
      {
         
        name: 'Service Packs',
        path:  'servicePacks' ,
        angularComponent: 'serviceProviderServicePacks',
		hasLevel: 'Service Provider'
      },
      {
        name: 'User Services',
        path:  'userServices',
		angularComponent: 'serviceProviderServices',
		hasLevel: 'Service Provider',
		serviceType: 'userServices'		
      } 
      
]

 
