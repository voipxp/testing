  export const modifyLastDirectoryPartOfUrl = (theUrl, lastDir) => {
    const the_arr = theUrl.split('/')
    the_arr.pop()
    var url = the_arr.join('/')
    return url + '/' + lastDir
  }

  export const getBreadcrumbItems = (matchUrl, fullPath) => {
    let breadCrumb
    const splitBy = matchUrl
    const url = fullPath.split(`${splitBy}/`)
    if(url[1]) {
      let href = `/#!${splitBy}`
      breadCrumb = url[1].split('/').map(el => {
        href = href + '/' + el
        const firstUpercaseLetters = el.replace(/([A-Z])/g, ' $1').trim()
        const breadItem = firstUpercaseLetters.charAt(0).toUpperCase() + firstUpercaseLetters.slice(1)

        return {
          itemName: el,
          label: breadItem,
          href: href
        }
      })
    }

    return breadCrumb
  }

	export const UrlOperations =  {
    modifyLastDirectoryPartOfUrl: modifyLastDirectoryPartOfUrl,
    getBreadcrumbItems: getBreadcrumbItems
	}
