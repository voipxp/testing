;(function() {
  angular.module('odin.common').component('selectThings', {
    templateUrl: 'common/components/selectThings/selectThings.component.html',
    controller: Controller,
    bindings: { available: '=', selected: '=', property: '@', default: '@' }
  })

  function Controller() {
    var ctrl = this
    ctrl.add = add
    ctrl.remove = remove

    ctrl.$onInit = function() {
      ctrl.orderBy = ctrl.default
        ? ['-' + ctrl.default, ctrl.property]
        : ctrl.property
    }

    function add(thing) {
      _.remove(ctrl.available, thing)
      ctrl.selected.push(thing)
    }

    function remove(thing) {
      if (ctrl.default && thing[ctrl.default]) return
      _.remove(ctrl.selected, thing)
      ctrl.available.push(thing)
    }
  }
})()
