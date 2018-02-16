;(function() {
  angular.module('odin.group').component('groupPagingGroupsList', {
    templateUrl: 'group/components/paging/list.component.html',
    controller: Controller,
    require: { parent: '^groupPagingGroups' }
  })

  function Controller(Alert, $q, GroupPagingGroupService) {
    var ctrl = this
    ctrl.$onInit = activate
    ctrl.add = add
    ctrl.toggle = toggle

    function activate() {
      ctrl.open = ctrl.parent.open
      Alert.spinner.open()
      return loadInstances()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function loadInstances() {
      return GroupPagingGroupService.index(
        ctrl.parent.serviceProviderId,
        ctrl.parent.groupId
      ).then(function(data) {
        ctrl.instances = data
        console.log('instances', data)
        return data
      })
    }

    function add() {
      ctrl.parent.state = 'add'
    }

    function toggle(service) {
      service.isLoading = true
      GroupPagingGroupService.status(service)
        .then(loadInstances)
        .then(function() {
          if (service.isActive) {
            Alert.notify.success('Service Enabled')
          } else {
            Alert.notify.warning('Service Disabled')
          }
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }
  }
})()
