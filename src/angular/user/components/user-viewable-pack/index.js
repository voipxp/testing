import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userViewablePack', {
  template,
  controller,
  bindings: { userId: '<', groupId: '<', serviceProviderId: '< ' }
})

controller.$inject = ['Alert', 'UserViewablePackService', 'GroupViewablePackService', '$q']
function controller(Alert, UserViewablePackService, GroupViewablePackService, $q) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.select = select

  var defaultPack = {
    id: 0,
    name: 'Default (view all)'
  }

  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadPack(), loadPacks()])
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadPack() {
    return UserViewablePackService.show(ctrl.userId).then(function(data) {
      ctrl.pack = data || defaultPack
    })
  }

  function loadPacks() {
    return GroupViewablePackService.index(ctrl.serviceProviderId, ctrl.groupId).then(function(
      data
    ) {
      ctrl.packs = data
      ctrl.packs.push(defaultPack)
    })
  }

  function select(pack) {
    Alert.confirm
      .open('Are you sure you want to select this Viewable Service Pack?')
      .then(function() {
        Alert.spinner.open()
        UserViewablePackService.update(ctrl.userId, pack.id)
          .then(loadPack)
          .then(function() {
            Alert.notify.success('Viewable Service Pack Selected')
          })
          .catch(function(error) {
            Alert.notify.danger(error)
          })
          .finally(function() {
            Alert.spinner.close()
          })
      })
  }
}
