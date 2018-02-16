;(function() {
  angular.module('odin.common').component('userDescription', {
    templateUrl:
      'common/components/userDescription/userDescription.component.html',
    bindings: { user: '<' },
    controller: Controller
  })

  function Controller() {
    var ctrl = this
    ctrl.$onChanges = onChanges

    function onChanges(changes) {
      if (changes.user && changes.user.currentValue) {
        ctrl.name = _.uniq([ctrl.user.firstName, ctrl.user.lastName]).join(' ')
      }
    }
  }
})()
