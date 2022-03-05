const FETCH_BASE_URL = "https://res.cloudinary.com/dxwjvnvek/image/fetch"
const MY_DOMAIN = "https://web-hack-2022-maruyama.herokuapp.com"

export const getFetchSRC = (src, width) => {
  if (process.env.NODE_ENV != "production") {
    return src
  }
  if (!src.startsWith('http')) {
    src = MY_DOMAIN + src
  }
  if (width) {
    return `${FETCH_BASE_URL}/w_${width},f_auto,q_auto/${src}`
  }
  return `${FETCH_BASE_URL}/f_auto,q_auto/${src}`
}

export const getFetchSRCTrimmed = (src, height, width) => {
  if (!src.startsWith('http')) {
    src = MY_DOMAIN + src
  }
  return `${FETCH_BASE_URL}/w_${width},h_${height},c_pad,f_png/${src}`
}