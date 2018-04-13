;(function() {
  function acl(type) {
    return function(ACL) {
      'ngInject'
      return ACL.allow(type)
    }
  }
  function module(name) {
    return function(Module) {
      'ngInject'
      return Module.allow(name)
    }
  }
  function path() {
    var prefixes = Array.prototype.slice.call(arguments)

    prefixes.unshift('/users/:serviceProviderId/:groupId/:userId')
    return prefixes.join('/')
  }

  angular.module('odin.user', [])

  angular.module('odin.user').config(function routeConfig($routeProvider) {
    $routeProvider
      .when(path(), {
        template: '<user-dashboard></user-dashboard>',
        resolve: {
          acl: acl('User')
        }
      })
      .when(path('profile'), {
        template: '<user-profile-index></user-profile-index>',
        resolve: {
          acl: acl('User')
        }
      })
      .when(path('alternateNumbers'), {
        template:
          '<user-alternate-numbers module="$resolve.module"></user-alternate-numbers>',
        resolve: {
          acl: acl('User'),
          module: module('Alternate Numbers')
        }
      })
      .when(path('announcements'), {
        template: '<user-announcements-page></user-announcements-page>',
        resolve: {
          acl: acl('User')
        }
      })
      .when(path('announcements/:name/:mediaType'), {
        template: '<user-announcement-page></user-announcement-page>',
        resolve: {
          acl: acl('User')
        }
      })
      .when(path('anonymousCallRejection'), {
        template:
          '<user-anonymous-call-rejection module="$resolve.module"></user-anonymous-call-rejection>',
        resolve: {
          acl: acl('User'),
          module: module('Anonymous Call Rejection')
        }
      })
      .when(path('authentication'), {
        template:
          '<user-authentication module="$resolve.module"></user-authentication>',
        resolve: {
          acl: acl('User'),
          module: module('Authentication')
        }
      })
      .when(path('automaticCallback'), {
        template:
          '<user-automatic-callback module="$resolve.module"></user-automatic-callback>',
        resolve: {
          acl: acl('User'),
          module: module('Automatic Callback')
        }
      })
      .when(path('automaticHoldRetrieve'), {
        template:
          '<user-automatic-hold-retrieve-index module="$resolve.module"></user-automatic-hold-retrieve-index>',
        resolve: {
          acl: acl('User'),
          module: module('Automatic Hold/Retrieve')
        }
      })
      .when(path('bargeInExempt'), {
        template:
          '<user-barge-in-exempt module="$resolve.module"></user-barge-in-exempt>',
        resolve: {
          acl: acl('User'),
          module: module('Barge-in Exempt')
        }
      })
      .when(path('basicCallLogs'), {
        template:
          '<user-basic-call-logs module="$resolve.module"></user-basic-call-logs>',
        resolve: {
          acl: acl('User'),
          module: module('Basic Call Logs')
        }
      })
      .when(path('premiumCallRecords'), {
        template:
          '<user-call-record-index module="$resolve.module"></user-call-record-index>',
        resolve: {
          acl: acl('User'),
          module: module('Premium Call Records')
        }
      })
      .when(path('premiumCallRecords/:startTime/:endTime'), {
        template:
          '<user-call-record-search module="$resolve.module"></user-call-record-search>',
        resolve: {
          acl: acl('User'),
          module: module('Premium Call Records')
        },
        reloadOnSearch: false
      })
      .when(path('broadWorksAnywhere'), {
        template:
          '<user-broad-works-anywhere module="$resolve.module"></user-broad-works-anywhere>',
        resolve: {
          acl: acl('User'),
          module: module('BroadWorks Anywhere')
        }
      })
      .when(path('broadWorksMobility'), {
        template:
          '<user-broad-works-mobility module="$resolve.module"></user-broad-works-mobility>',
        resolve: {
          acl: acl('User'),
          module: module('BroadWorks Mobility')
        }
      })
      .when(path('busyLampField'), {
        template:
          '<user-busy-lamp-field module="$resolve.module"></user-busy-lamp-field>',
        resolve: {
          acl: acl('User'),
          module: module('Busy Lamp Field')
        }
      })
      .when(path('callCenter'), {
        template:
          '<user-call-center module="$resolve.module"></user-call-center>',
        resolve: {
          acl: acl('User'),
          module: module('Call Center')
        }
      })
      .when(path('callForwardingAlways'), {
        template:
          '<user-call-forwarding-always-index module="$resolve.module"></user-call-forwarding-always-index>',
        resolve: {
          acl: acl('User'),
          module: module('Call Forwarding Always')
        }
      })
      .when(path('callForwardingBusy'), {
        template:
          '<user-call-forwarding-busy-index module="$resolve.module"></user-call-forwarding-busy-index>',
        resolve: {
          acl: acl('User'),
          module: module('Call Forwarding Busy')
        }
      })
      .when(path('callForwardingNoAnswer'), {
        template:
          '<user-call-forwarding-no-answer module="$resolve.module"></user-call-forwarding-no-answer>',
        resolve: {
          acl: acl('User'),
          module: module('Call Forwarding No Answer')
        }
      })
      .when(path('callForwardingNotReachable'), {
        template:
          '<user-call-forwarding-not-reachable module="$resolve.module"></user-call-forwarding-not-reachable>',
        resolve: {
          acl: acl('User'),
          module: module('Call Forwarding Not Reachable')
        }
      })
      .when(path('callForwardingSelective'), {
        template:
          '<user-call-forwarding-selective-index module="$resolve.module"></user-call-forwarding-selective-index>',
        resolve: {
          acl: acl('User'),
          module: module('Call Forwarding Selective')
        }
      })
      .when(path('callNotify'), {
        template:
          '<user-call-notify module="$resolve.module"></user-call-notify>',
        resolve: {
          acl: acl('User'),
          module: module('Call Notify')
        }
      })
      .when(path('callRecording'), {
        template:
          '<user-call-recording module="$resolve.module"></user-call-recording>',
        resolve: {
          acl: acl('User'),
          module: module('Call Recording')
        }
      })
      .when(path('callTransfer'), {
        template:
          '<user-call-transfer module="$resolve.module"></user-call-transfer>',
        resolve: {
          acl: acl('User'),
          module: module('Call Transfer')
        }
      })
      .when(path('callWaiting'), {
        template:
          '<user-call-waiting module="$resolve.module"></user-call-waiting>',
        resolve: {
          acl: acl('User'),
          module: module('Call Waiting')
        }
      })
      .when(path('callingLineIdDeliveryBlocking'), {
        template:
          '<user-calling-line-id-delivery-blocking module="$resolve.module"></user-calling-line-id-delivery-blocking>',
        resolve: {
          acl: acl('User'),
          module: module('Calling Line ID Delivery Blocking')
        }
      })
      .when(path('callingNameDelivery'), {
        template:
          '<user-calling-name-delivery module="$resolve.module"></user-calling-name-delivery>',
        resolve: {
          acl: acl('User'),
          module: module('Calling Name Delivery')
        }
      })
      .when(path('callingNameRetrieval'), {
        template:
          '<user-calling-name-retrieval-index module="$resolve.module"></user-calling-name-retrieval-index>',
        resolve: {
          acl: acl('User'),
          module: module('Calling Name Retrieval')
        }
      })
      .when(path('callingNumberDelivery'), {
        template:
          '<user-calling-number-delivery module="$resolve.module"></user-calling-number-delivery>',
        resolve: {
          acl: acl('User'),
          module: module('Calling Number Delivery')
        }
      })
      .when(path('collaborate'), {
        template:
          '<user-collaborate module="$resolve.module"></user-collaborate>',
        resolve: {
          acl: acl('User'),
          module: module('Collaborate - Audio')
        }
      })
      .when(path('meetMe'), {
        template:
          '<user-meet-me-conferenceing-conferences module="$resolve.module"></user-meet-me-conferenceing-conferences>',
        resolve: {
          acl: acl('User'),
          module: module('Meet-Me Conferencing')
        }
      })

      .when(path('communicationBarringAuthorizationCodes'), {
        template:
          '<user-communication-barring-authorization-codes-index module="$resolve.module"></user-communication-barring-authorization-codes-index>',
        resolve: {
          acl: acl('Group'),
          module: module('Communication Barring User-Control')
        }
      })
      .when(path('connectedLineIdentificationRestriction'), {
        template:
          '<user-connected-line-identification-restriction module="$resolve.module"></user-connected-line-identification-restriction>',
        resolve: {
          acl: acl('User'),
          module: module('Connected Line Identification Restriction')
        }
      })
      .when(path('directedCallPickupWithBargeIn'), {
        template:
          '<user-directed-call-pickup-with-barge-in module="$resolve.module"></user-directed-call-pickeup-with-barge-in>',
        resolve: {
          acl: acl('User'),
          module: module('Directed Call Pickup with Barge-in')
        }
      })
      .when(path('directory'), {
        template: '<user-phone-directory></user-phone-directory>',
        resolve: {
          acl: acl('User')
        }
      })
      .when(path('doNotDisturb'), {
        template:
          '<user-do-not-disturb module="$resolve.module"></user-do-not-disturb>',
        resolve: {
          acl: acl('User'),
          module: module('Do Not Disturb')
        }
      })
      .when(path('externalCallingLineIdDelivery'), {
        template:
          '<user-external-calling-line-id-delivery module="$resolve.module"></user-external-calling-line-id-delivery>',
        resolve: {
          acl: acl('User'),
          module: module('External Calling Line ID Delivery')
        }
      })
      .when(path('faxMessaging'), {
        template:
          '<user-fax-messaging module="$resolve.module"></user-fax-messaging>',
        resolve: {
          acl: acl('User'),
          module: module('Fax Messaging')
        }
      })
      .when(path('hotelingGuest'), {
        template:
          '<user-hoteling-guest module="$resolve.module"></user-hoteling-guest>',
        resolve: {
          acl: acl('User'),
          module: module('Hoteling Guest')
        }
      })
      .when(path('hotelingHost'), {
        template:
          '<user-hoteling-host module="$resolve.module"></user-hoteling-host>',
        resolve: {
          acl: acl('User'),
          module: module('Hoteling Host')
        }
      })
      .when(path('internalCallingLineIdDelivery'), {
        template:
          '<user-internal-calling-line-id-delivery module="$resolve.module"></user-internal-calling-line-id-delivery>',
        resolve: {
          acl: acl('User'),
          module: module('Internal Calling Line ID Delivery')
        }
      })
      .when(path('musicOnHold'), {
        template:
          '<user-music-on-hold module="$resolve.module"></user-music-on-hold>',
        resolve: {
          acl: acl('User'),
          module: module('Music On Hold User')
        }
      })
      .when(path('outlookIntegration'), {
        template:
          '<user-outlook-integration module="$resolve.module"></user-outlook-integration>',
        resolve: {
          acl: acl('User'),
          module: module('Outlook Integration')
        }
      })
      .when(path('priorityAlert'), {
        template:
          '<user-priority-alert-index module="$resolve.module"></user-priority-alert-index>',
        resolve: {
          acl: acl('User'),
          module: module('Priority Alert')
        }
      })
      .when(path('pushToTalk'), {
        template:
          '<user-push-to-talk module="$resolve.module"></user-push-to-talk>',
        resolve: {
          acl: acl('User'),
          module: module('Push to Talk')
        }
      })
      .when(path('remoteOffice'), {
        template:
          '<user-remote-office module="$resolve.module"></user-remote-office>',
        resolve: {
          acl: acl('User'),
          module: module('Remote Office')
        }
      })
      .when(path('selectiveCallAcceptance'), {
        template:
          '<user-selective-call-acceptance module="$resolve.module"></user-selective-call-acceptance>',
        resolve: {
          acl: acl('User'),
          module: module('Selective Call Acceptance')
        }
      })
      .when(path('selectiveCallRejection'), {
        template:
          '<user-selective-call-rejection module="$resolve.module"></user-selective-call-rejection>',
        resolve: {
          acl: acl('User'),
          module: module('Selective Call Rejection')
        }
      })
      .when(path('sharedCallAppearance'), {
        template:
          '<user-shared-call-appearance module="$resolve.module"></user-shared-call-appearance>',
        resolve: {
          acl: acl('User'),
          module: module('Shared Call Appearance')
        }
      })
      .when(path('sequentialRing'), {
        template:
          '<user-sequential-ring module="$resolve.module"></user-sequential-ring>',
        resolve: {
          acl: acl('User'),
          module: module('Sequential Ring')
        }
      })
      .when(path('simultaneousRingPersonal'), {
        template:
          '<user-simultaneous-ring-personal module="$resolve.module"></user-simultaneous-ring-personal>',
        resolve: {
          acl: acl('User'),
          module: module('Simultaneous Ring Personal')
        }
      })
      .when(path('speedDial100'), {
        template:
          '<user-speed-dial-100 module="$resolve.module"></user-speed-dial-100>',
        resolve: {
          acl: acl('User'),
          module: module('Speed Dial 100')
        }
      })
      .when(path('voiceMessaging'), {
        template:
          '<user-voice-messaging-navigation module="$resolve.module"></user-voice-messaging-navigation>',
        resolve: {
          acl: acl('User'),
          module: module('Voice Messaging User')
        }
      })
      .when(path('userId'), {
        template: '<user-id module="$resolve.module"></user-id>',
        resolve: {
          acl: acl('Group'),
          module: module('Provisioning')
        }
      })
      .when(path('delete'), {
        template: '<user-delete module="$resolve.module"></user-delete>',
        resolve: {
          acl: acl('Group'),
          module: module('Provisioning')
        }
      })
      .when(path('addresses'), {
        template: '<user-addresses></user-addresses>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('sharedCallAppearanceAdmin'), {
        template:
          '<user-shared-call-appearance-admin module="$resolve.module"></user-shared-call-appearance-admin>',
        resolve: {
          acl: acl('Group'),
          module: module('Provisioning')
        }
      })
      .when(path('services'), {
        template:
          '<user-services-index service-type="userServices" module="$resolve.module"></user-services-index>',
        resolve: {
          acl: acl('Group'),
          module: module('Provisioning')
        }
      })
      .when(path('servicePacks'), {
        template:
          '<user-services-index service-type="servicePackServices" module="$resolve.module"></user-services-index>',
        resolve: {
          acl: acl('Group'),
          module: module('Provisioning')
        }
      })
      .when(path('callingPlans'), {
        template:
          '<user-calling-plans module="$resolve.module"></user-calling-plans>',
        resolve: {
          acl: acl('Group'),
          module: module('Provisioning')
        }
      })
      .when(path('callingPlans/incoming'), {
        template:
          '<user-incoming-calling-plan-index module="$resolve.module"></user-incoming-calling-plan-index>',
        resolve: {
          acl: acl('Group'),
          module: module('Provisioning')
        }
      })
      .when(path('callingPlans/outgoing'), {
        template:
          '<user-outgoing-calling-plan module="$resolve.module"></user-outgoing-calling-plan>',
        resolve: {
          acl: acl('Group'),
          module: module('Provisioning')
        },
        reloadOnSearch: false
      })
      .when(path('callingPlans/codes'), {
        template:
          '<user-outgoing-calling-plan-authorization-codes module="$resolve.module"></user-outgoing-calling-plan-authorization-codes>',
        resolve: {
          acl: acl('Group'),
          module: module('Provisioning')
        }
      })
      .when(path('callingPlans/digitPlan'), {
        template:
          '<user-outgoing-calling-plan-digit-plan module="$resolve.module"></user-outgoing-calling-plan-digit-plan>',
        resolve: {
          acl: acl('Group'),
          module: module('Provisioning')
        },
        reloadOnSearch: false
      })
      .when(path('callingPlans/pinholeDigitPlan'), {
        template:
          '<user-outgoing-calling-plan-pinhole-digit-plan module="$resolve.module"></user-outgoing-calling-plan-pinhole-digit-plan>',
        resolve: {
          acl: acl('Group'),
          module: module('Provisioning')
        },
        reloadOnSearch: false
      })
      .when(path('callingPlans/transfer'), {
        template:
          '<user-outgoing-calling-plan-transfer-numbers module="$resolve.module"></user-outgoing-calling-plan-transfer-numbers>',
        resolve: {
          acl: acl('Group'),
          module: module('Provisioning')
        }
      })
      .when(path('viewablePack'), {
        template: '<user-viewable-pack></user-viewable-pack>',
        resolve: {
          acl: acl('Group')
        }
      })
  })
})()
