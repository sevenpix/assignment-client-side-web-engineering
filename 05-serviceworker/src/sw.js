// Tutorial used: https://github.com/jakearchibald/simple-serviceworker-tutorial/blob/gh-pages/sw.js

var CACHE_NAME = 'jpeer-at-cache';

// Here comes the install event!
// This only happens once, when the browser sees this
// version of the ServiceWorker for the first time.
self.addEventListener('install', (event) => {
  // We pass a promise to event.waitUntil to signal how
  // long install takes, and if it failed
  event.waitUntil(
    // We open a cache…
    caches.open(CACHE_NAME).then((cache) => {
      // And add resources to it
      return cache.addAll([
        '/',
        '/favicon.ico',
        '/assets/js/vendor.js',
        '/assets/js/app.js',
        '/assets/js/template.js',
        '/assets/js/main.js',
        '/assets/fonts/fontawesome-webfont.eot?v=4.6.3',
        '/assets/fonts/fontawesome-webfont.svg?v=4.6.3',
        '/assets/fonts/fontawesome-webfont.ttf?v=4.6.3',
        '/assets/fonts/fontawesome-webfont.woff?v=4.6.3',
        '/assets/fonts/fontawesome-webfont.woff2?v=4.6.3',
        '/assets/fonts/FontAwesome.otf?v=4.6.3',
        '/assets/css/global.css',
        '/i18n/locale-en-us.json',
        '/i18n/locale-de-de.json',
        '/assets/img/github-logo.png',
        '/assets/img/logo.svg',
        '/assets/img/slider/hoverfly.jpg',
        '/assets/img/slider/fish.jpg',
        '/assets/img/me_bw.png',
        '/assets/img/code.svg',
        '/assets/img/ci.png',
        '/assets/img/balloons.svg',
        '/assets/img/projects/schwarzkoenig.png',
        '/assets/img/projects/somnia.jpg',
        '/assets/img/projects/volxpop.jpg',
        '/assets/img/projects/prazna.jpg',
        '/assets/img/projects/railroad.png',
      ]);
    })
  );
});

// The fetch event happens for the page request with the
// ServiceWorker's scope, and any request made within that
// page
self.addEventListener('fetch', function(event) {
  // Calling event.respondWith means we're in charge
  // of providing the response. We pass in a promise
  // that resolves with a response object
  event.respondWith(
    // First we look for something in the caches that
    // matches the request
    caches.match(event.request).then(function(response) {
      // If we get something, we return it, otherwise
      // it's null, and we'll pass the request to
      // fetch, which will use the network.
      return response || fetch(event.request);
    })
  );
});
