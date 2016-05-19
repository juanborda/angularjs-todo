angular.module('app.todos', ['ui.router', 'app.confirmation-popup'])
    .config(function config($stateProvider) {
        $stateProvider
            .state('todos', {
                url: '/todos',
                templateUrl: 'modules/todos/todos.tpl.html',
                controller: 'TodosCtrl',
                data: {
                    pageTitle: 'Todos',
                    bodyClass: 'todo-page',
                    isPublic: true
                }
            });
    })
    .controller('TodosCtrl', ['$state', '$scope', 'TodoService', 'Notification', '$uibModal', function ($state, $scope, TodoService, Notification, $uibModal) {

        var vm = this;

        vm.todoGetError = function (res) {
            Notification.error('There was a problem retrieving the todo list.');
        };

        vm.todoGetSuccess = function (data) {
            $scope.todos = data;
        };

        vm.getTodos = function () {
            TodoService.query().then(vm.todoGetSuccess, vm.todoGetError);
        };

        vm.init = function () {
            vm.getTodos();

            $scope.edit = function ($event, todo) {
                $event.stopPropagation();

                var editModal = $uibModal.open({
                    templateUrl: 'modules/shared/edit-todo-modal/edit-todo-modal.tpl.html',
                    controller: 'TodoEditModal',
                    size: 'lg',
                    windowClass: 'edit-todo-modal',
                    keyboard: false,
                    resolve: {
                        todo: function () {
                            return angular.copy(todo);
                        }
                    }
                });

                editModal.result.then(function (res){
                    angular.merge(todo, res);
                });
            };

            $scope.add = function () {
                if ($scope.todosForm.$valid) {
                    TodoService.create($scope.todo).then(function (data) {
                        //$scope.todos.push(data);
                        $scope.todos.unshift(data);
                        Notification.success('Todo created successfully');
                    }, function (err) {
                        Notification.error('Todo creation failed.');
                    });
                } else {
                    Notification.error('Please add a todo title!');
                }
            };

            $scope.remove = function (todo, $index) {
                TodoService.destroy(todo.id).then(function () {
                    $scope.todos.splice($index, 1);
                    Notification.success('Todo removed successfully');
                }, function () {
                    Notification.error('Deleting todo failed.');
                });
            };
            
            $scope.complete = function (todo) {
                TodoService.save(todo.id, {completed: todo.completed}).then(function (res) {
                    todo.completed = !todo.completed;
                    Notification.success('Todo status updated!');
                }, function (err) {
                    Notification.error('Todo status update failed!');
                });
            };
        };

        vm.init();
    }]);