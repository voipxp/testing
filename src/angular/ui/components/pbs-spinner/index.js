import angular from 'angular'
import template from './index.html'
import './index.css'

angular.module('odin.ui').component('pbsSpinner', {
  template,
  transclude: true,
  bindings: { loading: '<' }
})
