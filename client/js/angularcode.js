var myApp = angular.module('myApp',['ngRoute']);
		myApp.config(function($routeProvider){
			$routeProvider
			.when('/',{
				templateUrl: 'partials/dashboard.html'				
			})
			.when('/add',{
				templateUrl: 'partials/add.html'
			})
			// .when('/login',{
			// 	templateUrl: 'partials/dashboard.html'
			// })
		})
		myApp.factory('defaultFactory', function($http){
			var factory = {};
			var appointments = [];
			factory.getAppointments = function(callback){
				$http.get('/appointments').success(function(output){
					appointments = output;
					callback(appointments);
					// console.log(output);
				})
			}
			factory.addAppointment = function(info,callback){
				// console.log(info);
				// if (!info || !info.date || !info.name || !info.complain || !info.time){
				// 	alert('Please fill out the fields properly!');
				// 	return false;
				// }
				// var formatted_date =
				$http.post('/addappointment',{info: info}).success(function(data){
					// console.log(info);
					// console.log('added');
					// console.log(data);
					alert('Appointment Added!');
					console.log(data);
				})
			};
			factory.removeAppointment = function(info){
				$http.post('/removeappointment', {info: info}).success(
					function(){
						console.log('removed');
					})
			}
			return factory;
		});
		myApp.controller('personController', function($scope,defaultFactory,$location)	{
			defaultFactory.getAppointments(function(data){
			$scope.appointments = data;
			})
			$scope.addAppointment = function(){
				// $location.path('/');
				// console.log($scope.newAppointment);
				defaultFactory.addAppointment($scope.newAppointment, function(){
					defaultFactory.getAppointments(function(data){
						$scope.appointments = data;
					})
						$scope.newAppointment = {};
				})
			}
			$scope.removeAppointment = function(appointment){
				defaultFactory.removeAppointment(appointment)
				defaultFactory.getAppointments(function(data){
					$scope.appointments = data;
				})
			}
		})