;(function() {
  angular.module('odin.system').component('systemNetworkClassOfServices', {
    templateUrl:
      'system/components/networkClassOfService/services.component.html',
    controller: Controller
  })

  function Controller(
    $routeParams,
    Alert,
    SystemNetworkClassOfServiceService,
    SystemCommunicationBarringProfileService,
    Route,
    $q
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.add = add
    ctrl.open = open
    ctrl.setPrimary = setPrimary

    function onInit() {
      ctrl.loading = true
      loadServices()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadServices() {
      return SystemNetworkClassOfServiceService.index().then(function(data) {
        console.log('services', data)
        ctrl.services = data.services
      })
    }

    function add() {
      ctrl.editService = {}
      loadProfiles().then(function() {
        Alert.modal.open('systemNetworkClassOfServiceCreateModal', function(
          close
        ) {
          create(ctrl.editService, close)
        })
      })
    }

    function open(service) {
      Route.open('system', 'networkClassOfServices')(service.name)
    }

    function loadProfiles() {
      Alert.spinner.open()
      return SystemCommunicationBarringProfileService.index()
        .then(function(data) {
          console.log('profiles', data)
          ctrl.profiles = data
        })
        .catch(function(error) {
          Alert.notify.danger(error)
          $q.reject(error)
        })
        .finally(Alert.spinner.close)
    }

    function setPrimary(i) {
      for (var index = 0; index < 10; index++) {
        var key = ['communicationBarringProfile' + index, 'isPrimary']
        _.set(ctrl.editService, key, i === index)
      }
    }

    function hasProfiles(service) {
      var answer = false
      for (var index = 0; index < 10; index++) {
        var nameKey = ['communicationBarringProfile' + index, 'name']
        if (_.get(service, nameKey)) {
          answer = true
          break
        }
      }
      return answer
    }

    function hasPrimary(service) {
      var answer = false
      for (var index = 0; index < 10; index++) {
        var isPrimary = ['communicationBarringProfile' + index, 'isPrimary']
        if (_.get(service, isPrimary)) {
          answer = true
          break
        }
      }
      return answer
    }

    function create(service, callback) {
      if (hasProfiles(service) && !hasPrimary(service)) {
        Alert.notify.warning('Please select a primary profile')
        return
      }
      Alert.spinner.open()
      SystemNetworkClassOfServiceService.store(service)
        .then(function() {
          Alert.notify.success('Network Class of Service Updated')
          callback()
          open(service)
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
