;(function() {
  angular.module('odin.group').factory('GroupCallCenterService', Service)

  function Service($http, Route) {
    var url = Route.api2('/groups/call-centers')
    var service = {
      index,
      store,
      show,
      update,
      destroy,
      hasPermission,
      status
    }

    service.options = {
      type: ['Basic', 'Standard', 'Premium'],
      routingType: ['Priority Based', 'Skill Based'],
      policy: ['Circular', 'Regular', 'Simultaneous', 'Uniform', 'Weighted'],
      agentStateAfterCall: ['Available', 'Unavailable', 'Wrap-Up'],
      audioFileCodec: ['None', 'G711', 'G722', 'G729', 'G726', 'AMR', 'AMR-WB'],
      queueLength: { min: 0, max: 525 },
      escapeDigit: { minLength: 1, maxLength: 1 },
      wrapUpSeconds: { min: 1, max: 3600 },
      forceDeliveryWaitTimeSeconds: { min: 1, max: 10 },
      agentUnavailableCode: { minLength: 1, maxLength: 10 },
      networkClassOfService: { minLength: 1, maxLength: 40 },
      skillLevel: { minimum: 1, maximum: 20 }
    }

    var permissions = {
      standard: [
        'enableReporting',
        'allowCallsToAgentsInWrapUp',
        'overrideAgentWrapUpTime',
        'wrapUpSeconds',
        'enableAutomaticStateChangeForAgents',
        'agentStateAfterCall'
      ],
      premium: [
        'forceDeliveryOfCalls',
        'forceDeliveryWaitTimeSeconds',
        'callDispositionCodes',
        'routingType'
      ]
    }

    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }

    function store(serviceProviderId, groupId, obj) {
      obj = { ...obj, serviceProviderId, groupId }
      return $http.post(url(), obj).then(res => res.data)
    }

    function status(callcenter) {
      return $http
        .put(url('status'), { instances: [callcenter] })
        .then(res => res.data)
    }

    function show(serviceUserId) {
      return $http
        .get(url(), { params: { serviceUserId } })
        .then(res => res.data)
    }

    function update(serviceUserId, obj) {
      return $http.put(url(), obj).then(res => res.data)
    }

    function destroy(serviceUserId) {
      return $http
        .delete(url(), { params: { serviceUserId } })
        .then(res => res.data)
    }

    function hasPermission(service, attribute) {
      if (!service) return false
      if (_.includes(permissions.premium, attribute)) {
        return service.type === 'Premium'
      }
      if (_.includes(permissions.standard, attribute)) {
        return service.type === 'Premium' || service.type === 'Standard'
      }
      return true
    }
  }
})()
