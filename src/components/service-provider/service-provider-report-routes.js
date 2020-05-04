export const ReportRoutes = [
  {
	  name: 'Trunk Call Capacity',
	  path: 'callCapacity',
	  angularComponent: 'serviceProviderTrunkGroupsCallCapacityReport',
	  hasLevel: 'Service Provider',
	  hasModuleRead: 'Trunk Call Capacity'
  },
  {
	  name: 'User Report',
	  path: 'userReport',
	  angularComponent: 'usersReport',
	  hasLevel: 'Service Provider',
      hasModuleRead: 'User Report'
  }
]
 
