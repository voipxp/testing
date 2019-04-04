/*
Services
  - Shared Call Appearance 5
  - Multiple Call Arrangement
  - Integrated IMP
  - Client License 17
  - Client License 18
  - BroadTouch Business Communicator Tablet - Video
*/

import angular from 'angular'
import _ from 'lodash'

angular.module('odin.bulk').factory('UcOneService', UcOneService)

UcOneService.$inject = ['SystemDeviceTypeService']
function UcOneService(SystemDeviceTypeService) {
  var service = {
    devices: devices,
    services: services
  }
  return service

  // list all the ucone devices
  function devices() {
    return SystemDeviceTypeService.index().then(function(data) {
      return _.filter(data, function(device) {
        return _.includes(device.tags, 'UC-One')
      })
    })
  }

  // list all the services required for the endpoints
  // selected
  function services(endpoints) {
    var required = requiredServices()
    required.push(scaServices(endpoints))
    endpoints.forEach(function(endpoint) {
      required.push(_.get(endpoint, 'accessDevice.relatedServices'))
    })
    return _.compact(_.uniq(_.flatten(required)))
  }

  function scaServices(endpoints) {
    if (endpoints.length > 1) {
      return 'Shared Call Appearance 5'
    } else {
      return 'Shared Call Appearance'
    }
  }

  function requiredServices() {
    return ['Multiple Call Arrangement', 'Integrated IMP']
  }
}
