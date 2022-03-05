/** @type {(path: string) => string} */
export const assets = (path) => `/assets/${path.replace(/^\//, "")}`;

export const optimizedImage = (url, width) => {
  const maySearchString = url.match(/\?.+/);
  const urlWithoutSearchString = url.replace(/\?.+/, "");

  let searchString = "";
  if (maySearchString) {
    const params = new URLSearchParams(maySearchString[0]);
    params.append("w", width);
    searchString = params.toString();
  } else {
    const params = new URLSearchParams();
    params.append("w", width);
    searchString = params.toString();    
  }

  return urlWithoutSearchString + "?" + searchString;
}
