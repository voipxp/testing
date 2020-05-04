import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('pbsModuleDescription', {
  template,
  controller: function() {},
  bindings: { module: '<' }
})
