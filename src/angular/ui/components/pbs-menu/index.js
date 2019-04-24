import angular from 'angular'
import _ from 'lodash'
import template from './index.html'
import './index.css'

angular.module('odin.ui').component('pbsMenu', {
  template,
  controller,
  transclude: true,
  bindings: { delay: '<' }
})

controller.$inject = ['$timeout', '$window']
function controller($timeout, $window) {
  const ctrl = this
  ctrl.$onInit = onInit
  ctrl.$postLink = postLink
  ctrl.add = add
  ctrl.remove = remove
  ctrl.select = select

  function onInit() {
    ctrl.sections = []
  }

  function add(section) {
    ctrl.sections.push(section)
  }

  function remove(section) {
    _.remove(ctrl.sections, section)
  }

  function select(item) {
    ctrl.sections.forEach(function(section) {
      section.items.forEach(function(_item) {
        _item.selected = false
      })
    })
    $timeout(function() {
      item.selected = true
      $window.scrollTo(0, 0)
    }, 1)
  }

  function postLink() {
    $timeout(function() {
      select(_.get(ctrl.sections, '0.items.0'))
    }, 5)
  }
}
