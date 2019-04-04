import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupHuntGroupIncoming', {
  template,
  require: { parent: '^groupHuntGroup' }
})
