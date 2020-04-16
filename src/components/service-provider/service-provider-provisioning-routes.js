//import { Audits, Audit } from '@/components/audits'

export const ProvisioningRoutes = [
   
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

 
