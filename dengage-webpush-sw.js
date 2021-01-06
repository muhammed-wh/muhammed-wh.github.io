// filesToCache and staticCacheName variables inside imported js
importScripts('sw-cachefiles.js?v=1cc881e27e1');
self.addEventListener('install', event => {
  //console.log("cache name"+staticCacheName);
  //console.log(filesToCache);
  //console.log('Attempting to install service worker and cache static assets');
  self.skipWaiting();
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});
// removing old caches
self.addEventListener('activate', function(event) {
  //console.log("activate event");
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          if(staticCacheName != cacheName){
            return true
          }
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
self.addEventListener('fetch', function(event) {
  //console.log('Handling fetch event for', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        //console.log('Found response in cache:', response);
        return response;
      }
      //console.log('No response found in cache. About to fetch from network...', event.request.url);
      return fetch(event.request).then(function(response) {
        // adding cache our vue pages when visitor get request
        if((event.request.url.match(/view./ig) || event.request.url.match(/.bundle/ig)) && response.status == 200){
          //console.log('Response from network is:', response);
          caches.open(staticCacheName).then(function(cache){
            cache.put(event.request, response);
          });
          return response.clone();
        }else{
          return response;
        }
      }).catch(function(error) {
        console.error('Fetching failed:', error);
        throw error;
      });
    })
  );
});


importScripts("https://pdev.dengage.com/p/push/10/7c744ecc-e7f8-e219-6a07-f579c7aeafbe/dengage_sw.js");
