;(function() {
  angular.module('odin.group').component('groupPhoneList', {
    templateUrl: 'group/components/directory/list.component.html',
    controller: Controller
  })

  function Controller(Alert, GroupPhoneListService, $routeParams, CsvService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.onPagination = onPagination
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.edit = edit
    ctrl.add = add
    ctrl.csv = csv
    ctrl.upload = upload

    function onPagination(event) {
      ctrl.pager = event.pager
    }

    function onInit() {
      ctrl.loading = true
      loadContacts()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadContacts() {
      return GroupPhoneListService.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.contacts = data
        console.log('contacts', data)
      })
    }

    function csv() {
      ctrl.uploadContacts = null
      ctrl.canUpload = null
      Alert.modal.open('groupCustomPhoneListCsvModal', function(close) {
        bulk(ctrl.uploadContacts, close)
      })
    }

    function add() {
      ctrl.editContact = {}
      ctrl.action = 'Add'
      Alert.modal.open('groupCustomPhoneListEditModal', function(close) {
        ctrl.editContact.name = ctrl.editContact.newName
        create(ctrl.editContact, close)
      })
    }

    function edit(contact) {
      ctrl.editContact = angular.copy(contact)
      ctrl.editContact.newName = ctrl.editContact.name
      ctrl.action = 'Update'
      Alert.modal.open(
        'groupCustomPhoneListEditModal',
        function(close) {
          update(ctrl.editContact, close)
        },
        function(close) {
          Alert.confirm
            .open('Are you sure you want to delete this contact?')
            .then(function() {
              destroy(ctrl.editContact, close)
            })
        }
      )
    }

    function update(contact, callback) {
      Alert.spinner.open()
      GroupPhoneListService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
        contact.name,
        contact
      )
        .then(loadContacts)
        .then(function() {
          Alert.notify.success('Contact Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function create(contact, callback) {
      Alert.spinner.open()
      GroupPhoneListService.store(ctrl.serviceProviderId, ctrl.groupId, contact)
        .then(loadContacts)
        .then(function() {
          Alert.notify.success('Contact Added')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function destroy(contact, callback) {
      Alert.spinner.open()
      GroupPhoneListService.destroy(
        ctrl.serviceProviderId,
        ctrl.groupId,
        contact.name
      )
        .then(loadContacts)
        .then(function() {
          Alert.notify.success('Contact Removed')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function upload(file) {
      CsvService.import(file.content).then(function(data) {
        ctrl.uploadContacts = _.filter(data, function(contact) {
          return contact.name && contact.phoneNumber
        })
        if (ctrl.uploadContacts.length > 0) {
          ctrl.canUpload = 'true'
        }
      })
    }

    function bulk(contacts, callback) {
      Alert.spinner.open()
      GroupPhoneListService.store(ctrl.serviceProviderId, ctrl.groupId, {
        entries: contacts
      })
        .then(loadContacts)
        .then(function() {
          Alert.notify.success('Import Successful')
          callback()
        })
        .catch(function(error) {
          var msg = _.get(error, 'data.error', '')
          if (/Warning/.test(msg)) {
            Alert.notify.warning(error)
            return loadContacts().then(callback)
          } else {
            Alert.notify.danger(error)
          }
        })
        .finally(Alert.spinner.close)
    }
  }
})()