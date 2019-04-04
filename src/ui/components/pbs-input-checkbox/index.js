import angular from 'angular'
import { Wrap, Directive } from '../pbs-input-helper'

angular.module('odin.ui').directive('pbsInputCheckbox', Wrap('checkbox'))
angular.module('odin.ui').directive('pbsInputCheckbox', Directive)
