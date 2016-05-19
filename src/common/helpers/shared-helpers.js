angular.module('app.shared-helpers', [])
    .factory('$objects', function () {
        return {
            'isEmpty': function (obj) {
                return Object.keys(obj).length === 0;
            },
            'cleanArray': function cleanArray(actual) {
                var newArray = [];
                for (var i = 0; i < actual.length; i++) {
                    if (actual[i]) {
                        newArray.push(actual[i]);
                    }
                }
                return newArray;
            },
            'toUrlString': function (obj) {
                var url = this.cleanArray(Object.keys(obj).map(function (k) {
                    if (!angular.isUndefined(obj[k]) && obj[k] !== "") {
                        return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
                    }
                })).join('&');
                return url;
            },
            'serializeUrl': function (obj, prefix) {
                var str = [];
                for (var p in obj) {
                    if (obj.hasOwnProperty(p)) {
                        var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
                        str.push(typeof v === "object" ?
                            this.serializeUrl(v, k) :
                        encodeURIComponent(k) + "=" + encodeURIComponent(v));
                    }
                }
                return str.join("&");
            },
            'pad': function (n) {
                return (String(n).length < 2) ? '0' + n : n;
            },
            's2t': function (seconds) {
                return {
                    days: this.pad(Math.floor(seconds / 86400)),
                    hours: this.pad(Math.floor(((seconds / 86400) % 1) * 24)),
                    minutes: this.pad(Math.floor(((seconds / 3600) % 1) * 60)),
                    seconds: this.pad(Math.round(((seconds / 60) % 1) * 60))
                };
            }
        };
    });