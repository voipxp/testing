/*
  function onSave(close) {
    // do something
    modal.close()
  }

  var onDelete = null

  Modal.open('myModalId', onSave, onDelete)

  <pbs-modal id="myModalId" title="My Modal"
    cancel-text="Cancel"
    save-text="Save"
    delete-text="Delete"></pbs-modal>
*/
;(function() {
  angular.module('odin.common').directive('pbsModal', PbsModal)

  function PbsModal(Modal) {
    return {
      restrict: 'E',
      templateUrl: 'common/UI/alerts/modal.directive.html',
      transclude: true,
      scope: {},
      controller: Controller,
      controllerAs: '$ctrl',
      bindToController: {
        id: '@',
        title: '@',
        saveText: '@',
        deleteText: '@',
        cancelText: '@'
      },
      link: function(scope, element) {
        // watch for columns to show up and add
        // is-mobile to them
        scope.$watch(
          function() {
            var cols = element[0].getElementsByClassName('columns')
            return cols.length > 0 ? cols[0] : null
          },
          function(column) {
            if (!column) return
            angular.element(column).addClass('is-mobile')
          }
        )

        // watch for a form to come online and change the
        // $ctrl.invalidForm field for the save button
        scope.$watch(
          function() {
            return element.find('form')[0]
          },
          function(form) {
            if (!form) return
            scope.form = angular.element(form).controller('form')
            scope.form.$setPristine()
            scope.$watch('form.$invalid', function(invalid) {
              scope.$ctrl.invalidForm = invalid
            })
          }
        )
      }
    }

    function Controller() {
      var ctrl = this
      ctrl.$onInit = onInit
      ctrl.$onDestroy = onDestroy
      ctrl.open = open
      ctrl.close = close
      ctrl.save = save
      ctrl.delete = remove

      function onInit() {
        Modal.register(ctrl)
      }

      function onDestroy() {
        Modal.deregister(ctrl)
      }

      function close() {
        ctrl.isOpen = false
      }

      function open(onSave, onDelete) {
        ctrl.onSave = onSave
        ctrl.onDelete = onDelete
        ctrl.isOpen = true
      }

      function save() {
        if (_.isFunction(ctrl.onSave)) {
          ctrl.onSave(close)
        }
      }

      function remove() {
        if (_.isFunction(ctrl.onDelete)) {
          ctrl.onDelete(close)
        }
      }
    }
  }
})()
