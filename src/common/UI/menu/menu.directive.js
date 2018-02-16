;(function() {
  var template =
    '<div class="columns">' +
    '  <div class="column is-one-quarter pbs-menu-nav">' +
    '    <aside class="menu">' +
    '      <ul class="menu-list">' +
    '        <li ng-repeat="item in $ctrl.items">' +
    '          <a ng-bind="item.label" ' +
    '             ng-class="{\'is-active\': item.selected}"' +
    '             ng-click="$ctrl.select(item)"></a>' +
    '        </li>' +
    '      </ul>' +
    '    </aside>' +
    '  </div>' +
    '  <div class="column pbs-menu-content" ng-transclude></div>' +
    '</div>'

  angular.module('odin.common').component('pbsMenu', {
    template: template,
    transclude: true,
    bindings: { delay: '<' },
    controller: function() {
      var ctrl = this
      ctrl.$onInit = onInit
      ctrl.$postLink = postLink
      ctrl.add = add
      ctrl.select = select

      function onInit() {
        ctrl.items = []
      }

      function add(item) {
        ctrl.items.push(item)
      }

      function select(item) {
        ctrl.items.forEach(function(_item) {
          _item.selected = false
        })
        item.selected = true
      }

      function postLink() {
        var firstItem = ctrl.items[0]
        select(firstItem)
      }
    }
  })
})()
