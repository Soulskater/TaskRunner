/**
 * Created by gmeszaros on 8/5/2014.
 */
angular.module('TaskRunner', ['TaskRunner.Directive.Editor', 'TaskRunner.Directive.DockPanel', 'TaskRunner.Directive.Hammer'])
    .controller('mainController', ['$scope', 'mainService', function ($scope, $service) {
        $scope.tasks = $service.getTasks();

        $scope.onTestTap = function () {
            console.log("Tapped");
        };
    }]);