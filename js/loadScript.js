// Async load scripts
var loadScript = function(url, callback) {
    var script = document.createElement('script');

    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = function() {
        if (typeof callback === 'function') {
            callback(false);
        }
    };
    script.onerror = function() {
        if (typeof callback === 'function') {
            callback(true);
        }
    };

    document.body.appendChild(script);
};
