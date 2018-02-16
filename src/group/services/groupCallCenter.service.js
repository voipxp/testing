;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterService', GroupCallCenterService)

  function GroupCallCenterService($http, Route) {
    var url = Route.api('/services/groups/callcenters/instances')
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy,
      hasPermission: hasPermission,
      status: status
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
        'routingType',
        'forceDeliveryOfCalls',
        'forceDeliveryWaitTimeSeconds',
        'callDispositionCodes'
      ]
    }

    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, obj) {
      obj.serviceProviderId = serviceProviderId
      obj.groupId = groupId
      return $http.post(url(), obj).then(function(response) {
        return response.data
      })
    }

    function status(callcenter) {
      return $http
        .put(url(), { instances: [callcenter] })
        .then(function(response) {
          return response.data
        })
    }

    function show(serviceUserId) {
      return $http.get(url(serviceUserId)).then(function(response) {
        return response.data
      })
    }

    function update(serviceUserId, obj) {
      return $http.put(url(serviceUserId), obj).then(function(response) {
        return response.data
      })
    }

    function destroy(serviceUserId) {
      return $http.delete(url(serviceUserId)).then(function(response) {
        return response.data
      })
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
