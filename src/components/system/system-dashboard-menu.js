import { ProvisioningRouteSettings  } from './system-provisioning-settings'
import { Audits, Audit } from '@/components/audits'
import { Imports } from '@/components/imports'
import { Exports } from '@/components/exports'
export const dashboardMenu = [
  {
    label: 'Dashboard',
    items: [
	 {
        name: 'Collaborate',
		path: 'collaborate',
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
        name: 'Network Class of Services',
		path: 'networkClassOfServices',
		angularComponent: 'systemNetworkClassOfServices',
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
  },
  {
    label: 'Provisioning',
    items: [
		{ 
		name: 'Provisioning',
        path: 'provisioning',
        component: ProvisioningRouteSettings,
		hasLevel: 'Provisioning',
        hasLevel: 'System'
       
        }
      ]
  },
  {
    label: 'Service Providers',
    items: [
		{
		  name: 'Service Providers',
		  path: 'serviceProviders',
		  angularComponent: 'serviceProvidersPanel',
		  limitTo:10
        }
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
        path: 'logins',
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
