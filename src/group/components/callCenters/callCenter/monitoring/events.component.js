;(function() {
  angular.module('odin.group').component('groupCallCenterMonitoringEvents', {
    templateUrl:
      'group/components/callCenters/callCenter/monitoring/events.component.html',
    controller: Controller,
    bindings: { serviceUserId: '<' }
  })

  function Controller(Alert, Session, SocketService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$onDestroy = onDestroy
    ctrl.toMinutes = toMinutes
    ctrl.stats = {}

    let socket

    function onInit() {
      socket = SocketService('http://localhost:4000')
      socket.on('connect', subscribe)
      socket.on('event', onEvent)
      socket.on('close', () => console.log('close'))
      socket.on('error', err => console.log('error', err))
    }

    function subscribe() {
      socket.emit(
        'subscribe',
        {
          event: 'Call Center Monitoring',
          userId: ctrl.serviceUserId,
          token: Session.data('token')
        },
        data => console.log('Subscribed', data)
      )
    }

    function unsubscribe() {
      socket.emit('unsubscribe', { token: Session.data('token') })
    }

    function onEvent(event = {}) {
      console.log('Event', event)
      switch (event._type) {
        case 'xsi:CallCenterMonitoringEvent': {
          ctrl.stats = { ...event.monitoringStatus, date: new Date() }
          break
        }
        case 'xsi:SubscriptionTerminatedEvent':
          return subscribe()
        default:
          console.log('UnknownEvent', event)
      }
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
