;(function() {
  angular.module('odin.common').component('pbsMenuSection', {
    template: '<div ng-transclude></div>',
    bindings: { label: '@', delay: '<' },
    require: { menu: '^pbsMenu' },
    transclude: true,
    controller: function() {
      var ctrl = this
      ctrl.$onInit = onInit
      ctrl.add = add

      function onInit() {
        ctrl.section = {
          label: ctrl.label,
          items: []
        }
        ctrl.menu.add(ctrl.section)
      }

      function add(item) {
        ctrl.section.items.push(item)
      }
    }
  })
})()
