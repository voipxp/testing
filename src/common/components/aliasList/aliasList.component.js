;(function() {
  angular.module('odin.common').component('aliasList', {
    templateUrl: 'common/components/aliasList/aliasList.component.html',
    controller: Controller,
    bindings: { profile: '=' }
  })

  function Controller() {
    var ctrl = this
    ctrl.add = add
    ctrl.remove = remove
    ctrl.newAlias = ''

    ctrl.$onInit = function() {}

    function add() {
      if (!ctrl.profile.aliases) {
        ctrl.profile.aliases = []
      }
      if (!_.includes(ctrl.profile.aliases, ctrl.newAlias)) {
        ctrl.profile.aliases.push(ctrl.newAlias)
      }
      ctrl.newAlias = ''
    }

    function remove(index) {
      ctrl.profile.aliases.splice(index, 1)
    }
  }
})()
