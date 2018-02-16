;(function() {
  angular.module('odin.group').component('groupViewablePacks', {
    templateUrl: 'group/components/viewablePacks/viewablePacks.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<'
    }
  })

  function Controller($routeParams, Alert, GroupViewablePackService, $q) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.addService = addService
    ctrl.removeService = removeService
    ctrl.addAllServices = addAllServices

    function onInit() {
      ctrl.loading = true
      $q
        .all([loadViewablePacks(), loadViewableServices()])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadViewablePacks() {
      return GroupViewablePackService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        console.log('packs', data)
        ctrl.packs = data
        return data
      })
    }

    function loadViewableServices() {
      return GroupViewablePackService.services(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.services = data
        return data
      })
    }

    // copy the pack and load the services excluding
    // ones already selected in the pack
    function loadPack(pack) {
      if (!pack) {
        ctrl.editPack = { services: [] }
        ctrl.editServices = angular.copy(ctrl.services)
        return $q.when()
      }
      Alert.spinner.open()
      return GroupViewablePackService.show(
        ctrl.serviceProviderId,
        ctrl.groupId,
        pack.id
      )
        .then(function(data) {
          var services = angular.copy(ctrl.services)
          ctrl.editPack = data
          ctrl.editServices = _.filter(services, function(service) {
            return !_.find(ctrl.editPack.services, { id: service.id })
          })
          console.log('editPack', ctrl.editPack)
          console.log('editServices', ctrl.editServices)
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function edit(pack) {
      var onSave
      var onDelete
      if (pack) {
        onDelete = function onDelete(close) {
          destroy(ctrl.editPack, close)
        }
        onSave = function onSave(close) {
          update(ctrl.editPack, close)
        }
      } else {
        ctrl.editPack = {}
        onSave = function onSave(close) {
          create(ctrl.editPack, close)
        }
      }
      loadPack(pack).then(function() {
        Alert.modal.open('GroupViewablePackEditModal', onSave, onDelete)
      })
    }

    function create(pack, callback) {
      Alert.spinner.open()
      GroupViewablePackService.store(ctrl.serviceProviderId, ctrl.groupId, pack)
        .then(loadViewablePacks)
        .then(function() {
          Alert.notify.success('Viewable Pack Created')
          callback()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function update(pack, callback) {
      Alert.spinner.open()
      GroupViewablePackService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
        pack
      )
        .then(loadViewablePacks)
        .then(function() {
          Alert.notify.success('Viewable Pack Updated')
          callback()
        })
        .catch(function(error) {
          console.log('error', error)
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function destroy(pack, callback) {
      Alert.confirm
        .open('Are you sure you want to remove this Viewable Pack?')
        .then(function() {
          Alert.spinner.open()
          GroupViewablePackService.destroy(
            ctrl.serviceProviderId,
            ctrl.groupId,
            pack
          )
            .then(loadViewablePacks)
            .then(function() {
              Alert.notify.success('Viewable Pack Removed')
              callback()
            })
            .catch(function(error) {
              Alert.notify.danger(error)
            })
            .finally(function() {
              Alert.spinner.close()
            })
        })
    }

    function addAllServices() {
      ctrl.editPack.services = angular.copy(ctrl.services)
      ctrl.editServices = []
    }

    function addService(service) {
      ctrl.editPack.services.push(service)
      _.remove(ctrl.editServices, { id: service.id })
    }

    function removeService(service) {
      _.remove(ctrl.editPack.services, { id: service.id })
      ctrl.editServices.push(service)
    }
  }
})()
