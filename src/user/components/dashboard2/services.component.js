/*
  Notes:
  - UserPermissions instead of Module.read?
  Gotchas
  - Collaborate - Audio, Sharing, Video
  - userMeetMeConferencingConferences
  - userMusicOnHold User
  - userVoiceMessagingDashboard

*/
;(function() {
  angular.module('odin.user').component('userServicesDashboard', {
    templateUrl: 'user/components/dashboard2/services.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
  })

  function Controller(
    Alert,
    UserServiceService,
    Module,
    $q,
    $window,
    $location
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.module = Module
    ctrl.select = select

    var allowedServices = [
      'Alternate Numbers',
      'Anonymous Call Rejection',
      'Authentication',
      'Automatic Callback',
      'Automatic Hold/Retrieve',
      'Barge-in Exempt',
      'BroadWorks Anywhere',
      'BroadWorks Mobility',
      'Busy Lamp Field',
      'Call Center',
      'Call Forwarding Always',
      'Call Forwarding Busy',
      'Call Forwarding No Answer',
      'Call Forwarding Not Reachable',
      'Call Forwarding Selective',
      'Call Notify',
      'Call Recording',
      'Call Transfer',
      'Call Waiting',
      'Calling Line ID Delivery Blocking',
      'Calling Name Delivery',
      'Calling Name Retrieval',
      'Calling Number Delivery',
      'Collaborate - Audio',
      'Connected Line Identification Restriction',
      'Directed Call Pickup with Barge-in',
      'Directory',
      'Do Not Disturb',
      'External Calling Line ID Delivery',
      'Fax Messaging',
      'Group Night Forwarding',
      'Hoteling Guest',
      'Hoteling Host',
      'Internal Calling Line ID Delivery',
      'Meet-Me Conferencing',
      'Music On Hold User',
      'Outlook Integration',
      'Priority Alert',
      'Privacy',
      'Push to Talk',
      'Remote Office',
      'Selective Call Acceptance',
      'Selective Call Rejection',
      'Sequential Ring',
      'Simultaneous Ring Personal',
      'Speed Dial 100',
      'Voice Messaging User'
    ]

    ctrl.columns = [
      {
        key: 'alias',
        label: 'Name'
      },
      {
        key: 'description',
        label: 'Description'
      },
      {
        key: 'isActive',
        label: 'Active',
        type: 'boolean',
        align: 'centered'
      }
    ]

    function onInit() {
      ctrl.loading = true
      return $q
        .all([loadServices(), Module.load()])
        .then(() => {
          const serviceName = $location.search().serviceName
          select({ serviceName })
        })
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function select(service) {
      const name = _.get(service, 'serviceName')
      $location.search('serviceName', name)
      ctrl.selectedService = name ? _.camelCase(`User ${name}`) : null
      $window.scrollTo(0, 0)
    }

    function loadServices() {
      return UserServiceService.assigned(ctrl.userId).then(function(data) {
        ctrl.services = _.filter(data.userServices || [], function(service) {
          return (
            _.includes(allowedServices, service.serviceName) &&
            Module.read(service.serviceName)
          )
        }).map(service => {
          return {
            ...service,
            alias: Module.alias(service.serviceName),
            description: Module.description(service.serviceName),
            isActive: service.isActive === 'true' || service.isActive === true
          }
        })
      })
    }
  }
})()
