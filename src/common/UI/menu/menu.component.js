;(function() {
  var template =
    '<div class="columns">' +
    '  <div class="column is-one-quarter pbs-menu-nav">' +
    '    <aside class="menu pbs-menu-container">' +
    '      <p class="menu-label"' +
    '         ng-repeat-start="section in $ctrl.sections"' +
    '         ng-show="section.label"' +
    '         ng-bind="section.label">' +
    '      </p>' +
    '      <ul class="menu-list pbs-menu-list"' +
    '          ng-repeat-end>' +
    '        <li ng-repeat="item in section.items">' +
    '          <a ng-bind="item.label" ' +
    '             ng-class="{\'is-active\': item.selected}"' +
    '             ng-click="$ctrl.select(item)"></a>' +
    '        </li>' +
    '      </ul>' +
    '    </aside>' +
    '  </div>' +
    '  <div class="column is-three-quarters pbs-menu-content" ng-transclude></div>' +
    '</div>'

  angular.module('odin.common').component('pbsMenu', {
    template: template,
    transclude: true,
    bindings: { delay: '<' },
    controller: function($timeout, $window) {
      var ctrl = this
      ctrl.$onInit = onInit
      ctrl.$postLink = postLink
      ctrl.add = add
      ctrl.select = select

      function onInit() {
        ctrl.sections = []
      }

      function add(section) {
        ctrl.sections.push(section)
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
        var item = _.get(ctrl.sections, '0.items.0')
        select(item)
      }
    }
  })
})()
