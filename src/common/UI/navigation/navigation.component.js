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

;(function() {
  angular.module('odin.common').component('pbsNavigation', {
    templateUrl: 'common/UI/navigation/navigation.component.html',
    transclude: true,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      userId: '<'
    },
    controller: function($location, Session, ACL, Route) {
      this.$onInit = function() {
        this.session = Session.data()
        this.returnTo = $location.search().returnTo
      }
      this.has = ACL.has
      this.dashboard = Route.dashboard
      this.openServiceProvider = function(serviceProviderId) {
        Route.open('serviceProviders')(serviceProviderId)
      }
      this.openGroup = function(groupId) {
        if (groupId) {
          Route.open('groups')(this.serviceProviderId, groupId)
        } else {
          Route.open('serviceProviders')(this.serviceProviderId, 'groups')
        }
      }
      this.openUser = function(userId) {
        if (userId) {
          Route.open('users')(this.serviceProviderId, this.groupId, userId)
        } else {
          Route.open('groups', this.serviceProviderId, this.groupId)('users')
        }
      }
    }
  })
})()
