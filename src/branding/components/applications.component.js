;(function() {
  angular.module('odin.branding').component('brandingApplications', {
    templateUrl: 'branding/components/applications.component.html',
    controller: Controller,
    bindings: { hostnameId: '<' }
  })

  function Controller($routeParams, BrandingApplicationService, Alert) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.partners = [
      {
        key: 'emu',
        name: 'BroadSource Group'
      }
    ]

    function onInit() {
      ctrl.loading = true
      return loadApplications()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadApplications() {
      return BrandingApplicationService.index(ctrl.hostnameId).then(function(
        data
      ) {
        ctrl.applications = data
        console.log('applications', data)
      })
    }

    function edit(application) {
      var removeAction
      if (application) {
        ctrl.modalAction = 'Edit'
        ctrl.editApplication = angular.copy(application)
        removeAction = function onDelete(close) {
          remove(ctrl.editApplication, close)
        }
      } else {
        ctrl.modalAction = 'New'
        ctrl.editApplication = { hostname_id: ctrl.hostnameId, window: 0 }
      }
      Alert.modal.open(
        'editBrandingApplication',
        function(close) {
          update(ctrl.editApplication, close)
        },
        removeAction
      )
    }

    function validateName(application) {
      var other = _.find(ctrl.applications, { name: application.name })
      if (other && other.id !== application.id) {
        Alert.notify.warning('Name is already taken')
        return false
      }
      return true
    }

    function update(application, callback) {
      if (!validateName(application)) return
      var method
      if (application.id) {
        method = BrandingApplicationService.update
      } else {
        method = BrandingApplicationService.store
      }
      Alert.spinner.open()
      method(ctrl.hostnameId, application)
        .then(loadApplications)
        .then(function() {
          Alert.notify.success('Application Saved')
          callback()
        })
        .catch(function(error) {
          Alert.notify.danger(error.data)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function remove(application, callback) {
      Alert.confirm
        .open('Are you sure you want to remove this Application?')
        .then(function() {
          Alert.spinner.open()
          BrandingApplicationService.destroy(ctrl.hostnameId, application)
            .then(loadApplications)
            .then(function() {
              Alert.notify.warning('Application Removed')
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
  }
})()
