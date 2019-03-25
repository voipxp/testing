import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.common').component('selectThings', {
  template,
  controller,
  bindings: {
    available: '=',
    selected: '=',
    orderBy: '<',
    property: '@',
    availableTitle: '@',
    selectedTitle: '@'
  }
})

function controller() {
  var ctrl = this
  ctrl.$onChanges = onChanges
  ctrl.add = add
  ctrl.addAll = addAll
  ctrl.remove = remove
  ctrl.removeAll = removeAll

  function onChanges(changes) {
    if (changes.orderBy) {
      ctrl.orderBy = changes.orderBy.currentValue || ctrl.property
    }
  }

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
