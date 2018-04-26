;(function() {
  angular.module('odin.UI').component('pbsDataTableDoc', {
    templateUrl: 'UI/pbsDataTable/index.component.html',
    controller: Controller
  })

  function Controller() {
    var ctrl = this

    ctrl.onSelect = function(event) {
      ctrl.selected = event
    }

    ctrl.onClick = function(event) {
      ctrl.clicked = event
    }

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
        key: 'createdAt',
        label: 'Created',
        type: 'date'
      },
      {
        key: 'isActive',
        label: 'Active',
        type: 'boolean',
        align: 'centered'
      }
    ]
    ctrl.items = [
      {
        userId: 'dusty',
        firstName: 'dusty',
        lastName: 'doris',
        phoneNumber: '5133334444',
        createdAt: '2018-04-25T21:55:26.291Z',
        isActive: true
      },
      {
        userId: 'marc',
        firstName: 'marc',
        lastName: 'tribbe',
        isActive: false
      }
    ]
  }
})()
