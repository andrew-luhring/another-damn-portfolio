;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint undef: true */
/* global angular: true, jQuery: true  */

"use strict";
function printer(message){
	console.log(message);
	if(jQuery('#printer')){
		jQuery("#printer").append("<div>" + message + "</div>");
	}
}
//angular

	var app = angular.module('truck', []).config(function($interpolateProvider){
		console.log("interpolate");
		$interpolateProvider.startSymbol('[[').endSymbol(']]');
	});
	app.factory('Rotation', function(){
		console.log("factory");
		return {
//			x : '1',
//			y : '1',
//			z : '1'
		};
	});

	function Truck($scope, Rotation){
		console.log("truck");
//		$scope.x = Rotation.x;
//		$scope.y = Rotation.y;
//		$scope.z = Rotation.z;
	}

	function RotationCtl($scope){
		$scope.rotation = {
			x: 0
		,   y: 0
		,   z: 0
		};
	}
},{}]},{},[1])
;