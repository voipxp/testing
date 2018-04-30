/*
Devices
  - Business Communicator - PC
    + Client License 18
  - Business Communicator - Mobile
    + Client License 17
  - Business Communicator - Tablet
    + BroadTouch Business Communicator Tablet - Video

Services
  - Shared Call Appearance 5
  - Multiple Call Arrangement
  - Integrated IMP
  - Client License 17
  - Client License 18
  - BroadTouch Business Communicator Tablet - Video
  */
;(function() {
  angular.module('odin.bulk').factory('UcOneService', UcOneService)

  function UcOneService(SystemDeviceTypeService) {
    var service = {
      devices: devices,
      services: services
    }
    var deviceTypes = [
      'Business Communicator - PC',
      'Business Communicator - Mobile',
      'Business Communicator - Tablet'
    ]
    var deviceServiceMap = {
      'Business Communicator - PC': ['Client License 18'],
      'Business Communicator - Mobile': ['Client License 17'],
      'Business Communicator - Tablet': [
        'BroadTouch Business Communicator Tablet - Video'
      ]
    }

    return service

    // list all the ucone devices
    function devices() {
      return SystemDeviceTypeService.index().then(function(data) {
        return _.filter(data, function(device) {
          return _.includes(deviceTypes, device.deviceType)
        })
      })
    }

    // list all the services required for the endpoints
    // selected
    function services(endpoints) {
      console.log('endpoints', endpoints)
      var required = requiredServices()
      required.push(scaServices(endpoints))
      endpoints.forEach(function(endpoint) {
        var deviceType = _.get(endpoint, 'accessDevice.deviceType')
        if (deviceType) {
          var service = deviceServiceMap[deviceType]
          if (service) {
            required.push(deviceServiceMap[deviceType])
          }
        }
      })
      return _.uniq(_.flatten(required))
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
})()
