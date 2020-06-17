import angular from 'angular'
import template from './index.html'

angular.module('odin.branding').component('brandingEmail', {
  template,
  controller,
  bindings: { hostnameId: '<' }
})

controller.$inject = ['Alert', 'BrandingEmailService']
function controller(Alert, BrandingEmailService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.template = {}
  ctrl.fields = {}
  ctrl.fields.textArea = [{ key: 'mailBodyText', label: 'Mail Body Text' }]
  ctrl.fields.text = [
    { key: 'mailDriver', label: 'Mail Driver' },
    { key: 'mailHost', label: 'Mail Host' },
    { key: 'mailPort', label: 'Mail Port' },
    // { key: 'mailPassword', label: 'Mail Password' },
    { key: 'mailEncryption', label: 'Mail Encryption' },
    { key: 'mailWebPortalUrl', label: 'Mail Port Url' },
    { key: 'mailTokenRevokeMinutes', label: 'Mail Token Revoke Minutes' },
    { key: 'mailSubject', label: 'Mail Subject' },
    { key: 'mailFromAddress', label: 'Mail From Address' },
    { key: 'mailFromName', label: 'Mail From Name' },
    { key: 'mailUsername', label: 'Mail Username' }
  ]
  ctrl.fields.password = [{ key: 'mailPassword', label: 'Mail Password' }]

  function onInit() {
    ctrl.loading = true
    loadTemplate()
      .catch(function(error) {
        return Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadTemplate() {
    return BrandingEmailService.show(ctrl.hostnameId).then(function(data) {
      ctrl.template = data
    })
  }

  function edit(type, field) {
    ctrl.editField = angular.copy(field)
    ctrl.editField.value = ctrl.template[field.key]
    ctrl.editField.type = type
    ctrl.editField.options = []
    if (type === 'select') {
      ctrl.editField.options = ctrl.template[field.options]
    }
    var id = 'editEmailTemplate-' + type
    Alert.modal.open(id, function(close) {
      update(ctrl.editField, close)
    })
  }

  // function validateMailHost(email) {
  //   const other = ctrl.emails.find(app => app.mailHost === email.mailHost)
  //   if (other && other.id !== email.id) {
  //     Alert.notify.warning('MailHost is already taken')
  //     return false
  //   }
  //   return true
  // }

  function update(field, callback) {
    console.log('field', field)
    // if (!validateMailHost(email)) return
    Alert.spinner.open()
    var update = { hostnameId: ctrl.hostnameId }
    update[field.key] = field.value
    console.log('update', update)
    BrandingEmailService.update(update)
      .then(loadTemplate)
      .then(BrandingEmailService.load)
      .then(function() {
        Alert.notify.success('Email Updated')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
}
