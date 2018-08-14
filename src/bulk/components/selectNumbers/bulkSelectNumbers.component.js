;(function() {
  angular.module('odin.bulk').component('bulkSelectNumbers', {
    templateUrl:
      'bulk/components/selectNumbers/bulkSelectNumbers.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      userCount: '<',
      phoneNumbers: '<',
      extension: '<',
      activatePhoneNumber: '<',
      callingLineIdPhoneNumber: '<',
      onUpdate: '&'
    }
  })

  function Controller(Alert, GroupExtensionService, $scope, EventEmitter) {
    var ctrl = this
    ctrl.$onInit = onInit

    ctrl.clearNumbers = clearNumbers
    ctrl.selectNumbers = selectNumbers
    ctrl.createNumbers = createNumbers
    ctrl.onUpdateNumbers = onUpdateNumbers

    ctrl.canComplete = canComplete
    ctrl.complete = complete

    // helpers
    ctrl.templates = { callingLineIdPhoneNumber: '{{ phoneNumber }}' }

    function onInit() {
      console.log('selectNumbersLoaded')
      if (ctrl.phoneNumbers && ctrl.phoneNumbers.length >= ctrl.userCount) {
        ctrl.phoneNumberAction = 'select'
      } else {
        clearNumbers()
      }
      if (ctrl.activatePhoneNumber === undefined) {
        ctrl.activatePhoneNumber = true
      }
      ctrl.loading = true
      loadExtensions()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadExtensions() {
      return GroupExtensionService.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        console.log('data', data)
        var min = data.minExtensionLength
        var max = data.maxExtensionLength
        var def = data.defaultExtensionLength
        ctrl.extensions = []
        for (var i = min; i <= max; i++) {
          ctrl.extensions.push({
            default: i === def,
            length: i,
            template: '{{ phoneNumberLast' + i + ' }}'
          })
        }
      })
    }

    function clearNumbers() {
      ctrl.phoneNumbers = []
      ctrl.phoneNumberAction = 'skip'
    }

    function setNumbers(numbers) {
      ctrl.phoneNumbers = numbers
      ctrl.phoneNumberAction = 'select'
      var defaultExtension = _.find(ctrl.extensions, { default: true })
      if (defaultExtension) {
        ctrl.extension = defaultExtension.template
      }
      ctrl.callingLineIdPhoneNumber = ctrl.templates.callingLineIdPhoneNumber
    }

    function selectNumbers() {
      $scope.$broadcast('bulkSelectExistingNumbers:load')
    }

    function createNumbers() {
      $scope.$broadcast('bulkCreateNumbers:load')
    }

    function onUpdateNumbers(event) {
      if (event.phoneNumbers.length >= ctrl.userCount) {
        setNumbers(event.phoneNumbers)
      } else {
        clearNumbers()
      }
    }

    function canComplete() {
      return ctrl.phoneNumberAction === 'select'
        ? ctrl.phoneNumbers.length > 0
        : true
    }

    function complete() {
      ctrl.onUpdate(
        EventEmitter({
          phoneNumbers: ctrl.phoneNumbers,
          activatePhoneNumber: ctrl.activatePhoneNumber,
          extension: ctrl.extension,
          callingLineIdPhoneNumber: ctrl.callingLineIdPhoneNumber
        })
      )
    }
  }
})()
