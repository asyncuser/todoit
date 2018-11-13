const CACHE_VERSION = 'v1';
const RESOURCES = [
  '/todoit/',
  'test.html',
  '/todoit/src/css/test.css',
  '/todoit/src/main.js'
];

const logger = {
  success(...args) {
    console.log(`%c${args.join(' ')}`, 'color: green');
  }
};

const sw = {
  initialize() {
    logger.success('initialize');
    self.addEventListener('install', sw.onInstall);
    self.addEventListener('activate', sw.onActivate);
    self.addEventListener('fetch', sw.onFetch);
  },
  onInstall(event) {
    logger.success('install');

    event.waitUntil(
      caches.open(CACHE_VERSION).then(cache => cache.addAll(RESOURCES))
    );
  },
  onActivate(event) {
    logger.success('activate');

    event.waitUntil(
      caches.open(CACHE_VERSION)
        .then(cache => cache.keys())
        .then(keys => sw.deleteCache(keys))
        .then(() => self.clients.claim())
    );
  },
  deleteCache(names) {
    return Promise.all(
      names
        .filter(cacheName => cacheName !== CACHE_VERSION)
        .map(cacheName => caches.delete(cacheName))
    );
  },
  onFetch(event) {
    event.respondWith(
      caches.open(CACHE_VERSION).then(cache => {
          return cache.match(event.request).then(response => {
            return response || fetch(event.request)
              .then(response => {
                const responseClone = response.clone();
                cache.put(event.request, responseClone);
              })
          })
        }
      ))
  }
};

sw.initialize();
