const CACHE_NAME = 'hammer-game-v1.0.1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Instalar o Service Worker
self.addEventListener('install', function(event) {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Service Worker: Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        console.log('Service Worker: Instalação completa');
        return self.skipWaiting(); // Força ativação imediata
      })
  );
});

// Ativar o Service Worker
self.addEventListener('activate', function(event) {
  console.log('Service Worker: Ativando...');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      console.log('Service Worker: Ativado e pronto');
      return self.clients.claim(); // Assume controle imediatamente
    })
  );
});

// Interceptar requisições de rede
self.addEventListener('fetch', function(event) {
  // Só cachear requisições GET do mesmo domínio
  if (event.request.method === 'GET' && event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - retornar resposta do cache
          if (response) {
            return response;
          }

          // Clone da requisição para usar
          const fetchRequest = event.request.clone();

          return fetch(fetchRequest).then(
            function(response) {
              // Verificar se recebemos uma resposta válida
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Clone da resposta para cache
              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });

              return response;
            }
          ).catch(function() {
            // Se fetch falhar, retornar página offline básica
            if (event.request.destination === 'document') {
              return caches.match('./index.html');
            }
          });
        })
    );
  }
});

// Lidar com mensagens do cliente
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Log para debug
console.log('Service Worker do Hammer carregado e pronto para PWA!');