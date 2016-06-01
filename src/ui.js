/**
 * Angular.js application configuration
 * Used in com.Likalo.MiM
 *
 *
 * @author eugene.trounev(a)likalo.com
 */
 angular.module('com.likalo.ui', ['ngDialog'])
    .value('uiPalette', ['#0076ff', '#32936F', '#1b9aaa', '#ef476f', '#ff9600', '#ffcd00', '#69306D', '#c28ccc', '#FFBF00', '#E83F6F', '#2274A5', '#32936F', '#5bc0eb', '#fde74c', '#9bc53d', '#e55934', '#fa7921'])
    .directive('uiAttrs', function() {
        return {
            priority: 99,
            restrict: 'A',
            link: function(scope, element, attr) {
                var _attrs, _bits;
                attr.$observe('uiAttrs', function(value) {
                    if (!value)
                        return;
                    _attrs = value.split(',');
                    angular.forEach(_attrs, function(_attr) {
                        _bits = _attr.split(':');
                        //We don't want the system to set attribute is it's one of JS 'undefined' values
                        if (_bits[1] == "undefined" || _bits[1] == "null" || _bits[1] == "NaN" || _bits[1].indexOf("NaN") > -1) return;
                        attr.$set(_bits[0], _bits[1]);
                    });
                });
            }
        };
    });