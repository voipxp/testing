;(function() {
  var template =
    '  <div class="tabs is-boxed" ng-class="$ctrl.class">' +
    '    <ul>' +
    '      <li ng-repeat="tab in $ctrl.tabs" ng-class="{\'is-active\': tab.selected}">' +
    '        <a ng-bind="tab.label" ng-click="$ctrl.select(tab)"></a>' +
    '      </li>' +
    '    </ul>' +
    '  </div>' +
    '  <div class="tabs-content" ng-transclude></div>'

  angular.module('odin.common').component('pbsTabs', {
    template: template,
    transclude: true,
    bindings: { delay: '<', class: '@' },
    controller: function($timeout, $location) {
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
        tab.selected = true
      }

      ctrl.$postLink = function() {
        var search = $location.search().tab
        var tab = _.find(ctrl.tabs, { label: search }) || ctrl.tabs[0]
        $timeout(function() {
          select(tab)
        }, 1)
      }
    }
  })
})()
