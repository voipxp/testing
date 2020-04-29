 
import { ServiceProviderAudits } from './system-audits'
export const ProvisioningRoutes = [
       
      {
        name: 'Bulk Provisioning',
        path: 'bulk',
        angularComponent: 'bulkDashboard',
        hasLevel: 'System',
        hasModuleRead: 'Provisioning'
	    },
	     
       
      {
        name: 'Service Providers',
        path:  'serviceProviders' ,
        angularComponent: 'serviceProviders',
		    hasLevel: 'Provisioning'
      },
      { 
          name: 'VDM',
          path:  'vdm',
          angularComponent: 'vdmDashboard',
          hasLevel: 'Provisioning',
		  module: 'VDM'
        }
]

 
