/**
 * Created by gmeszaros on 8/5/2014.
 */
angular.module('TaskRunner')
    .service('mockService', ['$q', function ($q) {
        return{
            getMockTasks: function (count) {
                var tasks = [];
                var task1 = {
                    type: "UserRegister",
                    name: "UR1",
                    properties: [
                        {
                            name: "userEmail",
                            direction: 'input',
                            type: "string"
                        },
                        {
                            name: "userPassword",
                            direction: 'input',
                            type: "string",
                            bind: {
                                name: 'UL',
                                field: 'userPassword'
                            }
                        },
                        {
                            name: "userName",
                            direction: 'output',
                            type: "string",
                            bind: {
                                name: 'UL',
                                field: 'userEmail'
                            }
                        },
                        {
                            name: "userId",
                            direction: 'output',
                            type: "int"
                        }
                    ],
                    x: 30,
                    y: 150
                };
                var task2 = {
                    type: "UserLogin",
                    name: "UL",
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
                    x: 230,
                    y: 150
                };
                var task3 = {
                    type: "SampleTask",
                    name: "ST",
                    properties: [
                        {
                            name: "userEmail",
                            direction: 'input',
                            type: "string"
                        },
                        {
                            name: "userName",
                            direction: 'output',
                            type: "string"
                        },
                    ],
                    x: 430,
                    y: 150
                };
                var task4 = {
                    type: "UserRegister4",
                    name: "UR4",
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
                    x: 630,
                    y: 150
                };
                tasks.push(task1, task2, task3);
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