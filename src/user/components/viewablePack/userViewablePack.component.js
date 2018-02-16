;(function() {
  angular.module('odin.user').component('userViewablePack', {
    templateUrl: 'user/components/viewablePack/userViewablePack.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    UserViewablePackService,
    GroupViewablePackService,
    $q,
    $routeParams
  ) {
    var ctrl = this

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId

    ctrl.$onInit = onInit
    ctrl.select = select

    var defaultPack = {
      id: 0,
      name: 'Default (view all)'
    }

    function onInit() {
      ctrl.loading = true
      return $q
        .all([loadPack(), loadPacks()])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadPack() {
      return UserViewablePackService.show(ctrl.userId).then(function(data) {
        ctrl.pack = data || defaultPack
        console.log('pack', data)
      })
    }

    function loadPacks() {
      return GroupViewablePackService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.packs = data
        ctrl.packs.push(defaultPack)
        console.log('packs', data)
      })
    }

    function select(pack) {
      Alert.confirm
        .open('Are you sure you want to select this Viewable Service Pack?')
        .then(function() {
          Alert.spinner.open()
          UserViewablePackService.update(ctrl.userId, pack.id)
            .then(loadPack)
            .then(function() {
              Alert.notify.success('Viewable Service Pack Selected')
            })
            .catch(function(error) {
              Alert.notify.danger(error)
            })
            .finally(function() {
              Alert.spinner.close()
            })
        })
    }
  }
})()
