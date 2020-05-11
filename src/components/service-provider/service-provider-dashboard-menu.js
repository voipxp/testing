import { ReportRouteSettings } from './service-provider-report-settings'
//import { ManagementRouteSettings } from './service-provider-management-settings'
// import { ProvisioningRouteSettings  } from './service-provider-provisioning-settings'
import { Imports } from '@/components/imports'
import { Exports } from '@/components/exports'
import { ServiceProviderAudits } from './service-provider-audits'
export const dashboardMenu = [
  {
    label: 'Dashboard',
    items: [
      {
        name: 'Administrators',
        path:  'Administrators' ,
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
		    name: 'Provisioning',
        //path: 'provisioning',
        // component: ProvisioningRouteSettings
        subMenus: [
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
           name: 'Devices',
           path:  'devices',
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
           path:  'group-services',
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
      },
      {
		    name: 'Reports',
        path: 'reports',
        component: ReportRouteSettings
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
		  module: 'Trunk Group',
		  isEnterprise: true
        },
	    {
        name: 'Meet-Me Conferencing',
        path: 'meetMeConferencing',
        angularComponent: 'serviceProviderMeetMe',
        hasLevel: 'Service Provider',
        hasModuleRead: 'Meet-Me Conferencing',
        module: 'Meet-Me Conferencing',
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
