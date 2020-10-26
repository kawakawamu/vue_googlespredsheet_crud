self.addEventListener('install', (event) => {
  console.log('service worker install');
});

self.addEventListener('active', (event) => {
  console.info('active', event);
});
