;(function() {
  angular.module('odin.user').component('userDashboard', {
    templateUrl: 'user/components/dashboard/dashboard.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    $routeParams,
    UserDashboardService,
    UserPermissionService,
    ACL,
    Route
  ) {
    var ctrl = this

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
    ctrl.$onInit = onInit
    ctrl.isAdmin = ACL.has('Group')

    function onInit() {
      ctrl.loading = true
      return UserDashboardService.load(ctrl.userId)
        .then(function() {
          return UserPermissionService.load(ctrl.userId)
        })
        .then(loadPermissions)
        .then(loadCards)
        .catch(function(error) {
          console.log('error', error)
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadPermissions(permission) {
      if (permission.read('Basic Call Logs')) {
        ctrl.showCalls = true
      }
      var quickActions = [
        'Call Forwarding Always',
        'Call Forwarding Busy',
        'Call Forwarding No Answer',
        'Do Not Disturb',
        'Remote Office',
        'BroadWorks Anywhere'
      ]
      ctrl.showQuick = _.find(quickActions, function(service) {
        return permission.read(service)
      })
    }

    function loadCards() {
      var _cards = cards()
      _cards.forEach(UserDashboardService.prepareCard)
      ctrl.cards = _cards
    }

    // always return a new set
    function cards() {
      var route = Route.path(
        'users',
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.userId
      )
      return [
        {
          type: 'provisioning',
          name: 'User ID',
          path: route('userId'),
          admin: true,
          module: 'Provisioning'
        },
        {
          type: 'provisioning',
          name: 'Calling Plans',
          path: route('callingPlans'),
          admin: true,
          module: 'Provisioning'
        },
        {
          type: 'provisioning',
          name: 'Delete User',
          path: route('delete'),
          admin: true,
          module: 'Provisioning'
        },
        {
          type: 'provisioning',
          name: 'Addresses',
          path: route('addresses'),
          admin: true
        },
        {
          type: 'provisioning',
          name: 'Profile',
          path: route('profile'),
          admin: true
        },
        {
          type: 'provisioning',
          name: 'Shared Call Appearance',
          path: route('sharedCallAppearanceAdmin'),
          admin: true,
          module: 'Provisioning'
        },
        {
          type: 'provisioning',
          name: 'User Services',
          path: route('services'),
          admin: true,
          module: 'Provisioning'
        },
        {
          type: 'provisioning',
          name: 'Service Packs',
          path: route('servicePacks'),
          admin: true,
          module: 'Provisioning'
        },
        {
          type: 'provisioning',
          name: 'Viewable Pack',
          path: route('viewablePack'),
          admin: true,
          module: 'Viewable Service Packs'
        },
        {
          type: 'service',
          name: 'Comm Barring Auth Codes',
          service: 'Communication Barring User-Control',
          path: route('communicationBarringAuthorizationCodes'),
          admin: true
        },
        {
          type: 'service',
          service: 'Call Recording',
          path: route('callRecording')
        },
        {
          type: 'service',
          service: 'Alternate Numbers',
          path: route('alternateNumbers')
        },
        {
          type: 'service',
          service: 'Anonymous Call Rejection',
          path: route('anonymousCallRejection')
        },
        {
          type: 'service',
          service: 'Authentication',
          path: route('authentication')
        },
        {
          type: 'service',
          service: 'Automatic Hold/Retrieve',
          path: route('automaticHoldRetrieve')
        },
        {
          type: 'service',
          service: 'Automatic Callback',
          path: route('automaticCallback')
        },
        {
          type: 'service',
          service: 'Barge-in Exempt',
          path: route('bargeInExempt')
        },
        {
          type: 'callRecords',
          service: 'Basic Call Logs',
          path: route('basicCallLogs')
        },
        {
          type: 'callRecords',
          module: 'Premium Call Records',
          path: route('premiumCallRecords')
        },
        {
          type: 'service',
          service: 'BroadWorks Anywhere',
          path: route('broadWorksAnywhere')
        },
        {
          type: 'service',
          service: 'BroadWorks Mobility',
          path: route('broadWorksMobility')
        },
        {
          type: 'service',
          service: 'Busy Lamp Field',
          path: route('busyLampField')
        },
        {
          type: 'service',
          service: 'Call Center',
          path: route('callCenter')
        },
        {
          type: 'service',
          service: 'Call Forwarding Always',
          path: route('callForwardingAlways')
        },
        {
          type: 'service',
          service: 'Call Forwarding Busy',
          path: route('callForwardingBusy')
        },
        {
          type: 'service',
          service: 'Call Forwarding No Answer',
          path: route('callForwardingNoAnswer')
        },
        {
          type: 'service',
          service: 'Call Forwarding Not Reachable',
          path: route('callForwardingNotReachable')
        },
        {
          type: 'service',
          service: 'Call Forwarding Selective',
          path: route('callForwardingSelective')
        },
        {
          type: 'service',
          service: 'Call Notify',
          path: route('callNotify')
        },
        {
          type: 'service',
          service: 'Call Transfer',
          path: route('callTransfer')
        },
        {
          type: 'service',
          service: 'Calling Line ID Delivery Blocking',
          path: route('callingLineIdDeliveryBlocking')
        },
        {
          type: 'service',
          service: 'Calling Name Delivery',
          path: route('callingNameDelivery')
        },
        {
          type: 'service',
          service: 'Calling Name Retrieval',
          path: route('callingNameRetrieval')
        },
        {
          type: 'service',
          service: 'Calling Number Delivery',
          path: route('callingNumberDelivery')
        },
        {
          type: 'service',
          service: 'Collaborate - Audio',
          path: route('collaborate')
        },

        {
          type: 'service',
          service: 'Connected Line Identification Restriction',
          path: route('connectedLineIdentificationRestriction')
        },
        {
          type: 'service',
          service: 'Call Waiting',
          path: route('callWaiting')
        },
        {
          type: 'service',
          name: 'Directory',
          path: route('directory')
        },
        {
          type: 'service',
          service: 'Directed Call Pickup with Barge-in',
          path: route('directedCallPickupWithBargeIn')
        },
        {
          type: 'service',
          service: 'Do Not Disturb',
          path: route('doNotDisturb')
        },
        {
          type: 'service',
          service: 'External Calling Line ID Delivery',
          path: route('externalCallingLineIdDelivery')
        },
        {
          type: 'service',
          service: 'Fax Messaging',
          path: route('faxMessaging')
        },
        {
          type: 'service',
          service: 'Hoteling Guest',
          path: route('hotelingGuest')
        },
        {
          type: 'service',
          service: 'Hoteling Host',
          path: route('hotelingHost')
        },
        {
          type: 'service',
          service: 'Internal Calling Line ID Delivery',
          path: route('internalCallingLineIdDelivery')
        },
        {
          type: 'service',
          name: 'Meet-Me Conferencing',
          path: route('meetMe'),
          admin: false,
          module: 'Meet-Me Conferencing'
        },

        {
          type: 'service',
          service: 'Music On Hold User',
          path: route('musicOnHold')
        },
        {
          type: 'service',
          service: 'Outlook Integration',
          path: route('outlookIntegration')
        },
        {
          type: 'service',
          service: 'Group Night Forwarding',
          path: route('userNightForwarding')
        },

        {
          type: 'service',
          service: 'Priority Alert',
          path: route('priorityAlert')
        },
        {
          type: 'service',
          service: 'Push to Talk',
          path: route('pushToTalk')
        },
        {
          type: 'service',
          service: 'Remote Office',
          path: route('remoteOffice')
        },
        {
          type: 'service',
          service: 'Selective Call Acceptance',
          path: route('selectiveCallAcceptance')
        },
        {
          type: 'service',
          service: 'Selective Call Rejection',
          path: route('selectiveCallRejection')
        },
        {
          type: 'service',
          service: 'Sequential Ring',
          path: route('sequentialRing')
        },
        // This was never completed
        // {
        //   type: 'service',
        //   service: 'Shared Call Appearance',
        //   path: route('sharedCallAppearance')
        // },
        {
          type: 'service',
          service: 'Simultaneous Ring Personal',
          path: route('simultaneousRingPersonal')
        },
        {
          type: 'service',
          service: 'Speed Dial 100',
          path: route('speedDial100')
        },
        {
          type: 'service',
          service: 'Voice Messaging User',
          path: route('voiceMessaging')
        }
      ]
    }
  }
})()
