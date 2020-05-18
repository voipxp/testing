import angular from 'angular'
import template from './index.html'

angular.module('odin.branding').component('brandingTemplate', {
  template,
  controller,
  bindings: { hostnameId: '<' }
})

controller.$inject = ['BrandingTemplateService', 'Alert', 'UiTemplateService']
function controller(BrandingTemplateService, Alert, UiTemplateService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.imageSource = imageSource
  ctrl.onUpload = onUpload
  ctrl.template = {}
  ctrl.fields = {}
  ctrl.fields.color = [{ key: 'styleMenuColor', label: 'Menu Color' }]
  ctrl.fields.textArea = [{ key: 'styleCustomCss', label: 'Custom CSS' }]
  ctrl.fields.text = [
    { key: 'pageTitle', label: 'Page Title' },
    { key: 'pageCopyright', label: 'Copyright' },
    { key: 'pageFooterTitle', label: 'Footer Text' },
    { key: 'pageGoogleUA', label: 'Google UA' },
    { key: 'pageLoginMessage', label: 'Login Message' }
  ]
  ctrl.fields.images = [
    { key: 'imageLoginLogo', label: 'Login Logo' },
    { key: 'imageIcon', label: 'Icon Image' }
  ]
  ctrl.fields.select = [
    { key: 'userLandingPage', label: 'User Landing Page', options: 'userLandingPageOptions'},
    /*
    * Add these back when these settings are needed
    */
    // { key: 'groupDepartmentLandingPage', label: 'Group Department Landing Page', options: 'groupDepartmentLandingPageOptions'},
    // { key: 'gropuLandingPage', label: 'Group Landing Page', options: 'gropuLandingPageOptions'},
    // { key: 'serviceProviderLandingPage', label: 'Service Provider Landing Page', options: 'serviceProviderLandingPageOptions'},
    // { key: 'resellerLandingPage', label: 'Reseller Landing Page', options: 'resellerLandingPageOptions'},
    // { key: 'provisioningLandingPage', label: 'Provisioning Landing Page', options: 'provisioningLandingPageOptions'},
    // { key: 'systemLandingPage', label: 'System Landing Page', options: 'systmeLandingPageOptions'}
  ]

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
    return BrandingTemplateService.show(ctrl.hostnameId).then(function(data) {
      ctrl.template = data
    })
  }

  function imageSource(value) {
    if (!value) return
    return 'data:image/png;base64,' + value
  }

  function edit(type, field) {
    ctrl.editField = angular.copy(field)
    ctrl.editField.value = ctrl.template[field.key]
    ctrl.editField.type = type
    ctrl.editField.options = []
    if (type == 'select') {
      ctrl.editField.options = ctrl.template[field.options]
    }
    var id = 'editBrandingTemplate-' + type
    Alert.modal.open(id, function(close) {
      update(ctrl.editField, close)
    })
  }

  function onUpload(file) {
    ctrl.editField.name = file.name
    ctrl.editField.value = file.content
  }

  function update(field, callback) {
    Alert.spinner.open()
    var update = { hostnameId: ctrl.hostnameId }
    update[field.key] = field.value
    BrandingTemplateService.update(update)
      .then(loadTemplate)
      .then(UiTemplateService.load)
      .then(function() {
        Alert.notify.success('Template Updated')
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
