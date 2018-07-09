;(function() {
  angular.module('odin.branding').component('brandingTemplate', {
    templateUrl: 'branding/components/template.component.html',
    controller: Controller,
    bindings: { hostnameId: '<' }
  })

  function Controller(BrandingTemplateService, Alert, Template) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.imageSrc = imageSrc
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
    ctrl.fields.number = [
      { key: 'sessionTimeout', label: 'Session Timeout (min)' }
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
        console.log('template', data)
      })
    }

    function imageSrc(value) {
      if (!value) return
      return 'data:image/png;base64,' + value
    }

    function edit(type, field) {
      ctrl.editField = angular.copy(field)
      ctrl.editField.value = ctrl.template[field.key]
      ctrl.editField.type = type
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
      var update = {}
      update[field.key] = field.value
      BrandingTemplateService.update(ctrl.hostnameId, update)
        .then(loadTemplate)
        .then(Template.load)
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
})()
