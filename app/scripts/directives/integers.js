'use strict';

/**
 * @ngdoc function
 * @name smappApp.directive:integers
 * @description
 * # integers
 * Service of the smappApp
 */
 angular.module('smappApp').directive('integers', function() {

        var INTEGER_REGEXP = /^\d+$/; 

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function postLink(scope, element, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {

                    if (INTEGER_REGEXP.test(viewValue)) {
                        var output = viewValue;
                        ctrl.$setValidity('integer', true);
                        return output;
                    } else {
                        ctrl.$setValidity('integer', false);
                    }
                });
            }
        };
    });
