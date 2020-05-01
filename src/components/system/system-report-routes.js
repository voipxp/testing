export const ReportRoutes = [
		{
			name: 'DN Reports',
			angularComponent: 'systemDn',
			path: 'dn',
			hasLevel: 'System'
		},
		{
			name: 'License Reports',
			angularComponent: 'systemLicensing',
			path: 'systemLicensing',
			hasLevel: 'System'
		},
	    {
		    name: 'Service Pack Utilization Report',
		    path: 'servicePackUtilizationReport',
        	angularComponent: 'systemServicePackUtilizationReport',
		    hasLevel: 'Provisioning',
		    hasModuleRead: 'User Report'
	    },
      	{
        	name: 'Service Provider Report',
        	path: 'serviceProviderReport',
		    angularComponent: 'serviceProviderReport',
		    hasLevel: 'Provisioning',
		    hasModuleRead: 'User Report'
      	},
      	{
        	name: 'Service Utilization Report',
        	path: 'serviceUtilizationReport',
		    angularComponent: 'systemServiceUtilizationReport',
		    hasLevel: 'Provisioning',
        	hasModuleRead: 'User Report'
        },
]
 
