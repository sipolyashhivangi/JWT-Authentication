var crudApp = angular.module("crudApp", ['ngRoute','angularUtils.directives.dirPagination','LocalStorageModule']);
crudApp.config(function($routeProvider)
{
	$routeProvider
	.when('/listing',
	{
		templateUrl : 'templates/listing.html',
		controller : 'studentController'
	})
	.when('/add',
	{
		templateUrl : 'templates/form.html',
		controller : 'cntrl'
	})
	.when('/logout',
	{
		templateUrl : 'templates/logout.php',
		controller : 'logoutController'
	})
});
crudApp.controller("cntrl", function($scope, $http,filterFilter)
{
function TestController() {
  var vm = this;

  vm.password = '';
  vm.cpassword = '';
}
app.directive('cpassword', cpassword);


function cpassword() {

  var linkFn = function(scope, element, attributes, ngModel) {
    ngModel.$validators.cpassword = function(modelValue) {
      return modelValue == scope.password;
    };

    scope.$watch("password", function() {
      ngModel.$validate();
    });
  };

  return {
    require: "ngModel",
    scope: {
      password: "=cpassword"
    },
    link: linkFn
  };
};


 $scope.countryNames = [
        {
            "id": 0,
            "displayName": "India"
        },
        {
            "id": 1,
            "displayName": "U.S.A."
        },
        {
            "id": 2,
            "displayName": "Canada"
        }
    ];
    $scope.selectedCountryNames = $scope.countryNames[0];

    $scope.statesNames = [
        {
            "id": 0,
            "displayName": "MP",
            "parentId": 0
        },
        {
            "id": 1,
            "displayName": "UP",
            "parentId": 0
        },
        {
            "id": 2,
            "displayName": "Delhi/NCR",
            "parentId": 0
        },
        {
            "id": 3,
            "displayName": "USA State 1",
            "parentId": 1
        },
        {
            "id": 4,
            "displayName": "USA State 2",
            "parentId": 1
        },
        {
            "id": 5,
            "displayName": "Canada State 1",
            "parentId": 2
        }
    ];
    $scope.filteredArray = [];
    $scope.$watch("parentId", function (newValue) {
        $scope.filteredArray = filterFilter($scope.statesNames, newValue);
        $scope.selectedStatesNames = $scope.filteredArray[0];
    },true);
    

    $scope.cityNames = [
        {
            "id": 0,
            "displayName": "Gwalior",
            "parentId": 0
        },
        {
            "id": 1,
            "displayName": "Bhopal",
            "parentId": 0
        },
        {
            "id": 2,
            "displayName": "Indore",
            "parentId": 0
        },
        {
            "id": 3,
            "displayName": "USA State 1 City 1",
            "parentId": 3
        },
        {
            "id": 4,
            "displayName": "USA State 1 City 2",
            "parentId": 3
        },
        {
            "id": 5,
            "displayName": "Canada State 1 City 1",
            "parentId": 5
        }
    ];
    $scope.selectedCityNames = $scope.cityNames[0];
	$scope.url = 'submit.php';

        $scope.formsubmit = function(isValid) {
    
            if (isValid) {
                $http.post($scope.url, {"name": $scope.user.name, 
										"userName":$scope.user.username,
										"password":$scope.user.password,
										"cpassword":$scope.user.cpassword,
										"email": $scope.user.email, 
										"contactno":$scope.user.contactno,
										"country":$scope.selectedCountryNames,
										"state":$scope.selectedStatesNames,
										"city":$scope.selectedCityNames,
										"message": $scope.message}).
                        success(function(data, status) {
						
                            console.log(data);
                            $scope.status = status;
                            $scope.data = data;
                            $scope.result = data; 
                        });
						alert("Data successfully inserted");
						
            }else{
               SweetAlert.swal("Here's a message");
                 swal("Alert!");
            }

        }
});


	  crudApp.controller('studentController', function($scope, $http) {
    $http.get("http://172.16.10.22/~ssipolya/Angular Js/programs/curdByShivangi/getListing.php")
    .success(function(response) {$scope.lists = response;});
	
	 $scope.url = 'deleteUser.php';
	$scope.prod_delete = function(index) {  
	
     var x = confirm("Are you sure to delete the selected product");
     if(x){
      $http.post($scope.url,
            {
                'prod_index'     : index
            }
        )      
        .success(function (data, status, headers, config) {               
             $scope.get_product();
             alert("Product has been deleted Successfully");
        })

        .error(function(data, status, headers, config){
           
        });
      }else{

      }
    }
  });
	
crudApp.controller("logoutController",function ($scope,$window, $http,$location, localStorageService) {
		$http.post('templates/logout.php', {'token': $window.sessionStorage.token})
		.success(function(response) {
		console.log(response);
		location.href = 'index.html';
    })
	.error(function(data, status, headers, config){
		alert("Token is expired");;
	});
});
						

