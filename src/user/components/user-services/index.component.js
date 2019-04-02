;(function() {
  angular.module('odin.user').component('userServicesIndex', {
    templateUrl: 'user/components/services/index.component.html',
    controller: Controller,
    bindings: { module: '<', serviceType: '@' }
  })

  function Controller($routeParams, $filter) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId

    ctrl.$onInit = function() {
      ctrl.title = $filter('humanize')(ctrl.serviceType)
    }
  }
})()
