import angular from 'angular'
import template from './index.html'
import './index.css'

angular.module('odin.UI').component('pbsSpinner', {
  template,
  transclude: true,
  bindings: { loading: '<' }
})
