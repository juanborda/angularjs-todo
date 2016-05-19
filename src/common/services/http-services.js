angular.module('app.http-services', ['app.site-config', 'app.shared-helpers'])
    .factory('TodoService', ['$http', '$q', '$site-config', function ($http, $q, $config) {

        var service = $config.API_URL + 'todos';
        
        function query(id) {
            var endpoint = service,
                deferred = $q.defer();
            
            function success (res) {
                deferred.resolve(res.data);
            }
            
            function error (res) {
                deferred.reject(res);
            }
            
            $http.get(endpoint).then(success, error);
            return deferred.promise;
        }

        function create(data) {
            var endpoint = service,
                deferred = $q.defer();

            function success (res) {
                deferred.resolve(res.data);
            }

            function error (res) {
                deferred.reject(res);
            }

            $http.post(endpoint, data).then(success, error);
            return deferred.promise;
        }

        function save(id, data) {
            var endpoint = service + '/' + id,
                deferred = $q.defer();

            function success (res) {
                deferred.resolve(res.data);
            }

            function error (res) {
                deferred.reject(res);
            }

            $http.put(endpoint, data).then(success, error);
            return deferred.promise;
        }

        function destroy(id) {
            var endpoint = service + '/' + id,
                deferred = $q.defer();

            function success (res) {
                deferred.resolve(res.data);
            }

            function error (res) {
                deferred.reject(res);
            }

            $http.delete(endpoint).then(success, error);
            return deferred.promise;
        }

        return {
            query: query,
            create: create,
            save: save,
            destroy: destroy
        };
    }]);