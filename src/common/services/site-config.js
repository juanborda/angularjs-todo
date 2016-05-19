angular.module('app.site-config', [])
    .provider('$site-config', function () {
        var globals = {
            API_URL: '@@API_URL',
            APP_URL: '@@APP_URL'
        };

        return {
            getItem: function (key) {
                return globals[key];
            },
            $get: function () {
                return globals;
            }
        };
    });