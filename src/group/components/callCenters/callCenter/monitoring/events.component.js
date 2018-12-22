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

    let socket

    function onInit() {
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

    function handleSubscription(subscription) {
      console.log('Subscription', subscription)
    }

    function handleEvent(event) {
      console.log('Event', event)
    }

    function handleError(error) {
      console.log('Error', error)
    }

    function onDestroy() {
      socket.close()
    }
  }
})()
