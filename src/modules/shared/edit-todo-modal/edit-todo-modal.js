angular.module('app.edit-todo-modal', [])
    .controller('TodoEditModal', ['$state', '$scope', '$uibModalInstance', 'Notification', 'TodoService', 'todo',
        function ($state, $scope, $uibModalInstance, Notification, TodoService, todo) {
            var vm = this;

            $scope.todo = todo;

            $scope.closeModal = function () {
                $uibModalInstance.dismiss('close');
            };

            $scope.save = function () {
                if ($scope.editTodo.$valid) {
                    TodoService.save($scope.todo.id, $scope.todo).then(function (data) {
                        Notification.success('Todo updated successfully');
                        $uibModalInstance.close(todo);
                    }, function (err) {
                        Notification.error('Todo update failed.');
                    });
                } else {
                    Notification.error('Please add a todo title!');
                }
            };
        }]);