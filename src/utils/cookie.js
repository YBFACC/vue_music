import Cookie from 'js-cookie'

export const setCookie = function(cookie) {
  Cookie.set('user', cookie)
}

export const removeCookie = function() {
  Cookie.remove('user')
}
