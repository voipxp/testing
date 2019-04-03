import angular from 'angular'
import _ from 'lodash'

const template = `
    <div class="tabs" ng-class="$ctrl.class">
      <ul>
        <li ng-repeat="tab in $ctrl.tabs" ng-class="{'is-active': tab.selected}">
          <a ng-bind="tab.label" ng-click="$ctrl.select(tab)"></a>
        </li>
      </ul>
    </div>
    <div class="tabs-content" ng-transclude></div>
  `

angular.module('odin.UI').component('pbsTabs', {
  template: template,
  transclude: true,
  bindings: { delay: '<', class: '@' },
  controller
})

controller.$inject = ['$timeout', '$location']
function controller($timeout, $location) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.add = add
  ctrl.remove = remove
  ctrl.select = select

  function onInit() {
    ctrl.tabs = []
  }

  function add(tab) {
    ctrl.tabs.push(tab)
  }

  function remove(tab) {
    _.remove(ctrl.tabs, tab)
  }

  function select(tab) {
    ctrl.tabs.forEach(function(_tab) {
      _tab.selected = false
    })
    $timeout(function() {
      $location.search('tab', tab.label)
      tab.selected = true
    }, 1)
  }

  ctrl.$postLink = function() {
    $timeout(function() {
      var search = $location.search().tab
      select(_.find(ctrl.tabs, { label: search }) || ctrl.tabs[0])
    }, 5)
  }
}
