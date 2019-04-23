;(function() {
  angular.module('odin.group').component('groupMusicOnHoldIndex', {
    templateUrl:
      'group/components/musicOnHold/groupMusicOnHoldIndex.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    Alert,
    GroupMusicOnHoldService,
    GroupDepartmentService,
    Route,
    $routeParams
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.open = open
    ctrl.add = add
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId

    function onInit() {
      ctrl.moh = {}
      ctrl.loading = true
      loadMusicOnHold()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadMusicOnHold() {
      return GroupMusicOnHoldService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.moh = data
      })
    }

    function loadDepartments() {
      return GroupDepartmentService.index(
        ctrl.serviceProviderId,
        ctrl.groupId,
        true
      ).then(function(data) {
        return data
      })
    }

    function open(department) {
      var departmentId = GroupDepartmentService.toId(department) || 'group'
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'musicOnHold',
        departmentId
      )
    }

    function add() {
      Alert.spinner.open()
      loadDepartments()
        .then(function(departments) {
          ctrl.newMoh = {
            isActiveDuringCallHold: true,
            isActiveDuringCallPark: true,
            isActiveDuringBusyCampOn: true,
            useAlternateSourceForInternalCalls: false,
            source: {
              audioFilePreferredCodec: 'None',
              messageSourceSelection: 'System'
            }
          }
          // filter out ones that are already setup
          ctrl.departments = _.filter(departments, function(department) {
            return !_.find(ctrl.moh.departments, {
              fullPathName: department.fullPathName
            })
          })
          Alert.modal.open('groupMusicOnHoldCreate', function onSave(close) {
            create(ctrl.newMoh, close)
          })
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function create(moh, callback) {
      Alert.spinner.open()
      GroupMusicOnHoldService.store(ctrl.serviceProviderId, ctrl.groupId, moh)
        .then(loadMusicOnHold)
        .then(function() {
          Alert.notify.success('Department MOH Created')
          callback()
          open(moh.department)
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