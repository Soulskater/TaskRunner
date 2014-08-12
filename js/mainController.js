/**
 * Created by gmeszaros on 8/5/2014.
 */
angular.module('TaskRunner', ['TaskRunner.Directive.Editor', 'TaskRunner.Directive.DockPanel'])
    .controller('mainController', ['$scope', 'mainService', function ($scope, $service) {
        $scope.tasks = $service.getTasks();
    }]);