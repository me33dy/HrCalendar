

var employeeManagement = angular.module('employeeApp', ['ngResource', 'ngRoute']);
employeeManagement.config(
    ['$httpProvider', function($httpProvider) {
    var authToken = angular.element("meta[name=\"csrf-token\"]").attr("content");
    var defaults = $httpProvider.defaults.headers;

    defaults.common["X-CSRF-TOKEN"] = authToken;
    defaults.patch = defaults.patch || {};
    defaults.patch['Content-Type'] = 'application/json';
    defaults.common['Accept'] = 'application/json';
}]);


employeeManagement.factory("Employee", ["$resource", function ($resource) {
	// pulling specific user id from erb div to fill in correct api address that matches logged in user. 
	var userAccountId = $("#defaultContainer").data("user-id");
	return $resource("/users/:userId/employees/:id", { userId: userAccountId, id: '@id'}, { create: {method: "POST"}, update: {method: "PUT"} });
}]);

employeeManagement.controller("defaultCtrl", ["$scope", "Employee", function ($scope, Employee) {

	$scope.formDisplay = false;
	$scope.currentEmployee = null;

	// to gather all the employees from the current user
	$scope.listEmployees = function () {
		$scope.employees = Employee.query();
	};

	$scope.deleteEmployee = function (employee) {
		employee.$delete()
		.then(function () {
			position = $scope.employees.indexOf(employee);
			$scope.employees.splice(position, 1);
		})
	};
	$scope.createEmployee = function (employee) {
		$scope.newEmployee = new Employee(employee);
		$scope.newEmployee.$create().then(function (newEmp) {
			$scope.employees.push(newEmp);
		})
	};
	$scope.updateEmployee = function (employee) {
		employee.$update();
	}

	$scope.editOrCreateEmployee = function (employee) {
		$scope.currentEmployee = employee ? employee : {};
		$scope.formDisplay = true;
	}

	$scope.saveChange = function (employee) {
		if (angular.isDefined(employee.id)) {
			$scope.updateEmployee(employee);
		} else {
			$scope.createEmployee(employee);
		}
		$scope.currentEmployee = {};
		$scope.employeeForm.$setPristine(true);
	}

	$scope.cancelChange = function () {
		if ($scope.currentEmployee & $scope.currentEmployee.$get) {
			$scope.currentEmployee.$get();
		}
		$scope.currentEmployee = {};
		$scope.formDisplay = false;
		$scope.employeeForm.$setPristine(true);
	}

	$scope.listEmployees();
}]);


