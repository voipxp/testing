export const ReportRoutes = [
  {
	  name: 'Trunk Call Capacity',
	  path: 'call-capacity',
	  angularComponent: 'serviceProviderTrunkGroupsCallCapacityReport',
	  hasLevel: 'Service Provider',
	  hasModuleRead: 'Trunk Call Capacity'
  },
  {
	  name: 'User Report',
	  path: 'user-report',
	  angularComponent: 'usersReport',
	  hasLevel: 'Service Provider',
      hasModuleRead: 'User Report'
  }
]
 
