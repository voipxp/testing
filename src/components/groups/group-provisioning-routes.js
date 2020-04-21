import {
  GroupExtensionLength
} from './group-extension-length'
export const ProvisioningRoutes = [
     {
        name: 'Assign Numbers',
		path: 'groupNumbers',
        angularComponent: 'groupNumbers',
        hasLevel: 'Service Provider',
        isPaasAdmin: true
      },
      {
        name: 'Devices',
		path: 'groupDevices',
		angularComponent: 'groupDevices',
        hasLevel: 'Group',
        isPaasAdmin: true
      },
      {
        
	    name: 'Device Configuration',
		path: 'groupDeviceTypes',
        angularComponent: 'groupDeviceTypes',
        hasLevel: 'Group',
        isPaasAdmin: true
      },
	  {
        
	    name: 'Group Extension Length',
		path: 'groupExtensionLength',
        component: GroupExtensionLength,
        hasLevel: 'Group',
        isPaasAdmin: true,
		isBreadcrumb: false
      },
      {
        name: 'User Services',
		path: 'userServices',
        angularComponent: 'groupServices',
		hasLevel: 'Service Provider',
		serviceType: 'userServices',
        isPaasAdmin: true
      },
      {
        name: 'Group Services',
		path: 'groupServices',
		angularComponent: 'groupServices',
		hasLevel: 'Service Provider',
		serviceType: 'groupServices',
        isPaasAdmin: true
      },
      {
        name: 'Service Packs',
		path: 'servicePackServices',
		angularComponent: 'groupServices',
		serviceType: 'servicePackServices',
		hasLevel: 'Service Provider',
        isPaasAdmin: true
      },
      {
        name: 'Delete Group',
        path:  'groupDelete' ,
        angularComponent: 'groupDelete',
		hasLevel: 'Service Provider',
        serviceProviderPolicy: 'groupDelete',
        isPaasAdmin: true
      },
      
]

 
