import angular from 'angular'
import { Wrap, Directive } from '../pbs-input-helper'

angular.module('odin.UI').directive('pbsInputCheckbox', Wrap('checkbox'))
angular.module('odin.UI').directive('pbsInputCheckbox', Directive)
