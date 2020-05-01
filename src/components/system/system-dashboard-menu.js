import { ReportRouteSettings  } from './system-report-settings'
import { Audits, Audit } from '@/components/audits'
import { Imports } from '@/components/imports'
import { Exports } from '@/components/exports'
export const dashboardMenu = [
  {
    label: 'Dashboard',
    items: [
      {
        name: 'Service Providers',
        path: 'serviceProviders',
        angularComponent: 'serviceProviders',
        limitTo:10
      },
      {
        name: 'Bulk Provisioning',
        path: 'bulk',
        angularComponent: 'bulkDashboard',
        hasLevel: 'System',
        hasModuleRead: 'Provisioning'
	    },
	     
      { 
        name: 'VDM',
        path:  'vdm',
        angularComponent: 'vdmDashboard',
        hasLevel: 'Provisioning',
        module: 'VDM'
      } ,
      
	    
	  
	  ]
  },
  {
    label: 'Report',
    items: [
		{ 
		    name: 'Report',
        path: 'report',
        component: ReportRouteSettings,
		    hasLevel: 'Provisioning',
        hasLevel: 'System'
       
        }
      ]
  },

 {
    label: 'Management',
    items: [

  {
    name: 'Collaborate',
    path: 'systemCollaborate',
    angularComponent: 'systemCollaborate',
    acl: 'System',
    hasLevel: 'System'
  },
   {
    name: 'Devices',
    path: 'devices',
    angularComponent: 'systemDevices',
    acl: 'System',
    hasLevel: 'System'
  },
  {
    name: 'Network Class of Services',
    path: 'networkClassOfServices',
    angularComponent: 'systemNetworkClassOfServices',
    hasLevel: 'System'
  },
    ]
},

  {
    label: 'Utilities',
    items: [
	{
        path: 'audits',
        name: 'Audits (beta)',
        component: Audits,
        isBreadcrumb: false
      },
      {
        path: 'branding',
        name: 'Branding',
        angularComponent: 'brandingHostnames',
        hasLevel: 'Service Provider',
        isPaasAdmin: true
      },
      {
        path: 'events',
        name: 'Event History',
        angularComponent: 'odinEvents',
        hasLevel: 'System',
        isPaasAdmin: true
      },
	  {
        name: 'Export (beta)',
        path: 'exports',
        exact: true,
        component: Exports,
        hasLevel: 'System',
        isBreadcrumb: false
      },
	  {
        name: 'Import (beta)',
        path: 'imports',
        exact: true,
        component: Imports,
        hasLevel: 'System',
        isBreadcrumb: false
      },
	  {
        name: 'Login History',
        path: 'userLoginsha',
		angularComponent: 'odinUserLoginIndex',
		isPaasAdmin: false
      },
      {
        path: 'settings',
        name: 'Settings',
        angularComponent: 'odinSettings',
        hasLevel: 'Service Provider',
        isPaasAdmin: true
      },
	  {
        path: 'webhooks',
        name: 'Webhook History',
        angularComponent: 'odinWebhooks',
        hasLevel: 'System',
        isPaasAdmin: true
      },
    ]
  }
]
