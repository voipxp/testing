/*
This is Quick help or info section, This section also included with
the pbs-navigation module but somewhere we need only help or info icon in angular.
*/

import angular from 'angular'
import template from './index.html'
import './index.css'

angular.module('odin.ui').component('pbsHelp', {
  template,
  controller,
  transclude: true,
  bindings: {
    module: '<',
  }
})

controller.$inject = ['$location', 'ACL', 'Route', '$window', 'Session']
function controller($location, ACL, Route, $window, Session) {
  this.$onInit = function() {
    this.returnTo = $location.search().returnTo
  }
  

  this.openLink = function() {
    if (!this.module.url) return
    $window.open(this.module.url, '_blank', 'noopener')
  }
  this.return = function() {
    $window.history.back()
    // $location.path(this.returnTo)
  }
}
