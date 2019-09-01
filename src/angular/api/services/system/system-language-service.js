import angular from 'angular'
import gql from 'graphql-tag'
angular.module('odin.api').factory('SystemLanguageService', SystemLanguageService)

const SYSTEM_LANGUAGE_QUERY = gql`
  query systemLanguages {
    systemLanguages {
      default
      languages {
        language
        encoding
        locale
      }
    }
  }
`

SystemLanguageService.$inject = ['GraphQL']
function SystemLanguageService(GraphQL) {
  const service = { index }
  return service

  function index() {
    return GraphQL.query({ query: SYSTEM_LANGUAGE_QUERY }).then(res => res.data.systemLanguages)
  }
}
