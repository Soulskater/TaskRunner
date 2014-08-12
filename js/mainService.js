/**
 * Created by gmeszaros on 8/5/2014.
 */
angular.module('TaskRunner')
    .service('mockService', ['$q', function ($q) {
        return{
            getMockTasks: function (count) {
                var tasks = [];
                var task1 = {
                    type: "UserRegister1",
                    typeName: "UR",
                    properties: [
                        {
                            name: "userEmail",
                            direction: 'input',
                            type: "string"
                        },
                        {
                            name: "userPassword",
                            direction: 'input',
                            type: "string"
                        },
                        {
                            name: "userName",
                            direction: 'output',
                            type: "string"
                        },
                        {
                            name: "userId",
                            direction: 'output',
                            type: "int"
                        }
                    ],
                    x:30,
                    y:150
                };
                var task2 = {
                    type: "UserRegister2",
                    typeName: "UR",
                    properties: [
                        {
                            name: "userEmail",
                            direction: 'input',
                            type: "string"
                        },
                        {
                            name: "userPassword",
                            direction: 'input',
                            type: "string"
                        },
                        {
                            name: "userName",
                            direction: 'output',
                            type: "string"
                        },
                        {
                            name: "userId",
                            direction: 'output',
                            type: "int"
                        }
                    ],
                    x:230,
                    y:150
                };
                var task3 = {
                    type: "UserRegister3",
                    typeName: "UR",
                    properties: [
                        {
                            name: "userEmail",
                            direction: 'input',
                            type: "string"
                        },
                        {
                            name: "userPassword",
                            direction: 'input',
                            type: "string"
                        },
                        {
                            name: "userName",
                            direction: 'output',
                            type: "string"
                        },
                        {
                            name: "userId",
                            direction: 'output',
                            type: "int"
                        }
                    ],
                    x:430,
                    y:150
                };
                var task4 = {
                    type: "UserRegister4",
                    typeName: "UR",
                    properties: [
                        {
                            name: "userEmail",
                            direction: 'input',
                            type: "string"
                        },
                        {
                            name: "userPassword",
                            direction: 'input',
                            type: "string"
                        },
                        {
                            name: "userName",
                            direction: 'output',
                            type: "string"
                        },
                        {
                            name: "userId",
                            direction: 'output',
                            type: "int"
                        }
                    ],
                    x:630,
                    y:150
                };
                tasks.push(task1, task2, task3, task4);
                return tasks;
            }
        };
    }]);
angular.module('TaskRunner')
    .service('mainService', ['$q', 'mockService', function ($q, $mock) {
        return{
            getTasks: function () {
                return $mock.getMockTasks(5);
            }
        };
    }]);