import Mustache from 'mustache'

export const BulkTemplateService = {
  parse: parse, hasTag: hasTag
}

  function parse(template, view) {
    debugger
    // if empty just resolve
    if (!template) {
      return new Promise.resolve(template)
    }

    // sanitize the input
    template = template.toString()
    view = view || {}

    // build a an array of promises for rendering each tag
    const promises = getTags(template).map(function(tag) {
      return render(tag, view)
    })

    // try to resolve all the tags individually first
    // eg: {{ something }}@{{ somethingelse }}
    // if successful return the rendered template
    return Promise.all(promises).then(function() {
      return render(template, view)
    })
  }

  function getTags(template) {
    debugger
    const tagRegExp = /({{[^}}]*}})/g
    template = (template && template.toString()) || ''
    return template.match(tagRegExp) || []
  }

  function hasTag(template) {
    debugger
    return getTags(template).length > 0
  }

  function render(template, view) {
    debugger
    return new Promise(function(resolve, reject) {
      try {
        console.log('This is mustache template')
        console.log(template)
        console.log('This is mustache view')
        console.log(view)

        const results = Mustache.render(template, view)
        console.log('This is mustache result')
        console.log(results)
        // in case of a single { we were too early
        if (!results || /{/.exec(results)) {
          console.log('This is reject request')
          reject(template)
        } else {
          console.log('This is resolve request')
          resolve(results.trim())
        }
      } catch (error) {
        return reject(error)
      }
    })
  }

