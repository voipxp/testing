import angular from 'angular'
import _ from 'lodash'
import template from './index.html'
import { updateUserServices } from '@/store/user-services'

angular.module('odin.group').component('groupFlexibleSeatingHosts', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Alert',
  'GroupFlexibleSeatingHostService',
  'UserFlexibleSeatingGuestService',
  'GroupFlexibleSeatingHostGuestAssociationService',
  'Route',
  '$scope',
  '$q',
  'GroupPolicyService',
  '$ngRedux',
  'ACL',
  'Session',
  'Module'
]
function controller(
  Alert,
  GroupFlexibleSeatingHostService,
  UserFlexibleSeatingGuestService,
  GroupFlexibleSeatingHostGuestAssociationService,
  Route,
  $scope,
  $q,
  GroupPolicyService,
  $ngRedux,
  ACL,
  Session,
  Module
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open
  ctrl.add = add
  ctrl.onCreate = onCreate
  ctrl.onUpdate = onUpdate
  ctrl.toggle = toggle
  ctrl.onClick = onClick
  // ctrl.onSelect = onSelect
  ctrl.createDevice = createDevice
  ctrl.selectDevice = selectDevice
  ctrl.updateDevice = updateDevice
  ctrl.onDeviceUpdate = onDeviceUpdate
  ctrl.onDeviceSelect = onDeviceSelect
  ctrl.onSetLinePort = onSetLinePort
  ctrl.onCheckIsActive = onCheckIsActive
  ctrl.onCheckIsAssigned = onCheckIsAssigned
  ctrl.onChangeHost = onChangeHost
  ctrl.isGroupDepartmentAdmin = ACL.is('Group Department')

  ctrl.columns = [
    {
      key: 'data.hostUserId',
      label: 'Host User ID'
    },
    {
      key: 'user.userId',
      label: 'User ID'
    },
    {
      key: 'user.lastName',
      label: 'Last Name'
    },
    {
      key: 'user.phoneNumber',
      label: 'Phone Number'
    },
    {
      key: 'data.accessDeviceEndpoint.accessDevice.deviceName',
      label: 'Access Device'
    },
    // {
    //   key: 'data.accessDeviceEndpoint.linePort',
    //   label: 'Line Port'
    // },
    {
      key: 'service.assigned',
      label: 'Assigned',
      type: 'boolean',
      align: 'centered'
    },
    {
      key: 'data.isActive',
      label: 'Active',
      type: 'boolean',
      align: 'centered'
    }
  ]

  function onInit() {
    ctrl.loading = true
    return $q
      .all([
        loadGroupFlexibleSeatingHosts(),
        loadGroupFlexibleSeatingUsers(),
        GroupPolicyService.load(),
		loadModule()
      ])
      .then(function() {
        ctrl.canCreate = GroupPolicyService.enhancedServiceCreate()
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

	function loadModule() {
		if(ACL.is('Group Department') || ACL.is('Group')) {
			return Module.show('Flexible Seating Guest').then(function(data) {
			  ctrl.module = data
			})
		}
	}

  function onChangeHost(item) {
    if (!item) return
    GroupFlexibleSeatingHostGuestAssociationService.show(item).then(function(
      host
    ) {
      ctrl.editSettings.data.hostAssociationLimitHours =
        host.associationLimitHours
      ctrl.editSettings.data.associationLimitHours = host.associationLimitHours
      ctrl.editSettings.data.hostUserId = item
    })
  }

  function onCheckIsActive() {
    if (ctrl.editSettings.data.isActive === true) {
      ctrl.editSettings.service.assigned = true
    }
  }

  function onCheckIsAssigned() {
    if (ctrl.editSettings.service.assigned === true) return
    ctrl.editSettings.data.isActive = false
    delete ctrl.editSettings.data
    ctrl.editSettings.data = {}
  }

  function loadGroupFlexibleSeatingUsers() {
    return GroupFlexibleSeatingHostService.bulk(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      if(ACL.is('Group Department')) data = filterByDepartment(data)
      ctrl.users = data
    })
  }

  function filterByDepartment(filterData) {
    return filterData.filter(function(data) {
			return (data.user.departmentFullPath || data.user.department) === Session.data('groupDepartmentPathName')
	  })
  }

  function loadGroupFlexibleSeatingHosts() {
    return GroupFlexibleSeatingHostService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      if(ACL.is('Group Department')) data.hosts = ACL.filterByDepartment(data.hosts)
      ctrl.hosts = data.hosts
    })
  }

  function open(flexibleSeatingHost) {
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'flexibleSeatingHosts',
      'flexibleSeatingHost'
    ).search({ serviceUserId: flexibleSeatingHost.serviceUserId })
  }
    

  function toggle(service) {
    service.isLoading = true
    GroupFlexibleSeatingHostService.status(service)
      .then(loadGroupFlexibleSeatingHosts)
      .then(function() {
        if (service.isActive) {
          Alert.notify.success('Service Enabled')
        } else {
          Alert.notify.warning('Service Disabled')
        }
      })
      .catch(function(error) {
        service.isActive = !service.isActive
        Alert.notify.danger(error)
      })
  }

  function add() {
    $scope.$broadcast('flexibleSeatingHostCreate:load')
  }

  function onCreate(event) {
    open(event.flexibleSeatingHost)
  }
  function onUpdate(event) {
    open(event.flexibleSeatingHost)
  }

  function updateUserService() {
    const singleService = {
      userId: ctrl.editSettings.userId,
      userServices: [ctrl.editSettings.service]
    }
    return $ngRedux.dispatch(updateUserServices(singleService))
  }

  function updateUserFlexibleSeatingGuest() {
    if (!ctrl.editSettings.data.userId)
      ctrl.editSettings.data.userId = ctrl.editSettings.userId
    return UserFlexibleSeatingGuestService.update(ctrl.editSettings.data)
  }

  function update(callback) {
    Alert.spinner.open()
    if (ctrl.editSettings.service.assigned === false) {
      updateUserService()
        .then(loadGroupFlexibleSeatingUsers)
        .then(function() {
          Alert.notify.success('User Settings Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    } else {
      updateUserService()
        .then(updateUserFlexibleSeatingGuest)
        .then(loadGroupFlexibleSeatingUsers)
        .then(function() {
          Alert.notify.success('User Settings Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }

  function onClick(event) {
    ctrl.editSettings = angular.copy(event.data)
    ctrl.editService = angular.copy(event.service)
    ctrl.editSettings = angular.copy(event)
    ctrl.editSettings.userId = event.user.userId
    ctrl.editTitle = event.user.userId
    Alert.modal.open('editUserFlexibleSeatingGuest', function(close) {
      update(close)
    })
  }

  // function onSelect(event) {
  //   var users = _.map(event, 'user')
  //   ctrl.editSettings = {}
  //   ctrl.editTitle = users.length + ' Users'
  //   // Alert.modal.open('editUserFlexibleSeatingGuest', function(close) {
  //     // bulk({ data: ctrl.editSettings, users: users }, close)
  //   // })
  // }
  function createDevice() {
    $scope.$broadcast('deviceCreate:load')
  }

  function selectDevice() {
    $scope.$broadcast('deviceSelect:load')
  }

  function updateDevice() {
    $scope.$broadcast('deviceUpdate:load', {
      deviceName:
        ctrl.editSettings.data.accessDeviceEndpoint.accessDevice.deviceName,
      deviceLevel:
        ctrl.editSettings.data.accessDeviceEndpoint.accessDevice.deviceLevel
    })
  }

  function onDeviceUpdate(event) {
    _.set(
      ctrl.editSettings.data,
      'accessDeviceEndpoint.accessDevice',
      event.device
    )
  }

  function onDeviceSelect(event) {
    _.set(
      ctrl.editSettings.data,
      'accessDeviceEndpoint.accessDevice',
      event.device
    )
  }

  function onSetLinePort(event) {
    _.set(ctrl.editSettings.data, 'accessDeviceEndpoint.linePort', event.userId)
  }
}
