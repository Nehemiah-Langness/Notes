if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/Notes/sw.js', { scope: '/Notes/' })})}