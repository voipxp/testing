import angular from 'angular'

const wizardTemplate = `
<div class="columns">
  <div class="column is-one-quarter pbs-menu-nav">
    <aside class="menu pbs-menu-container">
      <ul class="menu-list pbs-menu-list">
        <li ng-repeat="step in $ctrl.steps">
          <a ng-click="$ctrl.select($index)"
            ng-class="{'is-active': step.selected, disabled: !step.complete}">
            <pbs-check-box checked="step.complete" ng-show="step.complete"></pbs-check-box>
            {{ step.label }}
          </a>
        </li>
      </ul>
    </aside>
  </div>
  <div class="column is-three-quarters pbs-menu-content" ng-transclude></div>
</div>
`

angular.module('odin.common').component('pbsWizard', {
  template: wizardTemplate,
  controller: wizardController,
  transclude: true,
  bindings: { onReady: '&', onComplete: '&' }
})

wizardController.$inject = ['EventEmitter']
function wizardController(EventEmitter) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.$postLink = postLink
  ctrl.add = add
  ctrl.next = next
  ctrl.previous = previous
  ctrl.select = select

  function onInit() {
    ctrl.steps = []
  }

  function postLink() {
    open(0)
    ctrl.onReady(EventEmitter({ wizard: ctrl }))
  }

  function add(step) {
    ctrl.steps.push(step)
  }

  function isFirst() {
    return ctrl.current === 0
  }

  function isLast() {
    return ctrl.current === ctrl.steps.length - 1
  }

  function previous() {
    if (!isFirst()) {
      ctrl.steps[ctrl.current].complete = false
      open(ctrl.current - 1)
    }
  }

  function next() {
    ctrl.steps[ctrl.current].complete = true
    if (isLast()) {
      ctrl.onComplete(EventEmitter({ step: ctrl.current }))
    } else {
      open(ctrl.current + 1)
    }
  }

  function select(index) {
    var step = ctrl.steps[index]
    if (step && step.complete) {
      open(index)
    }
  }

  function open(index) {
    ctrl.current = index
    for (var i = 0; i < ctrl.steps.length; i++) {
      ctrl.steps[i].selected = false
      // could I set complete to previous guys?
      if (i >= index) {
        ctrl.steps[i].complete = false
      }
    }
    ctrl.steps[index].selected = true
  }
}

const stepTemplate = `
<div class="pbs-wizard__step" ng-if="$ctrl.step.selected">
  <div ng-transclude></div>
</div>
`
angular.module('odin.common').component('pbsWizardStep', {
  template: stepTemplate,
  controller: StepController,
  transclude: true,
  bindings: { label: '@' },
  require: { wizard: '^^pbsWizard' }
})

function StepController() {
  var ctrl = this

  ctrl.$onInit = onInit

  function onInit() {
    ctrl.step = { label: ctrl.label, selected: false, complete: false }
    ctrl.wizard.add(ctrl.step)
  }
}
