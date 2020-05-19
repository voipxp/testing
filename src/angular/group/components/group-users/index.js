import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupUsers', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Alert',
  'UserService',
  '$scope',
  '$location',
  'Route',
  'ServiceProviderPolicyService',
  'GroupWebPolicyService',
  'ServiceProviderUsersService',
  '$q',
  'ACL'
]
function controller(
  Alert,
  UserService,
  $scope,
  $location,
  Route,
  ServiceProviderPolicyService,
  GroupWebPolicyService,
  ServiceProviderUsersService,
  $q,
  ACL
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.add = add
  ctrl.bulk = bulk
  ctrl.onCreate = onCreate
  ctrl.edit = edit
  ctrl.onClick = onClick
  ctrl.onSelect = onSelect
  ctrl.isGroupDepartmentAdmin = ACL.is('Group Department') || ACL.is('Group') || ACL.is('Service Provider') || ACL.is('System')
  ctrl.columns = [
    {
      key: 'userId',
      label: 'User ID'
    },
    {
      key: 'firstName',
      label: 'First Name'
    },
    {
      key: 'lastName',
      label: 'Last Name'
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number'
    },
    {
      key: 'extension',
      label: 'Extension'
    },
    {
      key: 'callingLineIdPhoneNumber',
      label: 'CLID',
      hidden: true
    },
    {
      key: 'department',
      label: 'Department'
    },
    {
      key: 'inTrunkGroup',
      label: 'In Trunk Group',
      type: 'boolean'
    }
  ]

  function onInit() {
    ctrl.loading = true
    return $q
      .all([
        loadUsers(),
        ServiceProviderPolicyService.load(),
        GroupWebPolicyService.load()
      ])
      .then(function() {
        ctrl.isAddGroup =  ctrl.groupId ? true : false
        ctrl.canCLIDUpdate = true
        ctrl.canPNUpdate = true
        ctrl.canCreate = true
        if (ACL.is('System')) {
          ctrl.canCLIDUpdate = true
          ctrl.canPNUpdate = true
        } else if (ACL.is('Provisioning')) {
          ctrl.canCLIDUpdate = true
          ctrl.canPNUpdate = true
        } else if (ACL.is('Reseller')) {
          ctrl.canCLIDUpdate = true
          ctrl.canPNUpdate = true
        } else if (ACL.is('Service Provider')) {
          ctrl.canCLIDUpdate = true
          ctrl.canPNUpdate = true
          ctrl.canCreate = ServiceProviderPolicyService.userCreate()
        } else if (ACL.is('Group Department')) {
          ctrl.canCreate = GroupWebPolicyService.departmentAdminUserAccessCreate()
          ctrl.canCLIDUpdate = GroupWebPolicyService.departmentAdminCallingLineIdNumberAccessCreate()
        } else {
          ctrl.canCreate = ServiceProviderPolicyService.userCreate()
          ctrl.canCLIDUpdate = true
        }
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
    // loadUsers()
    //   .catch(function(error) {
    //     Alert.notify.danger(error)
    //   })
    //   .finally(function() {
    //     ctrl.loading = false
    //   })
  }

    function loadUsers(extended) {
      if(ACL.has('Group') && ctrl.groupId !=='undefined') {
        return UserService.index(
          ctrl.serviceProviderId,
          ctrl.groupId,
          extended
        ).then(function(data) {
          if (ACL.is('System') || ACL.is('Group Department') || ACL.is('Service Provider') || ACL.is('Group') ) data = ACL.filterByDepartment(data)
          ctrl.users = data
        })
      }else {
        return ServiceProviderUsersService.index(
          ctrl.serviceProviderId,
          extended
        ).then(function(data) {
          if (ACL.is('System') || ACL.is('Group Department') || ACL.is('Service Provider') || ACL.is('Group') ) data = ACL.filterByDepartment(data)
          ctrl.users = data
        })
      }
  }

  function add() {
    $scope.$broadcast('userCreate:load')
  }

  function bulk() {
    var returnTo = $location.url()
    $location.path('/bulk/user.create').search({
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId,
      returnTo: returnTo
    })
  }


  function onClick(user) {
    var returnTo = $location.url()
    if(ACL.has('Group') && ctrl.groupId !=='undefined') {
      Route.open(
         'users',
         user.serviceProviderId,
         user.groupId,
         user.userId
       ).search({ returnTo: returnTo })
    }else{
      Route.open(
      'users',
      user.serviceProviderId,
      user.userId
    ).search({ returnTo: returnTo })
   }

  }

  function open(user) {
    if(ACL.has('Group') && ctrl.groupId !=='undefined') {
      Route.open(
        'users',
        user.serviceProviderId,
        user.groupId,
        user.userId
      )
    }else{
      Route.open(
        'users',
        user.serviceProviderId,
        user.userId
      )
    }
  //  Route.open('users', ctrl.serviceProviderId, ctrl.groupId, user.userId)
  }

  function onCreate(event) {
    open(event.user)
  }

  function onClick(event) {
    open(event)
  }

  function edit() {
    Alert.spinner.open()
    loadUsers(true)
      .then(function() {
        var column = _.find(ctrl.columns, { key: 'callingLineIdPhoneNumber' })
        column.hidden = false
        ctrl.showSelect = true
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function onSelect(users) {
    ctrl.editSettings = { callingLineIdPhoneNumber: null }
    ctrl.editCount = users.length
    Alert.modal.open('bulkEditUserCLID', function(close) {
      bulkUpdate(users, ctrl.editSettings, close)
    })
  }

  function bulkUpdate(users, data, callback) {
    if (!ctrl.canCLIDUpdate) {
      delete data.callingLineIdPhoneNumber
    }

    Alert.spinner.open()
    UserService.bulk({ users: users, data: data })
      .then(function() {
        return loadUsers(true)
      })
      .then(function() {
        Alert.notify.success('Users Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
