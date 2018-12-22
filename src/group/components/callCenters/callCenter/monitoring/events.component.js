;(function() {
  angular.module('odin.group').component('groupCallCenterMonitoringEvents', {
    templateUrl:
      'group/components/callCenters/callCenter/monitoring/events.component.html',
    controller: Controller,
    bindings: { serviceUserId: '<' }
  })

  function Controller(Alert, Session, WebSocketService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$onDestroy = onDestroy
    ctrl.toMinutes = toMinutes

    let socket

    function onInit() {
      ctrl.status = {}
      socket = WebSocketService()
      socket.open('ws://localhost:4000/ws').then(subscribe)
      socket.onError(onError)
      socket.onClose(onClose)
      socket.onMessage(onMessage)
    }

    function subscribe() {
      socket.send('subscribe', {
        event: 'Call Center Monitoring',
        userId: ctrl.serviceUserId,
        token: Session.data('token')
      })
    }

    function unsubscribe() {
      socket.send('unsubscribe', { token: Session.data('token') })
    }

    function onError(error) {
      console.log('Error', error)
    }

    function onClose() {
      console.log('Close')
    }

    function onMessage({ type, payload }) {
      switch (type) {
        case 'subscription':
          return handleSubscription(payload)
        case 'event':
          return handleEvent(payload)
        case 'error':
          return handleError(payload)
        default:
          console.log('onMessage notFound', payload)
      }
    }

    function handleEvent(event) {
      console.log('Event', event)
      const { eventData } = event
      if (!eventData) return

      switch (eventData._type) {
        case 'xsi:CallCenterMonitoringEvent': {
          ctrl.stats = { ...eventData.monitoringStatus, date: new Date() }
          break
        }
        case 'xsi:SubscriptionTerminatedEvent':
          // automatically re-subscribe
          return subscribe()
        default:
      }
    }

    function handleSubscription(subscription) {
      console.log('Subscription', subscription)
    }

    function handleError(error) {
      console.log('Error', error)
    }

    function toMinutes(value) {
      return Math.round(value / 1000 / 60)
    }

    function onDestroy() {
      unsubscribe()
      socket.close()
    }
  }
})()
