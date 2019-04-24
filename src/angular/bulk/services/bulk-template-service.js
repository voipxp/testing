import angular from 'angular'
import Mustache from 'mustache'

angular.module('odin.bulk').factory('BulkTemplateService', BulkTemplateService)

BulkTemplateService.$inject = ['$q']
function BulkTemplateService($q) {
  var service = { parse: parse, hasTag: hasTag }
  return service

  function parse(template, view) {
    // if empty just resolve
    if (!template) {
      return $q.resolve(template)
    }

    // sanitize the input
    template = template.toString()
    view = view || {}

    // build a an array of promises for rendering each tag
    var promises = getTags(template).map(function(tag) {
      return render(tag, view)
    })

    // try to resolve all the tags individually first
    // eg: {{ something }}@{{ somethingelse }}
    // if successful return the rendered template
    return $q.all(promises).then(function() {
      return render(template, view)
    })
  }

  function getTags(template) {
    var tagRegExp = /({{[^}}]*}})/g
    template = (template && template.toString()) || ''
    return template.match(tagRegExp) || []
  }

  function hasTag(template) {
    return getTags(template).length > 0
  }

  function render(template, view) {
    return $q(function(resolve, reject) {
      try {
        var results = Mustache.render(template, view)
        // in case of a single { we were too early
        if (!results || /{/.exec(results)) {
          reject(template)
        } else {
          resolve(results.trim())
        }
      } catch (error) {
        return reject(error)
      }
    })
  }
}
