import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterAudioSettingsEdit', {
  template,
  controller,
  bindings: { userId: '<', service: '=', external: '@', label: '@' }
})

controller.$inject = ['ACL', '$scope']
function controller(ACL, $scope) {
  var ctrl = this
  ctrl.$onInit = onInit

  ctrl.options = {}

  ctrl.isFile = isFile
  ctrl.isUrl = isUrl
  ctrl.isExternal = isExternal
  ctrl.isDefault = isDefault

  ctrl.canAddUrl = canAddUrl
  ctrl.canAddFile = canAddFile

  ctrl.addUrl = addUrl
  ctrl.removeUrl = removeUrl
  ctrl.removeFile = removeFile

  ctrl.selectAudioFile = selectAudioFile
  ctrl.selectAnnouncement = selectAnnouncement
  ctrl.createAnnouncement = createAnnouncement
  ctrl.onSelectAudio = onSelectAudio

  ctrl.hasRepository = ACL.hasVersion('20')

  function onInit() {
    if (ctrl.external) {
      // ctrl.options.audioMessageSource = ['Default', 'Custom', 'External', 'URL']
      ctrl.options.audioMessageSource = ['Default', 'Custom', 'URL']
    } else {
      ctrl.options.audioMessageSource = ['Default', 'File', 'URL']
    }
  }

  function isFile() {
    if (!ctrl.service) return
    var option = ctrl.external ? 'Custom' : 'File'
    return ctrl.service.audioMessageSource === option
  }

  function isUrl() {
    if (!ctrl.service) return
    return ctrl.service.audioMessageSource === 'URL'
  }

  function isExternal() {
    if (!ctrl.service) return
    return ctrl.service.audioMessageSource === 'External'
  }

  function isDefault() {
    if (!ctrl.service) return
    return ctrl.service.audioMessageSource === 'Default'
  }

  function canAddUrl() {
    if (!ctrl.service) return
    return !ctrl.service.audioUrlList || ctrl.service.audioUrlList.length < 4
  }

  function canAddFile() {
    if (!ctrl.service) return
    return !ctrl.service.audioFileList || ctrl.service.audioFileList.length < 4
  }

  function addUrl() {
    ctrl.service.audioUrlList = ctrl.service.audioUrlList || []
    ctrl.service.audioUrlList.push(ctrl.newUrl)
    ctrl.newUrl = null
  }

  function removeUrl(index) {
    ctrl.service.audioUrlList.splice(index, 1)
  }

  function removeFile(index) {
    ctrl.service.audioFileList.splice(index, 1)
  }

  function selectAudioFile() {
    $scope.$broadcast('audioFileCreate:load')
  }

  function selectAnnouncement() {
    $scope.$broadcast('announcementSelect:load')
  }

  function createAnnouncement() {
    $scope.$broadcast('announcementCreate:load')
  }

  function onSelectAudio(event) {
    ctrl.service.audioFileList = ctrl.service.audioFileList || []
    var file = event.audioFile || event.announcement
    file.level = file.level || 'User'
    ctrl.service.audioFileList.push(file)
  }
}
