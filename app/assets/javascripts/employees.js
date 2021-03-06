

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



employeeManagement.filter("dateFilter", function () {
	return function (data, property, num) {
		
		var filteredData = [];
		if (angular.isArray(data)) {
			for(var i=0; i<data.length; i++) {
				if (new Date(data[i][property]).getMonth() == num) {
					filteredData.push(data[i]);
				}
			}
		}
		return filteredData;
	}
});


employeeManagement.controller("defaultCtrl", ["$scope", "Employee", function ($scope, Employee) {
	$scope.defaultView = true;
	$scope.propertySelected = "hiring_date";
	$scope.monthSelected = new Date().getMonth();
	$scope.formDisplay = false;
	$scope.currentEmployee = null;
	$scope.propertyOptions = [
		{name: 'hiring_date', label: 'Date of hire'},
		{name:'birthday', label: 'Birthday'},
		{name: 'prob_expire', label: 'Probation due'},
		{name: 'act_insure', label: 'Benefit eligible'}
	];
	$scope.monthOptions = [
		{code: 0, label: 'Janguary'},
		{code: 1, label: 'February'},
		{code: 2, label: 'March'},
		{code: 3, label: 'April'},
		{code: 4, label: 'May'},
		{code: 5, label: 'June'},
		{code: 6, label: 'July'},
		{code: 7, label: 'August'},
		{code: 8, label: 'September'},
		{code: 9, label: 'October'},
		{code: 10, label: 'November'},
		{code: 11, label: 'December'}
	];
	$scope.monthIncrement = function () {
		
		if ($scope.monthSelected < 11)  {
			$scope.monthSelected++;
		} 
	};

	$scope.monthDecrement = function () {
		
		if ($scope.monthSelected > 0)  {
			$scope.monthSelected--;
		} 
	};

	$scope.showDefault = function () {
		$scope.defaultView = true;
	};
	$scope.showMonthly = function () {
		$scope.defaultView = false;
	};
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
		if ($scope.currentEmployee && $scope.currentEmployee.$get) {
			$scope.currentEmployee.$get();
		}
		$scope.currentEmployee = {};
		$scope.formDisplay = false;
		$scope.employeeForm.$setPristine(true);
	}

	$scope.listEmployees();

}]);


