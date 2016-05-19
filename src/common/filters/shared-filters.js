angular.module('app.shared-filters', ['app.shared-helpers'])
    .filter('htmlToPlaintext', function () {
        return function (text) {
            return text ? String(text).replace(/<[^>]+>/gm, '') : '';
        };
    })
    .filter('amParse', [function () {
        return function (value, format) {
            return moment(value, format);
        };
    }])
    .filter('dateFormat', [function () {
        function amDateFormatFilter(value, format) {
            if (!value && angular.isUndefined(value)) {
                return '';
            }

            var date = moment(value);
            if (!date.isValid()) {
                return '';
            }

            return date.format(format);
        }

        return amDateFormatFilter;
    }])
    .filter('asMoney', function () {
        return function (input) {
            return '$' + Number(input).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        };
    })
    .filter('asInt', function () {
        return function (input) {
            return parseInt(input);
        };
    })
    .filter('capitalize', function () {
        return function (input, scope) {
            if (input !== null) {
                input = input.toLowerCase();
            }
            return (input.substring(0, 1).toUpperCase() + input.substring(1));
        };
    })
    .filter('pad', ['$objects', function ($objects) {
        return function (n) {
            return (String(n).length < 2) ? '0' + n : n;
        };
    }])
    .filter('s2t', ['$objects', function ($objects) {
        return function (seconds, withHour) {
            var t = {
                days: $objects.pad(Math.floor(seconds / 86400)),
                hours: $objects.pad(Math.floor(((seconds / 86400) % 1) * 24)),
                minutes: $objects.pad(Math.floor(((seconds / 3600) % 1) * 60)),
                seconds: $objects.pad(Math.round(((seconds / 60) % 1) * 60))
            };

            var ret = (withHour === true ? t.hours : '');
            ret += t.minutes + ':' + t.seconds;
            return ret;
        };
    }])
    .filter('trim', [function () {
        return function (str) {
            return String(str).replace(/^\s+|\s+$/gi, '');
        };
    }]);