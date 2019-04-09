import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.common').component('selectUsers', {
  template,
  controller,
  bindings: { available: '=', selected: '=', sort: '<' }
})

function controller() {
  var ctrl = this
  ctrl.add = add
  ctrl.remove = remove
  ctrl.up = up
  ctrl.down = down
  ctrl.addAll = addAll
  ctrl.removeAll = removeAll

  ctrl.$onInit = function() {
    ctrl.orderBy = ctrl.sort ? null : 'userId'
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
