import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.serviceProvider').component('servicePacksCreate', {
  template,
  controller,
  require: { parent: '^servicePacks' },
  bindings: { onUpdate: '&' }
})

controller.$inject = ['Alert', 'ServicePackService', '$scope', 'EventEmitter']
function controller(Alert, ServicePackService, $scope, EventEmitter) {
  var ctrl = this
  ctrl.maxAllowed = maxAllowed
  ctrl.maxAllowedDescription = maxAllowedDescription
  ctrl.minAllowed = minAllowed
  ctrl.selectServices = selectServices
  ctrl.add = add
  ctrl.remove = remove
  ctrl.addAll = addAll
  ctrl.removeAll = removeAll
  ctrl.create = create
  var unlimited = 999999

  function load() {
    ctrl.servicePack = {
      serviceProviderId: ctrl.parent.serviceProviderId,
      isAvailableForUse: false,
      servicePackQuantity: -1,
      allowedQuantity: -1,
      userServices: []
    }
    ctrl.filterAvailable = ''
    ctrl.filterSelected = ''
    ctrl.available = _.filter(ctrl.parent.services, { authorized: true })
    Alert.modal.open('createServicePack-Modal', function onSave(close) {
      create(ctrl.servicePack, close)
    })
  }

  function create(servicePack, callback) {
    Alert.spinner.open()
    ServicePackService.create(ctrl.parent.serviceProviderId, servicePack)
      .then(function() {
        Alert.notify.success('Service Pack Created')
        callback()
        sendUpdate(servicePack)
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function checkQuantity() {
    if (overMax()) {
      ctrl.servicePack.servicePackQuantity = maxAllowed()
      Alert.notify.danger('Limit was Adjusted to Match Available Services')
    }
  }

  function overMax() {
    var quantity = ctrl.servicePack.servicePackQuantity
    return (
      (quantity === -1 && maxAllowed() < unlimited) || quantity > maxAllowed()
    )
  }

  /**
   * If no services assigned, return unlimited
   * If all services are unlimited, return unlimited
   * Return the minimum available of all the selected services
   */
  function maxAllowed() {
    if (!ctrl.servicePack) return
    var selectedServices = ctrl.servicePack.userServices || []
    if (selectedServices.length < 1) return unlimited
    if (_.every(selectedServices, { quantity: -1 })) return unlimited

    return _.minBy(selectedServices, function(service) {
      return service.available === -1 ? unlimited : service.available
    }).available
  }

  function maxAllowedDescription() {
    return maxAllowed() === unlimited ? 'Unlimitied' : maxAllowed()
  }

  function minAllowed() {
    return maxAllowed() === unlimited ? -1 : 1
  }

  function add(service) {
    _.remove(ctrl.available, service)
    ctrl.editServicePack.userServices.push(service)
  }

  function addAll() {
    for (var i = 0; i < ctrl.available.length; i++) {
      ctrl.editServicePack.userServices.push(ctrl.available[i])
      ctrl.available.splice(i, 1)
      i--
    }
  }

  function remove(service) {
    _.remove(ctrl.editServicePack.userServices, service)
    ctrl.available.push(service)
  }

  function removeAll() {
    for (var i = 0; i < ctrl.editServicePack.userServices.length; i++) {
      ctrl.available.push(ctrl.editServicePack.userServices[i])
      ctrl.editServicePack.userServices.splice(i, 1)
      i--
    }
  }

  function setAvailable() {
    ctrl.available = _.filter(ctrl.parent.services, function(service) {
      if (!service.authorized) return
      var isSelected = _.find(ctrl.editServicePack.userServices, {
        serviceName: service.serviceName
      })
      if (!isSelected) return service
    })
  }

  function selectServices() {
    ctrl.editServicePack = angular.copy(ctrl.servicePack)
    setAvailable()
    Alert.modal.open('serviceProviderSelectServices', function onSave(close) {
      ctrl.servicePack.userServices = ctrl.editServicePack.userServices
      checkQuantity()
      close()
    })
  }

  function sendUpdate(servicePack) {
    ctrl.onUpdate(EventEmitter({ servicePack: servicePack }))
  }

  $scope.$on('servicePackCreate:load', load)
}
