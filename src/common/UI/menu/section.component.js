;(function() {
  angular.module('odin.common').component('pbsMenuSection', {
    template: '<div ng-transclude></div>',
    bindings: { label: '@', delay: '<' },
    require: { menu: '^pbsMenu' },
    transclude: true,
    controller: function() {
      var ctrl = this
      ctrl.$onInit = onInit
      ctrl.$onDestroy = onDestroy
      ctrl.add = add
      ctrl.remove = remove

      function onInit() {
        ctrl.section = {
          label: ctrl.label,
          items: []
        }
        ctrl.menu.add(ctrl.section)
      }

      function onDestroy() {
        ctrl.menu.remove(ctrl.section)
      }

      function sortItems() {
        ctrl.section.items = _.sortBy(ctrl.section.items, ['label'])
      }

      function add(item) {
        ctrl.section.items.push(item)
        sortItems()
      }

      function remove(item) {
        _.remove(ctrl.section.items, item)
        sortItems()
      }
    }
  })
})()
