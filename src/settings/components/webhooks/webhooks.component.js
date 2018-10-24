;(function() {
  angular.module('odin.settings').component('odinSettingsWebhooks', {
    templateUrl: 'settings/components/webhooks/webhooks.component.html',
    controller: Controller
  })

  function Controller(Alert, HashService, SettingService, $q, EventService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.add = add
    ctrl.edit = edit

    var KEY = 'webhooks'

    function onInit() {
      ctrl.loading = true
      $q.all([loadSettings(), loadEvents()])
        .catch(function(error) {
          Alert.notify.danger(error.data)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadSettings() {
      return SettingService.show(KEY).then(function(data) {
        ctrl.endpoints = data.endpoints || []
      })
    }

    function loadEvents() {
      return EventService.types().then(function(data) {
        ctrl.events = data
      })
    }

    function add() {
      ctrl.editEndpoint = {
        enabled: true,
        url: null,
        unlimited: true,
        events: [],
        key: HashService.key()
      }
      ctrl.modalTitle = 'New Webhook Endpoint'
      Alert.modal.open('editWebhookEndpoint', function(close) {
        if (!ctrl.hasHeader) delete ctrl.editEndpoint.header
        create(ctrl.editEndpoint, close)
      })
    }

    function edit(endpoint) {
      ctrl.editEndpoint = angular.copy(endpoint)
      ctrl.modalTitle = 'Edit ' + endpoint.name + ' Endpoint'
      ctrl.hasHeader = !!_.get(ctrl.editEndpoint, 'header.name')
      Alert.modal.open(
        'editWebhookEndpoint',
        function(close) {
          if (!ctrl.hasHeader) delete ctrl.editEndpoint.header
          modify(endpoint, ctrl.editEndpoint, close)
        },
        function(close) {
          remove(endpoint, close)
        }
      )
    }

    function create(endpoint, callback) {
      var endpoints = angular.copy(ctrl.endpoints)
      endpoints.push(endpoint)
      update(endpoints, callback)
    }

    function modify(original, modified, callback) {
      var index = _.indexOf(ctrl.endpoints, original)
      var endpoints = angular.copy(ctrl.endpoints)
      endpoints.splice(index, 1, modified)
      update(endpoints, callback)
    }

    function remove(original, callback) {
      Alert.confirm
        .open('Are you sure you want to remove this endpoint?')
        .then(function() {
          var index = _.indexOf(ctrl.endpoints, original)
          var endpoints = angular.copy(ctrl.endpoints)
          endpoints.splice(index, 1)
          update(endpoints, callback)
        })
    }

    function validate(endpoints) {
      var names = _.map(endpoints, 'name')
      var urls = _.map(endpoints, 'url')
      var errors = []
      if (names.length !== _.uniq(names).length) errors.push('Name')
      if (urls.length !== _.uniq(urls).length) errors.push('Url')
      return errors
    }

    function update(endpoints, callback) {
      var errors = validate(endpoints)
      if (errors.length > 0) {
        Alert.notify.danger(errors.join(', ') + ' is already taken')
        return
      }
      Alert.spinner.open()
      SettingService.update(KEY, { endpoints: endpoints })
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Settings Updated')
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
