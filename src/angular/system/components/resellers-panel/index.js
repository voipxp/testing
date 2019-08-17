import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.system').component('resellersPanel', {
  template,
  controller,
  bindings: { limitTo: '<' }
})

controller.$inject = ['Alert', 'ResellerService', '$scope', 'Route']
function controller(Alert, ResellerService, $scope, Route) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.add = add
  ctrl.onCreate = onCreate
  ctrl.onUpdate = onUpdate
  ctrl.open = open
  ctrl.onPagination = onPagination

  function onInit() {
    ctrl.loading = true
    loadResellers()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function onPagination(event) {
    ctrl.pager = event.pager
  }

  function loadResellers() {
    return ResellerService.index().then(function(data) {
      ctrl.resellers = data.map(function(item) {
        return { ...item, name: _.trim(item.resellerName) || item.resellerId }
      })
    })
  }

  function add() {
    $scope.$broadcast('resellerCreate:load')
    onInit()
  }

  function onCreate(event) {
    onInit()
  }
  function onUpdate(event) {
    onInit()
  }

  function open(event) {
    var reseller = event.item
    Route.open('resellers', reseller.resellerId)
  }
}
