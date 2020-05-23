  export const modifyLastDirectoryPartOfUrl = (theUrl, lastDir) => {
    const the_arr = theUrl.split('/')
    the_arr.pop()
    var url = the_arr.join('/')
    return url + '/' + lastDir
  }


	export const UrlOperations =  {
		modifyLastDirectoryPartOfUrl: modifyLastDirectoryPartOfUrl
	}
