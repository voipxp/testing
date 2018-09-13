;(function() {
  angular.module('odin.system').component('systemNetworkClassOfService', {
    templateUrl:
      'system/components/networkClassOfService/service.component.html',
    controller: Controller
  })

  function Controller($routeParams, Route) {
    var ctrl = this
    ctrl.name = $routeParams.name
    ctrl.back = back

    function back() {
      Route.open('system', 'networkClassOfServices')
    }
  }
})()
