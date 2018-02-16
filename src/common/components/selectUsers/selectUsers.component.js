;(function() {
  angular.module('odin.common').component('selectUsers', {
    templateUrl: 'common/components/selectUsers/selectUsers.component.html',
    controller: Controller,
    bindings: { available: '=', selected: '=', sort: '<' }
  })

  function Controller() {
    var ctrl = this
    ctrl.add = add
    ctrl.remove = remove
    ctrl.up = up
    ctrl.down = down

    ctrl.$onInit = function() {
      ctrl.orderBy = ctrl.sort ? null : 'userId'
    }

    function up(user, event) {
      event.stopPropagation()
      var index = _.indexOf(ctrl.selected, user)
      if (index === ctrl.selected.length - 1) return
      move(index, index + 1)
    }

    function down(user, event) {
      event.stopPropagation()
      var index = _.indexOf(ctrl.selected, user)
      if (index === 0) return
      move(index, index - 1)
    }

    function move(from, to) {
      ctrl.selected.splice(to, 0, ctrl.selected.splice(from, 1)[0])
    }

    function add(user) {
      _.remove(ctrl.available, user)
      ctrl.selected.push(user)
    }

    function remove(user) {
      _.remove(ctrl.selected, user)
      ctrl.available.push(user)
    }
  }
})()
