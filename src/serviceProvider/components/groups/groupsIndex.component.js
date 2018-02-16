;(function() {
  angular
    .module('odin.serviceProvider')
    .component('serviceProviderGroupsIndex', {
      templateUrl:
        'serviceProvider/components/groups/groupsIndex.component.html',
      controller: function($routeParams) {
        this.serviceProviderId = $routeParams.serviceProviderId
      }
    })
})()
