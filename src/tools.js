angular.module('com.likalo.ui')
    .factory('$uiTools', function() {

        var ngModelNoop = function() {
            this.$viewValue = undefined;
            this.$modelValue = undefined;
            this.$formatters = [];
            this.$parsers = [];
        };
        ngModelNoop.prototype = {
            $parse: function(value) {
                var $modelValue = value;
                angular.forEach(this.$parsers,
                    function parse(parser) {
                        $modelValue = parser(value);
                    });
                this.$modelValue = value;
            },
            $render: angular.noop,
            $setViewValue: function(value) {
                this.$viewValue = value;
                this.$parse(value);
            }
        };

        function elementUnwrap(el) {
            if (angular.isUndefined(el)) return;
            if (angular.isDefined(el['nodeName'])) return el;
            return el[0];
        }

        function findElementBySelector(selector, el) {
            var document = $document[0];
            if (selector[0] === "#") return angular.element(
                document.getElementById(selector.substr(1))
            );
            if (selector[0] === ".") return angular.element(
                document.getElementsByClassName(selector.substr(1))
            );
            if (selector === ":parent") return el.parent();
            if (selector === ":previous") return el.previous();
            if (selector === ":next") return el.next();
            return angular.element(
                document.getElementsByTagName(selector)
            );
        }

        return {
        	ngModelNoop: ngModelNoop,
        	elementUnwrap: elementUnwrap,
        	findElementBySelector: findElementBySelector
        };
    });