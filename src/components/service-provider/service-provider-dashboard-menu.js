import { ReportRouteSettings } from './service-provider-report-settings'
//import { ManagementRouteSettings } from './service-provider-management-settings'
import { ProvisioningRouteSettings  } from './service-provider-provisioning-settings'
export const dashboardMenu = [
  {
    label: 'Dashboard',
    items: [
      {
        name: 'Administrators',
        path:  'admins' ,
		angularComponent: 'serviceProviderAdmins',
		hasLevel: 'Service Provider'
      },
	  {
        name: 'Business Profile',
        path: 'profile',
        angularComponent: 'serviceProviderProfile',
		hasLevel: 'Service Provider'
      },
	  {
        name: 'Groups',
        path:  'groups' ,
		angularComponent: 'serviceProviderGroupsIndex',
		hasLevel: 'Service Provider'
      },
        
	  {
		name: 'Reports',
        path: 'reports',
        component: ReportRouteSettings
      },
	  {
		name: 'Provisioning',
        path: 'provisioning',
        component: ProvisioningRouteSettings
      },
	  /*{
		name: 'Management',
        path: 'management',
        component: ManagementRouteSettings
      },*/
	  ]
  },
  {
    label: 'Services',
    items: [
		{
		  name: 'Enterprise Trunk',
		  path: 'enterpriseTrunks',
		  angularComponent: 'enterpriseEnterpriseTrunks',
		  hasLevel: 'Service Provider',
		  hasModuleRead: 'Trunk Group',
		  isEnterprise: true
        },
	    {
		  name: 'Meet-Me Conferencing',
		  path: 'meetMe',
		  angularComponent: 'serviceProviderMeetMe',
		  hasLevel: 'Service Provider',
          hasModuleRead: 'Meet-Me Conferencing',
		  service: 'Meet-Me Conferencing'
		}
      ]
  },
  {
    label: 'Management',
    items: [
      {
        name: 'Directory',
        path:  'directory',
		angularComponent: 'serviceProviderPhoneDirectory',
		hasLevel: 'Service Provider'		
      },
      
      { 
		name: 'Network Class of Service',
        path:  'networkClassOfServices' ,
		angularComponent: 'serviceProviderNetworkClassOfServices',
		hasLevel: 'Service Provider'
      },
    ]
  }, 
   {
    label: 'Utilities',
    items: [
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
        hasLevel: 'Service Provider',
        isPaasAdmin: true
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
        hasLevel: 'Service Provider',
        isPaasAdmin: true
      },
    ]
  }
]
