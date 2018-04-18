;(function() {
  var template =
    '<div ng-if="$ctrl.shouldLoad()">' +
    '  <div ng-show="$ctrl.item.selected" ng-transclude></div>' +
    '</div>'

  angular.module('odin.common').component('pbsMenuItem', {
    template: template,
    bindings: { label: '@', delay: '<' },
    require: { section: '^pbsMenuSection' },
    transclude: true,
    controller: function() {
      var ctrl = this
      ctrl.$onInit = onInit
      ctrl.shouldLoad = shouldLoad

      function onInit() {
        ctrl.item = {
          label: ctrl.label,
          selected: false
        }
        ctrl.section.add(ctrl.item)
      }

      function shouldLoad() {
        // always show if selected
        if (ctrl.item.selected) return true
        // if delay is implicitly set to false then show
        if (ctrl.delay === false) return true
        // if delay is implicitly set to true then hide
        if (ctrl.delay === true) return false
        // if section is set to true then hide
        if (ctrl.section.delay === true) return false
        // if menu delay is not set to true then show
        if (ctrl.section.menu.delay === true) return false
      }
    }
  })
})()
