import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectedUsers', {
  template,
  bindings: { users: '<' }
})
