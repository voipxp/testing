import angular from 'angular'
import _ from 'lodash'

angular
  .module('odin.bulk')
  .factory('BulkCreateDeviceService', BulkCreateDeviceService)

function BulkCreateDeviceService() {
  var service = { generate: generate }
  return service

  // Make sure we have all the fields and set some
  // defaults
  function generate(device) {
    var protocol = _.get(device, 'protocolChoice.0', null)
    return {
      deviceType: _.get(device, 'deviceType', null),
      deviceName: _.get(device, 'deviceName', null),
      protocol: _.get(device, 'protocol', protocol),
      netAddress: _.get(device, 'netAddress', null),
      port: _.get(device, 'port', null),
      outboundProxyServerNetAddress: _.get(
        device,
        'outboundProxyServerNetAddress',
        null
      ),
      stunServerNetAddress: _.get(device, 'stunServerNetAddress', null),
      macAddress: _.get(device, 'macAddress', null),
      serialNumber: _.get(device, 'serialNumber', null),
      description: _.get(device, 'description', null),
      physicalLocation: _.get(device, 'physicalLocation', null),
      transportProtocol: _.get(device, 'transportProtocol', 'TCP'),
      useCustomUserNamePassword: _.get(
        device,
        'useCustomUserNamePassword',
        false
      ),
      accessDeviceCredentials: {
        userName: _.get(device, 'accessDeviceCredentials.userName', null),
        password: _.get(device, 'accessDeviceCredentials.password', null)
      }
    }
  }
}
