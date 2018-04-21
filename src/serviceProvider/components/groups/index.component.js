;(function() {
  angular
    .module('odin.serviceProvider')
    .component('serviceProviderGroupsIndex', {
      templateUrl: 'serviceProvider/components/groups/index.component.html',
      controller: function($routeParams) {
        this.serviceProviderId = $routeParams.serviceProviderId
      }
    })
})()
