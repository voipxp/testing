/*
TODO:
  group events by event_id

  add filter options by status

  click on webhook, shows modal with all the related webhooks as well as the event
  maybe go to new page if needed
*/
;(function() {
  angular.module('odin.events').component('odinWebhooks', {
    templateUrl: 'events/webhooks.component.html',
    controller: Controller
  })

  function Controller(WebhookService, Alert) {
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
      console.log('starting')
      ctrl.loading = true
      WebhookService.index(ctrl.recent)
        .then(function(data) {
          console.log('data', data)
          ctrl.webhooks = data
        })
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function onClick(webhook) {
      console.log('onClick', webhook)
      ctrl.webhook = webhook
      Alert.modal.open('showOdinWebhook')
    }
  }
})()
