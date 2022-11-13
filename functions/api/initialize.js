const BASE_URL = "https://web-speed-hackathon-2022-nissy.herokuapp.com";
export async function onRequest() {
  return Response.redirect(BASE_URL, 301);
}
