export async function onRequest({ request, waitUntil }) {
  const url = new URL(request.url);
  const cacheUrl = new URL(request.url);

  const cacheKey = new Request(cacheUrl.toString(), request);
  const cache = caches.default;
  let response = await cache.match(cacheKey);

  if (!response) {
    url.hostname = "web-speed-hackathon-2022-nissy.herokuapp.com";
    response = await fetch(new Request(url.href, request));
    response = new Response(response.body, response);
    waitUntil(cache.put(cacheKey, response.clone()));
  } else {
    console.log(`Cache hit for: ${request.url}.`);
  }
  return response;
}
