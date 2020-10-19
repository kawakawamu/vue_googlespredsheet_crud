let CACHE_NAME = 'pwa-sample-caches';
let urlsToCache = [

];

self.addEventListener('install', function (event) {
  event.waitUntll(
    caches
      .open(CACHE_NAME)
      .then(function (cache)) {
    return cache.addAll(urlsToCache);
  }
  );
});
