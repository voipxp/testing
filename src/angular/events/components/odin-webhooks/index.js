import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.events').component('odinWebhooks', {
  template,
  controller
})

controller.$inject = ['WebhookService', 'EventService', 'Alert']
function controller(WebhookService, EventService, Alert) {
  var ctrl = this
  ctrl.onClick = onClick
  ctrl.refresh = onInit
  ctrl.$onInit = onInit
  ctrl.recent = 50

  ctrl.columns = [
    {
      key: 'id',
      label: 'ID'
    },
    {
      key: 'eventId',
      label: 'Event ID'
    },
    {
      key: 'type',
      label: 'Event Type'
    },
    {
      key: 'endpoint',
      label: 'Endpoint'
    },
    {
      key: 'status',
      label: 'Status'
    },
    {
      key: 'attempt',
      label: 'Attempt'
    },
    {
      key: 'createdAt',
      label: 'Run At',
      type: 'date'
    },
    {
      key: 'nextAt',
      label: 'Next Run',
      type: 'date'
    },
    {
      key: 'error',
      label: 'Error'
    }
  ]

  function onInit() {
    ctrl.loading = true
    WebhookService.index(ctrl.recent)
      .then(function(data) {
        ctrl.webhooks = data
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function onClick(webhook) {
    Alert.spinner.open()
    EventService.show(webhook.eventId)
      .then(function(event) {
        ctrl.selectedEvent = event
        ctrl.selectedWebhooks = _.filter(ctrl.webhooks, {
          eventId: webhook.eventId
        })
        Alert.modal.open('showOdinWebhook')
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
