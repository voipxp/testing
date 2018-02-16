;(function() {
  angular.module('odin.common').component('pbsModuleLink', {
    templateUrl: 'common/components/moduleLink/link.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(Module, $window) {
    this.open = function open() {
      $window.open(this.module.url, '_blank', 'noopener')
    }
  }
})()
