;(function() {
  var template =
    '<div class="columns">' +
    '  <div class="column is-one-quarter pbs-menu-nav">' +
    '    <aside class="menu pbs-menu-container">' +
    '      <p class="menu-label"' +
    '         ng-repeat-start="section in $ctrl.sections"' +
    '         ng-if="section.label && section.items.length"' +
    '         ng-bind="section.label">' +
    '      </p>' +
    '      <ul class="menu-list pbs-menu-list"' +
    '          ng-if="section.items.length"' +
    '          ng-repeat-end>' +
    '        <li ng-repeat="item in section.items | orderBy:\'label\'">' +
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
    controller: function($timeout, $window, $location) {
      var ctrl = this
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
          $location.hash(generateHash(item))
          item.selected = true
          $window.scrollTo(0, 0)
        }, 1)
      }

      function generateHash(item) {
        return `${item.section}:${item.label}`
      }

      function parseHash(hash) {
        const split = hash.split(':')
        return { _section: split[0], _item: split[1] }
      }

      function postLink() {
        const { _section, _item } = parseHash($location.hash())
        var item
        if (_section && _item) {
          var section = ctrl.sections.find(s => s.label === _section)
          if (section) {
            item = section.items.find(i => i.label === _item)
          }
        }
        select(item || _.get(ctrl.sections, '0.items.0'))
      }
    }
  })
})()
