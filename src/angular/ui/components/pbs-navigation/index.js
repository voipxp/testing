/*
<pbs-navigation>
  <pbs-breadcrumb title="$ctrl.serviceProviderId"></pbs-breadcrumb>
  <pbs-breadcrumb title="'Static Title'"></pbs-breadcrumb>
  <pbs-breadcrumb title="'Static With Href'" href="'/monkey'"></pbs-breadcrumb>
  <pbs-breadcrumb title="'Static With Click'" on-click="$ctrl.doSomething()"></pbs-breadcrumb>
</pbs-navigation>

IDEA
  component-type will present a set of navigation links based on the user loginType
  <pbs-navigation nav-type="user"></pbs-navigation>
*/

import angular from 'angular'
import template from './index.html'
import './index.css'

angular.module('odin.ui').component('pbsNavigation', {
  template,
  controller,
  transclude: true,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    userId: '<',
    module: '<'
  }
})

controller.$inject = ['$location', 'ACL', 'Route', '$window', 'Session']
function controller($location, ACL, Route, $window, Session) {
  this.$onInit = function() {
    this.returnTo = $location.search().returnTo
  }
  this.has = ACL.has
  this.dashboard = Route.dashboard
  this.openServiceProvider = function(serviceProviderId) {
    if (serviceProviderId || ACL.has('Provisioning')) {
      Route.open('serviceProviders', serviceProviderId)
    } else {
      Route.open('resellers', Session.data('resellerId'), 'service-providers')
    }
  }
  this.openReseller = function(resellerId) {
    Route.open('resellers', resellerId)
  }
  this.openGroup = function(groupId) {
    if (groupId) {
      Route.open('groups', this.serviceProviderId, groupId)
    } else {
      Route.open('serviceProviders', this.serviceProviderId, 'groups')
    }
  }
  this.openUser = function(userId) {
    if (userId) {
      Route.open('users', this.serviceProviderId, this.groupId, userId)
    } else {
      Route.open('groups', this.serviceProviderId, this.groupId, 'users')
    }
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
