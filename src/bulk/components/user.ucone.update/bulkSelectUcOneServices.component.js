;(function() {
  angular.module('odin.bulk').component('bulkSelectUcOneServices', {
    templateUrl:
      'bulk/components/user.ucone.update/bulkSelectUcOneServices.component.html',
    controller: Controller,
    bindings: {
      endpoints: '<',
      services: '<',
      serviceProviderId: '<',
      groupId: '<',
      userCount: '<',
      onUpdate: '&'
    }
  })

  function Controller(
    EventEmitter,
    Alert,
    UcOneService,
    ServicePackService,
    $scope,
    $q
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.canComplete = canComplete
    ctrl.next = next
    ctrl.select = select
    ctrl.onSelect = onSelect
    ctrl.clear = clear

    ctrl.serviceTypes = {
      userServices: 'User Services',
      servicePackServices: 'Service Packs'
    }

    var aliasMap = {
      'Client License 17': 'BroadTouch Business Communicator Mobile - Video',
      'Client License 18': 'BroadTouch Business Communicator Desktop - Video'
    }

    function onInit() {
      ctrl.loading = true
      ctrl.endpoint = ctrl.endpoints || []
      ctrl.services = ctrl.services || {}
      ctrl.services.userServices = ctrl.services.userServices || []
      ctrl.services.servicePackServices =
        ctrl.services.servicePackServices || []
      loadRequiredServices()
      analyzeServices()
    }

    function select(type, action) {
      var data = {
        serviceProviderId: ctrl.serviceProviderId,
        groupId: ctrl.groupId,
        count: ctrl.userCount,
        services: ctrl.services[type],
        type: type,
        action: action.toLowerCase()
      }
      if (type === 'userServices') {
        data.filter = 'UC-One'
      }
      $scope.$broadcast('bulkSelectServices:load', data)
    }

    function clear(type) {
      ctrl.services[type] = []
      analyzeServices()
    }

    function onSelect(event) {
      ctrl.services[event.type] = event.services
      analyzeServices()
    }

    // set selected to false on initial load
    // analyze service will take care of updating it
    function loadRequiredServices() {
      var services = UcOneService.services(ctrl.endpoints)
      ctrl.requiredServices = services.map(function(service) {
        return {
          serviceName: service,
          alias: aliasMap[service] || service,
          selected: false
        }
      })
      console.log('required', ctrl.requiredServices)
    }

    // build a list of all user services
    // from both userServices and servicePackServices
    //
    // iterate through and update requiredServices
    function analyzeServices() {
      var spinner
      if (ctrl.services.servicePackServices.length > 0) {
        spinner = Alert.spinner.open('Analyzing Service Packs')
      }
      return $q
        .all(ctrl.services.servicePackServices.map(loadServicePack))
        .then(function(data) {
          var userServices = _.map(ctrl.services.userServices, 'serviceName')
          return _.uniq(_.flatten(_.concat(userServices, data)))
        })
        .then(function(services) {
          ctrl.requiredServices.forEach(function(required) {
            required.selected = hasService(required.serviceName, services)
          })
          return services
        })
        .finally(function() {
          if (spinner) Alert.spinner.close()
        })
    }

    // If Shared Call Appearance is required, then do a
    // regex match to include multiple license versions
    //
    // Otherwise look for a name match
    function hasService(serviceName, services) {
      return _.find(services, function(service) {
        if (serviceName === 'Shared Call Appearance') {
          return /^Shared Call Appearance/.exec(service)
        } else if (serviceName === 'Shared Call Appearance 5') {
          return /^Shared Call Appearance \d/.exec(service)
        } else {
          return serviceName === service
        }
      })
    }

    // just return the userServices inside the servicePack
    function loadServicePack(service) {
      return ServicePackService.show(
        ctrl.serviceProviderId,
        service.serviceName
      ).then(function(data) {
        return _.map(data.userServices || [], 'serviceName')
      })
    }

    function canComplete() {
      return _.every(ctrl.requiredServices, 'selected')
    }

    function next() {
      ctrl.onUpdate(
        EventEmitter({
          userServices: ctrl.services.userServices,
          servicePackServices: ctrl.services.servicePackServices
        })
      )
    }
  }
})()
