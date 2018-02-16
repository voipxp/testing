;(function() {
  angular.module('odin.group').component('meetMeBridgeProfile', {
    templateUrl:
      'group/components/meetMe/bridge/meetMeBridgeProfile.component.html',
    controller: Controller,
    require: { parent: '^meetMeBridge' }
  })

  function Controller() {
    var ctrl = this

    ctrl.update = update

    function update(event) {
      var bridge = angular.copy(ctrl.parent.bridge)
      bridge.serviceInstanceProfile = event.profile
      ctrl.parent.update(bridge, event.callback)
    }
  }
})()
