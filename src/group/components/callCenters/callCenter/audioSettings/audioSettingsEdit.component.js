;(function() {
  angular.module('odin.group').component('groupCallCenterAudioSettingsEdit', {
    templateUrl:
      'group/components/callCenters/callCenter/audioSettings/audioSettingsEdit.component.html',
    controller: Controller,
    bindings: { service: '=', external: '@', label: '@' }
  })

  function Controller(UtilityService) {
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
    ctrl.addFile = addFile
    ctrl.removeFile = removeFile

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
      return (
        !ctrl.service.audioFileList || ctrl.service.audioFileList.length < 4
      )
    }

    function addUrl() {
      ctrl.service.audioUrlList = ctrl.service.audioUrlList || []
      ctrl.service.audioUrlList.push(ctrl.newUrl)
      ctrl.newUrl = null
    }

    function removeUrl(index) {
      ctrl.service.audioUrlList.splice(index, 1)
    }

    function addFile(file) {
      ctrl.service.audioFileList = ctrl.service.audioFileList || []
      var bwFile = {}
      bwFile.content = file.content
      bwFile.mediaType = UtilityService.getMediaType(file.mimetype)
      bwFile.description = file.name
      ctrl.service.audioFileList.push(bwFile)
    }

    function removeFile(index) {
      ctrl.service.audioFileList.splice(index, 1)
    }
  }
})()
