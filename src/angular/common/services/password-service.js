import angular from 'angular'
import { generatePassword } from '@/utils'

angular
  .module('odin.common')
  .factory('PasswordService', () => ({ generate: generatePassword }))
