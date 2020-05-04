import angular from 'angular'
import template from './index.html'

angular.module('odin.branding').component('brandingEmail', {
  template,
  controller,
  bindings: { hostnameId: '<' }
})

controller.$inject = [
  'BrandingEmailService',
  'Alert',
  'UiEmailService',
  '$q'
]
function controller(BrandingEmailService, Alert, UiEmailService, $q) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit

  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadEmail()
        // , loadPartners()
      ])
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadEmail() {
    return BrandingEmailService.index(ctrl.hostnameId).then(function(
      data
    ) {
      ctrl.emails = data
    })
  }

  // function loadPartners() {
  //   return SettingService.show('partners').then(function(data) {
  //     ctrl.partners = data || []
  //   })
  // }

  function edit(email) {
    var removeAction
    if (email) {
      ctrl.modalAction = 'Edit'
      ctrl.editEmail = angular.copy(email)
      removeAction = function onDelete(close) {
        remove(ctrl.editEmail, close)
      }
    } else {
      ctrl.modalAction = 'New'
      ctrl.editEmail = { hostnameId: ctrl.hostnameId, window: 0 }
    }
    Alert.modal.open(
      'editBrandingEmail',
      function(close) {
        update(ctrl.editEmail, close)
      },
      removeAction
    )
  }

  function validateMailHost(email) {
    const other = ctrl.emails.find(app => app.mailHost === email.mailHost)
    if (other && other.id !== email.id) {
      Alert.notify.warning('MailHost is already taken')
      return false
    }
    return true
  }

  function update(email, callback) {
    if (!validateMailHost(email)) return
    var method
    if (email.id) {
      method = BrandingEmailService.update
    } else {
      method = BrandingEmailService.store
    }
    Alert.spinner.open()
    method(email)
      .then(loadEmail)
      .then(UiEmailService.load)
      .then(function() {
        Alert.notify.success('Email Saved')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error.data)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function remove(email, callback) {
    Alert.confirm
      .open('Are you sure you want to remove this Email Setting?')
      .then(function() {
        Alert.spinner.open()
        BrandingEmailService.destroy(email.id)
          .then(loadEmail)
          .then(function() {
            Alert.notify.warning('Email Removed')
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
