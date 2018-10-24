;(function() {
  angular.module('odin.group').component('groupPagingGroupDetails', {
    templateUrl: 'group/components/paging/details.component.html',
    controller: Controller,
    require: { parent: '^groupPagingGroup' }
  })

  function Controller(Alert, GroupPagingGroupService, $q) {
    var ctrl = this
    ctrl.edit = edit
    ctrl.remove = remove

    ctrl.setDeliveryCLID = setDeliveryCLID

    function activate() {
      return $q.when(true)
    }

    function setDeliveryCLID() {
      if (!ctrl.instance.deliverOriginatorCLIDInstead) {
        ctrl.instance.originatorCLIDPrefix = null
      }
    }

    function edit() {
      var onDelete
      if (ctrl.parent.module.permissions.delete) {
        onDelete = remove
      }
      activate().then(function() {
        ctrl.instance = angular.copy(ctrl.parent.instance)
        Alert.modal.open(
          'editGroupPagingGroupDetails',
          function onSave(close) {
            ctrl.parent.update(ctrl.instance, close)
          },
          onDelete
        )
      })
    }

    function remove(callback) {
      Alert.confirm
        .open('Are you sure you want to remove this Paging Group?')
        .then(function() {
          Alert.spinner.open()
          GroupPagingGroupService.destroy(ctrl.parent.serviceUserId)
            .then(function() {
              Alert.notify.success('Paging Group Removed')
              if (_.isFunction(callback)) {
                callback()
              }
              ctrl.parent.open()
            })
            .catch(function(error) {
              Alert.notify.danger(error)
            })
            .finally(function() {
              Alert.spinner.close()
            })
        })
    }
  }
})()
