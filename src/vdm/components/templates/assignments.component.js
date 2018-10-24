;(function() {
  angular.module('odin.vdm').component('vdmTemplateAssignments', {
    templateUrl: 'vdm/components/templates/assignments.component.html',
    controller: Controller,
    bindings: { template: '<' }
  })

  function Controller(
    Alert,
    Route,
    VdmSystemTemplateService,
    VdmGroupTemplateService,
    $scope
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.add = add
    ctrl.selectServiceProvider = selectServiceProvider
    ctrl.onSelectServiceProvider = onSelectServiceProvider
    ctrl.selectGroup = selectGroup
    ctrl.onSelectGroup = onSelectGroup
    ctrl.open = open

    function onInit() {
      ctrl.loading = true
      loadAssignments()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadAssignments() {
      return VdmSystemTemplateService.assignments(ctrl.template.id).then(
        function(data) {
          ctrl.assignments = data
        }
      )
    }

    function add() {
      ctrl.assignment = {}
      Alert.modal.open('addVdmAssignmentModal', function(close) {
        create(ctrl.assignment, close)
      })
    }

    function selectServiceProvider() {
      $scope.$broadcast('selectServiceProvider:load')
    }

    function onSelectServiceProvider(event) {
      var before = ctrl.assignment.serviceProviderId
      ctrl.assignment.serviceProviderId = event.serviceProviderId
      if (before !== event.serviceProviderId) {
        ctrl.assignment.groupId = null
      }
    }

    function selectGroup() {
      if (!ctrl.assignment.serviceProviderId) {
        return Alert.notify.warning('Please select a Service Provider')
      }
      $scope.$broadcast('selectGroup:load')
    }

    function onSelectGroup(event) {
      ctrl.assignment.groupId = event.groupId
    }

    function create(assignment, callback) {
      Alert.spinner.open()
      VdmGroupTemplateService.store(
        assignment.serviceProviderId,
        assignment.groupId,
        ctrl.template
      )
        .then(loadAssignments)
        .then(function() {
          Alert.notify.success('Assignement Added')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function open(assignment) {
      Route.open(
        'groups',
        assignment.serviceProviderId,
        assignment.groupId,
        'vdm',
        'templates',
        assignment.deviceTypeId
      )
    }
  }
})()
