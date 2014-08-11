/**
 * Created by gmeszaros on 8/5/2014.
 */
angular.module('TaskManagement', ['TaskManagement.Directive.Editor', 'TaskManagement.Directive.Splitter'])
    .controller('mainController', ['$scope', 'mainService', function ($scope, $service) {
        $scope.tasks = $service.getTasks();
    }]);