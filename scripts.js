if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        const notification = document.createElement('div');
                        notification.style.position = 'fixed';
                        notification.style.bottom = '0';
                        notification.style.width = '100%';
                        notification.style.backgroundColor = 'black';
                        notification.style.color = 'white';
                        notification.style.textAlign = 'center';
                        notification.style.padding = '1em';
                        notification.innerText = 'New version available. Refresh to update.';
                        notification.onclick = () => {
                            window.location.reload();
                        };
                        document.body.appendChild(notification);
                    }
                };
            };
        }).catch(error => {
            console.log('ServiceWorker registration failed: ', error);
        });
    });
}
