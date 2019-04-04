import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('pbsModuleLink', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = ['$window']
function controller($window) {
  this.open = function open() {
    $window.open(this.module.url, '_blank', 'noopener')
  }
}
