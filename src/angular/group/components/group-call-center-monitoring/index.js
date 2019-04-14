import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterMonitoring', {
  template,
  controller,
  bindings: { serviceUserId: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Alert',
  'Session',
  'SocketService',
  'GroupCallCenterAgentService'
]
function controller(
  Alert,
  Session,
  SocketService,
  GroupCallCenterAgentService
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$onDestroy = onDestroy
  ctrl.toMinutes = toMinutes

  let _socket
  let _agents = []
  const _subscriptions = {}
  const _agentStats = {}

  function fullUserId(userId) {
    if (/@/.test(userId)) return userId
    return `${userId}@${Session.data('systemDomain')}`
  }

  function onInit() {
    ctrl.loading = true
    ctrl.stats = {}
    ctrl.agents = []
    loadAgents()
      .then(() => {
        _socket = SocketService()
        _socket.on('connect', subscribe)
        _socket.on('event', onEvent)
        _socket.on('close', () => console.log('close'))
        _socket.on('error', error => console.log('error', error))
      })
      .catch(Alert.notify.danger)
      .finally(() => (ctrl.loading = false))
  }

  function loadAgents() {
    return GroupCallCenterAgentService.show(ctrl.serviceUserId).then(data => {
      _agents = data.agents
    })
  }

  function subscribe() {
    subscribeMonitoring()
    _agents.forEach(subscribeAgent)
  }

  // function getSubscriptions() {
  //   socket.emit('subscriptions', { token: Session.data('token') }, data => {
  //     console.log('subscriptions', data)
  //   })
  // }

  function subscribeMonitoring() {
    const data = {
      event: 'Call Center Monitoring',
      userId: fullUserId(ctrl.serviceUserId),
      token: Session.data('token')
    }
    _socket.emit('subscribe', data, (data = {}) => {
      if (data.error) {
        console.log('subscribeError', data.error)
      } else if (data.subscriptionId) {
        _subscriptions[data.subscriptionId] = data
      }
    })
  }

  function subscribeAgent(agent) {
    const data = {
      event: 'Call Center Agent',
      userId: fullUserId(agent.userId),
      token: Session.data('token')
    }
    _socket.emit('subscribe', data, (data = {}) => {
      if (data.error) {
        console.log('subscribeError', data.error)
      } else if (data.subscriptionId) {
        _subscriptions[data.subscriptionId] = data
      }
    })
  }

  function resubscribe(event) {
    const current = _subscriptions[event.subscriptionId]
    if (current) {
      _socket.emit('subscribe', current)
      delete _subscriptions[event.subscriptionId]
    }
  }

  function unsubscribe() {
    Object.keys(_subscriptions).forEach(subscriptionId => {
      _socket.emit('unsubscribe', {
        token: Session.data('token'),
        subscriptionId
      })
    })
  }

  function findAgent(userId, withoutDomain) {
    if (withoutDomain) userId = userId.split('@')[0]
    return _agents.find(agent => agent.userId === userId)
  }

  function onEvent(event = {}) {
    console.log('event', event)
    const { eventData } = event
    switch (eventData._type) {
      case 'xsi:CallCenterMonitoringEvent': {
        ctrl.stats = { ...eventData.monitoringStatus, date: new Date() }
        break
      }
      case 'xsi:SubscriptionTerminatedEvent':
        return resubscribe(event)
      case 'xsi:AgentStateEvent':
      case 'xsi:AgentSubscriptionEvent': {
        const userId = event.targetId
        const agent = findAgent(userId) || findAgent(userId, true)
        const current = _agentStats[userId] || { userId }
        const stateInfo = eventData.agentStateInfo || eventData.stateInfo
        _agentStats[userId] = {
          ...current,
          ...agent,
          ...stateInfo
        }
        ctrl.agents = Object.values(_agentStats)
        break
      }
      default:
        console.log('unknownEvent', event._type)
    }
  }

  function toMinutes(value) {
    return value && Math.round(value / 1000 / 60)
  }

  function onDestroy() {
    unsubscribe()
    _socket.close()
  }
}
