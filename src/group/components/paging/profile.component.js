;(function() {
  angular.module('odin.group').component('groupPagingGroupProfile', {
    templateUrl: 'group/components/paging/profile.component.html',
    controller: Controller,
    require: { parent: '^groupPagingGroup' }
  })

  function Controller() {
    var ctrl = this

    ctrl.update = update

    function update(event) {
      var instance = angular.copy(ctrl.parent.instance)
      instance.serviceInstanceProfile = event.profile
      ctrl.parent.update(instance, event.callback)
    }
  }
})()
