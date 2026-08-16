// ==================================================
// Ring Tracker Service Worker
// ==================================================

const CACHE_NAME =
    "ring-tracker-v5";

const APP_FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.webmanifest",
    "./apple-touch-icon.png",

    "./icons/icon-180.png",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];



// ==================================================
// התקנה
// ==================================================

self.addEventListener(
    "install",
    function (event) {

        event.waitUntil(
            caches
                .open(
                    CACHE_NAME
                )
                .then(
                    function (cache) {

                        return cache.addAll(
                            APP_FILES
                        );
                    }
                )
                .then(
                    function () {

                        return self.skipWaiting();
                    }
                )
        );
    }
);



// ==================================================
// הפעלה
// ==================================================

self.addEventListener(
    "activate",
    function (event) {

        event.waitUntil(
            caches
                .keys()
                .then(
                    function (cacheNames) {

                        return Promise.all(
                            cacheNames
                                .filter(
                                    function (cacheName) {

                                        return (
                                            cacheName !==
                                            CACHE_NAME
                                        );
                                    }
                                )
                                .map(
                                    function (cacheName) {

                                        return caches.delete(
                                            cacheName
                                        );
                                    }
                                )
                        );
                    }
                )
                .then(
                    function () {

                        return self.clients.claim();
                    }
                )
        );
    }
);



// ==================================================
// טעינת קבצים
// ==================================================

self.addEventListener(
    "fetch",
    function (event) {

        if (
            event.request.method !==
            "GET"
        ) {

            return;
        }


        const requestUrl =
            new URL(
                event.request.url
            );


        /*
         * מטפלים רק בקבצים
         * ששייכים ל-Ring Tracker עצמו.
         */

        if (
            requestUrl.origin !==
            self.location.origin
        ) {

            return;
        }


        event.respondWith(
            loadRequest(
                event.request
            )
        );
    }
);



// ==================================================
// אינטרנט קודם, cache אם אין אינטרנט
// ==================================================

async function loadRequest(
    request
) {

    try {

        const response =
            await fetch(
                request
            );


        if (
            response &&
            response.ok
        ) {

            const cache =
                await caches.open(
                    CACHE_NAME
                );


            await cache.put(
                request,
                response.clone()
            );
        }


        return response;

    } catch (error) {

        const cached =
            await caches.match(
                request
            );


        if (
            cached
        ) {

            return cached;
        }


        /*
         * אם המשתמשת מנסה לפתוח
         * את האפליקציה עצמה בלי אינטרנט,
         * נחזיר את index.html.
         */

        if (
            request.mode ===
            "navigate"
        ) {

            const homePage =
                await caches.match(
                    "./index.html"
                );


            if (
                homePage
            ) {

                return homePage;
            }
        }


        return Response.error();
    }
}