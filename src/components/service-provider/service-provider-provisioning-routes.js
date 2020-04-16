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
    hasLevel: 'Service Provider',
    isBreadcrumb: false
      },
      {
        name: 'Export (beta)',
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
         
        name: 'Group Services',
        path:  'group-ervices',
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
        path:  'service-packs' ,
        angularComponent: 'serviceProviderServicePacks',
		hasLevel: 'Service Provider'
      },
      {
        name: 'User Services',
        path:  'user-services',
		angularComponent: 'serviceProviderServices',
		hasLevel: 'Service Provider',
		serviceType: 'userServices'		
      } 
      
]

 
