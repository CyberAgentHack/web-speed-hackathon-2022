const FETCH_BASE_URL = "https://res.cloudinary.com/dxwjvnvek/image/fetch"
const MY_DOMAIN = "https://web-hack-2022-maruyama.herokuapp.com"

export const getFetchSRC = (src, width) => {
  if (!src.startsWith('http')) {
    console.log(src)
    src = MY_DOMAIN + src
  }
  if (!width) {
    return `${FETCH_BASE_URL}/${src}`
  }
  return `${FETCH_BASE_URL}/w_${width}/${src}`
}