;(function() {
  angular.module('odin.common').component('selectNumbers', {
    templateUrl: 'group/components/numbers/select.component.html',
    controller: Controller,
    bindings: {
      available: '=',
      selected: '=',
      availableTitle: '<',
      selectedTitle: '<'
    }
  })

  function Controller(NumberService) {
    var ctrl = this
    ctrl.add = add
    ctrl.addAll = addAll
    ctrl.remove = remove
    ctrl.removeAll = removeAll

    function addAll() {
      for (var i = 0; i < ctrl.available.length; i++) {
        ctrl.selected.push(ctrl.available[i])
        ctrl.available.splice(i, 1)
        i--
      }
    }

    function removeAll() {
      for (var i = 0; i < ctrl.selected.length; i++) {
        ctrl.available.push(ctrl.selected[i])
        ctrl.selected.splice(i, 1)
        i--
      }
    }

    function add(number) {
      _.remove(ctrl.available, number)
      if (number.max) {
        var numbers = NumberService.expand(number)
        numbers.forEach(function(_number) {
          delete _number.expanded
          ctrl.selected.push(_number)
        })
      } else {
        ctrl.selected.push(number)
      }
    }

    function remove(number) {
      _.remove(ctrl.selected, number)
      if (number.max) {
        var numbers = NumberService.expand(number)
        numbers.forEach(function(_number) {
          delete _number.expanded
          ctrl.available.push(_number)
        })
      } else {
        ctrl.available.push(number)
      }
    }
  }
})()
