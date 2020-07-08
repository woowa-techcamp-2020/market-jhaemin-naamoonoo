/**
 * @param {string} url
 */

const getRequest = (url) => {
  const xhr = new XMLHttpRequest()

  xhr.open('GET', url)
  xhr.send()
}

/**
 * @param {string} url
 * @param {{[key]: string}} body
 */
const postRequest = (url, body) => {}
