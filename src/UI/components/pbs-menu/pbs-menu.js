import angular from 'angular'
import _ from 'lodash'
import template from './pbs-menu.html'

angular.module('odin.UI').component('pbsMenu', {
  template,
  controller,
  transclude: true,
  bindings: { delay: '<' }
})

controller.$inject = ['$timeout', '$window', '$location']
function controller($timeout, $window, $location) {
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
      $location.search('menu', generateHash(item))
      $location.search('tab', null)
      item.selected = true
      $window.scrollTo(0, 0)
    }, 1)
  }

  function generateHash(item) {
    return `${item.section}:${item.label}`
  }

  function parseHash(hash) {
    if (!hash) return
    const split = hash.split(':')
    return { _section: split[0], _item: split[1] }
  }

  function postLink() {
    $timeout(function() {
      const search = $location.search().menu
      let item
      if (search) {
        const { _section, _item } = parseHash(search)
        if (_section && _item) {
          const section = ctrl.sections.find(s => s.label === _section)
          if (section) {
            item = section.items.find(i => i.label === _item)
          }
        }
      }
      select(item || _.get(ctrl.sections, '0.items.0'))
    }, 5)
  }
}
