/**
 * Created by gmeszaros on 8/5/2014.
 */
angular.module('TaskRunner')
    .service('mockService', ['$q', function ($q) {
        return{
            getMockTasks: function () {
                return [
                    {"DisplayText": "Add", "Groups": ["Calculator"], "DotNetType": "TaskRunner.Plugin.Samples.Calculator.Add", "ContainerAssembly": "TaskRunner.Plugin.Samples, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "InputProperties": [
                        {"PropertyName": "Number1", "LabelText": "Number 1", "HintText": "The first number to add", "Required": true, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": null, "Value": null}},
                        {"PropertyName": "Number2", "LabelText": "Number 2", "HintText": "The second number to add", "Required": true, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": null, "Value": null}},
                        {"PropertyName": "Number3", "LabelText": "Number 2", "HintText": "The third number to add", "Required": false, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": null, "Value": null}}
                    ], "OutputProperties": [
                        {"PropertyName": "Result", "LabelText": "Result", "ShortDescription": null, "References": null}
                    ], "HelpText": "Add Numbers"},
                    {"DisplayText": "Multiply", "Groups": ["Calculator"], "DotNetType": "TaskRunner.Plugin.Samples.Calculator.Multiply", "ContainerAssembly": "TaskRunner.Plugin.Samples, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "InputProperties": [
                        {"PropertyName": "Number1", "LabelText": "Number 1", "HintText": "The first number to multiply", "Required": true, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": null, "Value": null}},
                        {"PropertyName": "Number2", "LabelText": "Number 2", "HintText": "The second number to multiply", "Required": true, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": null, "Value": null}},
                        {"PropertyName": "Number3", "LabelText": "Number 2", "HintText": "The third number to multiply", "Required": false, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": null, "Value": null}}
                    ], "OutputProperties": [
                        {"PropertyName": "Result", "LabelText": "Result", "ShortDescription": null, "References": null}
                    ], "HelpText": null},
                    {"DisplayText": "Substract", "Groups": ["Calculator"], "DotNetType": "TaskRunner.Plugin.Samples.Calculator.Substract", "ContainerAssembly": "TaskRunner.Plugin.Samples, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "InputProperties": [
                        {"PropertyName": "Number1", "LabelText": "Number 1", "HintText": "The first number to substract from", "Required": true, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": null, "Value": null}},
                        {"PropertyName": "Number2", "LabelText": "Number 2", "HintText": "The second number to substract", "Required": true, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": null, "Value": null}},
                        {"PropertyName": "Number3", "LabelText": "Number 2", "HintText": "The third number to substract", "Required": false, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": null, "Value": null}}
                    ], "OutputProperties": [
                        {"PropertyName": "Result", "LabelText": "Result", "ShortDescription": null, "References": null}
                    ], "HelpText": "Substract numbers"}
                ];
            },
            getMockFlows: function () {
                return [
                    {"Id": "5a747da3-c362-45c3-ac5d-9bd0d71ab832", "DisplayName": "DummyFlow1", "UserName": "3AMLABS\\gmeszaros",
                        "Tasks": [
                            {
                                "DisplayText": "Add",
                                "Groups": ["Calculator"],
                                "DotNetType": "TaskRunner.Plugin.Samples.Calculator.Add",
                                "ContainerAssembly": "TaskRunner.Plugin.Samples, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                "InputProperties": [
                                    {"PropertyName": "Number1",
                                        "LabelText": "Number 1",
                                        "HintText": "The first number to add",
                                        "Required": true, "DefaultValue": "10",
                                        "PropertyValueType": "Number",
                                        "Value": null,
                                        "Reference": {"Key": null, "Value": null},
                                        "Direction": 'input'
                                    },
                                    {"PropertyName": "Number2",
                                        "LabelText": "Number 2",
                                        "HintText": "The second number to add",
                                        "Required": true, "DefaultValue": "20",
                                        "PropertyValueType": "Number", "Value": null,
                                        "Reference": {"Key": null, "Value": null},
                                        "Direction": 'input'},
                                    {"PropertyName": "Number3",
                                        "LabelText": "Number 2",
                                        "HintText": "The third number to add",
                                        "Required": false, "DefaultValue": "30",
                                        "PropertyValueType": "Number", "Value": null,
                                        "Reference": {"Key": null, "Value": null},
                                        "Direction": 'input'}
                                ],
                                "OutputProperties": [
                                    {"PropertyName": "Result",
                                        "LabelText": "Result",
                                        "ShortDescription": null,
                                        "References": [
                                            {
                                                Key: "06fcb0b8-cc71-43be-bd13-c95462ff9726",
                                                Value: "Number1"}
                                        ],
                                        "PropertyValueType": "Number", "Value": null,
                                        "UserGivenDisplayName": null,
                                        "Position": null,
                                        "HelpText": "Add Numbers",
                                        "Direction": 'output'
                                    }
                                ],
                                "Id": "c4bf0748-8896-4a7f-93b9-50d9704045e8",
                            },
                            {
                                "DisplayText": "Multiply",
                                "Groups": ["Calculator"],
                                "DotNetType": "TaskRunner.Plugin.Samples.Calculator.Multiply",
                                "ContainerAssembly": "TaskRunner.Plugin.Samples, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
                                "InputProperties": [
                                    {"PropertyName": "Number1",
                                        "LabelText": "Number 1",
                                        "HintText": "The first number to multiply",
                                        "Required": true, "DefaultValue": "0",
                                        "PropertyValueType": "Number", "Value": null,
                                        "Reference": {"Key": "c4bf0748-8896-4a7f-93b9-50d9704045e8", "Value": "Result"},
                                        "Direction": 'input'},
                                    {"PropertyName": "Number2",
                                        "LabelText": "Number 2",
                                        "HintText": "The second number to multiply",
                                        "Required": true, "DefaultValue": "0",
                                        "PropertyValueType": "Number", "Value": null,
                                        "Reference": {"Key": "c4bf0748-8896-4a7f-93b9-50d9704045e8", "Value": "Result"},
                                        "Direction": 'input'},
                                    {"PropertyName": "Number3",
                                        "LabelText": "Number 2",
                                        "HintText": "The third number to multiply",
                                        "Required": false, "DefaultValue": "0",
                                        "PropertyValueType": "Number", "Value": null,
                                        "Reference": {"Key": null, "Value": null},
                                        "Direction": 'input'}
                                ],
                                "OutputProperties": [
                                    {"PropertyName": "Result",
                                        "LabelText": "Result",
                                        "ShortDescription": null,
                                        "References": {
                                            "1dc452a5-8604-4ec5-90c3-d1e22197b8c8": ["Number1", "Number2", "Number3"]},
                                        "Direction": 'output'}
                                ],
                                "Id": "06fcb0b8-cc71-43be-bd13-c95462ff9726",
                                "UserGivenDisplayName": null,
                                "Position": null, "HelpText": null
                            },
                            {"DisplayText": "Substract", "Groups": ["Calculator"], "DotNetType": "TaskRunner.Plugin.Samples.Calculator.Substract", "ContainerAssembly": "TaskRunner.Plugin.Samples, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "InputProperties": [
                                {"PropertyName": "Number1", "LabelText": "Number 1", "HintText": "The first number to substract from", "Required": true, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": "06fcb0b8-cc71-43be-bd13-c95462ff9726", "Value": "Result"}},
                                {"PropertyName": "Number2", "LabelText": "Number 2", "HintText": "The second number to substract", "Required": true, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": "06fcb0b8-cc71-43be-bd13-c95462ff9726", "Value": "Result"}},
                                {"PropertyName": "Number3", "LabelText": "Number 2", "HintText": "The third number to substract", "Required": false, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": "06fcb0b8-cc71-43be-bd13-c95462ff9726", "Value": "Result"}}
                            ], "OutputProperties": [
                                {"PropertyName": "Result", "LabelText": "Result", "ShortDescription": null, "References": null}
                            ], "Id": "1dc452a5-8604-4ec5-90c3-d1e22197b8c8", "UserGivenDisplayName": null, "Position": null, "HelpText": "Substract numbers"}
                        ], "Properties": {"$dev-server-address$": "lmi-dev.3amlabs.net", "$live-server-address$": "live.3amlabs.net", "$stage-server-address$": "lminext1.3amlabs.net"}},
                    {"Id": "2aaa14c9-3ffa-4eb4-b4e0-bbd1fdb7d253", "DisplayName": "DummyFlow2", "UserName": "3AMLABS\\gmeszaros", "Tasks": [
                        {"DisplayText": "Add", "Groups": ["Calculator"], "DotNetType": "TaskRunner.Plugin.Samples.Calculator.Add", "ContainerAssembly": "TaskRunner.Plugin.Samples, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "InputProperties": [
                            {"PropertyName": "Number1", "LabelText": "Number 1", "HintText": "The first number to add", "Required": true, "DefaultValue": "400", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": null, "Value": null}},
                            {"PropertyName": "Number2", "LabelText": "Number 2", "HintText": "The second number to add", "Required": true, "DefaultValue": "500", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": null, "Value": null}},
                            {"PropertyName": "Number3", "LabelText": "Number 2", "HintText": "The third number to add", "Required": false, "DefaultValue": "600", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": null, "Value": null}}
                        ], "OutputProperties": [
                            {"PropertyName": "Result", "LabelText": "Result", "ShortDescription": null, "References": {"06fcb0b8-cc71-43be-bd13-c95462ff9726": ["Number1", "Number2", "Number3"]}}
                        ], "Id": "c4bf0748-8896-4a7f-93b9-50d9704045e8", "UserGivenDisplayName": null, "Position": null, "HelpText": "Add Numbers"},
                        {"DisplayText": "Multiply", "Groups": ["Calculator"], "DotNetType": "TaskRunner.Plugin.Samples.Calculator.Multiply", "ContainerAssembly": "TaskRunner.Plugin.Samples, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "InputProperties": [
                            {"PropertyName": "Number1", "LabelText": "Number 1", "HintText": "The first number to multiply", "Required": true, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": "c4bf0748-8896-4a7f-93b9-50d9704045e8", "Value": "Result"}},
                            {"PropertyName": "Number2", "LabelText": "Number 2", "HintText": "The second number to multiply", "Required": true, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": "c4bf0748-8896-4a7f-93b9-50d9704045e8", "Value": "Result"}},
                            {"PropertyName": "Number3", "LabelText": "Number 2", "HintText": "The third number to multiply", "Required": false, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": "c4bf0748-8896-4a7f-93b9-50d9704045e8", "Value": "Result"}}
                        ], "OutputProperties": [
                            {"PropertyName": "Result", "LabelText": "Result", "ShortDescription": null, "References": {"1dc452a5-8604-4ec5-90c3-d1e22197b8c8": ["Number1", "Number2"]}}
                        ], "Id": "06fcb0b8-cc71-43be-bd13-c95462ff9726", "UserGivenDisplayName": null, "Position": null, "HelpText": null},
                        {"DisplayText": "Substract", "Groups": ["Calculator"], "DotNetType": "TaskRunner.Plugin.Samples.Calculator.Substract", "ContainerAssembly": "TaskRunner.Plugin.Samples, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "InputProperties": [
                            {"PropertyName": "Number1", "LabelText": "Number 1", "HintText": "The first number to substract from", "Required": true, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": "06fcb0b8-cc71-43be-bd13-c95462ff9726", "Value": "Result"}},
                            {"PropertyName": "Number2", "LabelText": "Number 2", "HintText": "The second number to substract", "Required": true, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": "06fcb0b8-cc71-43be-bd13-c95462ff9726", "Value": "Result"}},
                            {"PropertyName": "Number3", "LabelText": "Number 2", "HintText": "The third number to substract", "Required": false, "DefaultValue": "0", "PropertyValueType": "Number", "Value": null, "Reference": {"Key": null, "Value": null}}
                        ], "OutputProperties": [
                            {"PropertyName": "Result", "LabelText": "Result", "ShortDescription": null, "References": null}
                        ], "Id": "1dc452a5-8604-4ec5-90c3-d1e22197b8c8", "UserGivenDisplayName": null, "Position": null, "HelpText": "Substract numbers"}
                    ], "Properties": {"$dev-server-address$": "lmi-dev.3amlabs.net", "$live-server-address$": "live.3amlabs.net", "$stage-server-address$": "lminext1.3amlabs.net"}}
                ];
            }
        };
    }]);
angular.module('TaskRunner')
    .service('mainService', ['$q', '$http', 'mockService', function ($q, $http, $mock) {
        var _serverUrl = 'http://gmeszaros.3amlabs.net/Api';
        var _data = {
            userInfo: {"UserName": "3AMLABS\\gmeszaros", "FirstName": "Istvan", "LastName": "Madarasz", "Settings": null},
            flows: [],
            tasks: []
        };
        return{
            data: _data,
            getFlows: function () {
                _data.flows = $mock.getMockFlows();
                return;
                $http.get(_serverUrl + "/flow/getflows").success(function (flows) {
                    _data.flows = flows;
                });
            },
            getFlow: function () {
                return $mock.getMockFlow($mock.getMockTasks());
            },
            getUser: function () {
                $http.jsonp(_serverUrl + "/user/getsettings").success(function (userInfo) {
                    _data.userInfo = userInfo;
                });
            },
            getTasks: function () {
                _data.tasks = $mock.getMockTasks();
                return;
                $http.get(_serverUrl + "/task/gettasks").success(function (tasks) {
                    _data.tasks = tasks;
                });
            }
        };
    }]);