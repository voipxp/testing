;(function() {
  angular.module('odin.settings').component('odinSettingsCallbacks', {
    templateUrl: 'settings/components/callbacks/callbacks.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    CallbackTemplateService,
    CallbackSettingService,
    $q
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.add = add
    ctrl.selectTemplate = selectTemplate
    ctrl.hasTextField = hasTextField

    ctrl.templateColumns = [
      {
        key: 'name',
        label: 'Name'
      }
    ]

    ctrl.callbackColumns = [
      {
        key: 'template.name',
        label: 'Name'
      },
      {
        key: 'active',
        label: 'Active',
        type: 'boolean'
      }
    ]

    function onInit() {
      ctrl.loading = true
      loadData()
        .catch(Alert.notify.danger)
        .then(function() {
          ctrl.loading = false
        })
    }

    function loadData() {
      return $q
        .all([loadTemplates(), loadSettings()])
        .then(setAvailableTemplates)
    }

    function loadTemplates() {
      return CallbackTemplateService.index().then(function(data) {
        ctrl.templates = data
      })
    }

    function loadSettings() {
      return CallbackSettingService.index().then(function(data) {
        ctrl.callbacks = data
      })
    }

    function setAvailableTemplates() {
      ctrl.availableTemplates = _.filter(ctrl.templates, function(template) {
        return !_.find(ctrl.callbacks, { callback_template_id: template.id })
      })
    }

    function add() {
      setAvailableTemplates()
      Alert.modal.open('newCallback')
    }

    function selectTemplate(template) {
      Alert.modal.close('newCallback')
      ctrl.editCallback = {
        active: false,
        data: {},
        template: template,
        callback_template_id: template.id
      }
      Alert.modal.open('editCallback', function(close) {
        create(ctrl.editCallback, close)
      })
    }

    function edit(callback) {
      ctrl.editCallback = angular.copy(callback)
      Alert.modal.open(
        'editCallback',
        function(close) {
          update(ctrl.editCallback, close)
        },
        function(close) {
          Alert.confirm
            .open('Are you sure you want to remove this callback?')
            .then(function() {
              destroy(ctrl.editCallback, close)
            })
        }
      )
    }

    function hasTextField() {
      if (!ctrl.editCallback) return
      const props = ctrl.editCallback.template.schema.properties
      return Object.keys(props).find(prop => props[prop].type === 'string')
    }

    function create(callback, close) {
      Alert.spinner.open()
      CallbackSettingService.store(callback)
        .then(loadData)
        .then(function() {
          Alert.notify.success('Callback Created')
          close()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function update(callback, close) {
      Alert.spinner.open()
      CallbackSettingService.update(callback.id, callback)
        .then(loadData)
        .then(function() {
          Alert.notify.success('Callback Updated')
          close()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function destroy(callback, close) {
      Alert.spinner.open()
      CallbackSettingService.destroy(callback.id)
        .then(loadData)
        .then(function() {
          Alert.notify.danger('Callback Removed')
          close()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
