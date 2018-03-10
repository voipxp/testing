;(function() {
  angular.module('odin.common').component('userSearchPanelUser', {
    templateUrl: 'common/components/userSearch/searchPanelUser.component.html',
    controller: Controller,
    bindings: { user: '<' }
  })

  function Controller() {
    var ctrl = this
    ctrl.$onChanges = onChanges

    function onChanges(changes) {
      if (changes.user && changes.user.currentValue) {
        ctrl.name = _.compact(
          _.uniq([ctrl.user.firstName, ctrl.user.lastName])
        ).join(' ')
        ctrl.phone = _.compact([
          ctrl.user.phoneNumber,
          ctrl.user.extension
        ]).join(', ')
      }
    }
  }
})()
