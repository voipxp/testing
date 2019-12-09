import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.department').component('departmentUsers', {
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
  '$q'
]
function controller(
  Alert,
  UserService,
  $scope,
  $location,
  Route,
  ServiceProviderPolicyService,
  $q
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.add = add
  ctrl.bulk = bulk
  ctrl.onCreate = onCreate
  ctrl.edit = edit
  ctrl.onClick = onClick
  ctrl.onSelect = onSelect

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
    }
  ]

  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadUsers(), ServiceProviderPolicyService.load()])
      .then(function() {
        ctrl.canCreate = ServiceProviderPolicyService.userCreate()
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

  var usersData = [{"userId":"test-dept-user-1@parkbenchsolutions.com","lastName":"test-dept-user-1","firstName":"test-dept-user-1","department":"TestDepartment \\ pankaj department (grpPankaj)","phoneNumber":"","phoneNumberActivated":null,"emailAddress":null,"hiraganaLastName":"test-dept-user-1","hiraganaFirstName":"test-dept-user-1","inTrunkGroup":false,"extension":"","countryCode":null,"nationalPrefix":null,"serviceProviderId":"ent.odin.testxp","groupId":"grpPankaj","userIdShort":"test-dept-user-1@parkbenchsolutions.com","domain":"parkbenchsolutions.com"},{"userId":"testFrpAnshu@parkbenchsolutions.com","lastName":"testAnshu","firstName":"testAnshu","department":"TestDepartment","phoneNumber":"","phoneNumberActivated":null,"emailAddress":null,"hiraganaLastName":"testAnshu","hiraganaFirstName":"testAnshu","inTrunkGroup":false,"extension":"","countryCode":null,"nationalPrefix":null,"serviceProviderId":"ent.odin.testxp","groupId":"grpPankaj","userIdShort":"testFrpAnshu@parkbenchsolutions.com","domain":"parkbenchsolutions.com"},{"userId":"pankajUser@parkbenchsolutions.com","lastName":"pankaj","firstName":"user","department":null,"phoneNumber":"","phoneNumberActivated":null,"emailAddress":null,"hiraganaLastName":"pankaj","hiraganaFirstName":"user","inTrunkGroup":false,"extension":"","countryCode":null,"nationalPrefix":null,"serviceProviderId":"ent.odin.testxp","groupId":"grpPankaj","userIdShort":"pankajUser@parkbenchsolutions.com","domain":"parkbenchsolutions.com"}]
  
  function loadUsers(extended) {
	return ctrl.users = usersData;
    return UserService.index(
      ctrl.serviceProviderId,
      ctrl.groupId,
      extended
    ).then(function(data) {
      ctrl.users = users
    })
	
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

  function open(user) {
    Route.open('users', ctrl.serviceProviderId, ctrl.groupId, user.userId)
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
