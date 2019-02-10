var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("ObfuscateText", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    exports.__esModule = true;
    var globalStyle = null;
    var componentCount = 0;
    var rand = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    var randStrGenerator = function (range) {
        return function (length) {
            var text = "";
            for (var i = 0; i < length; i++) {
                text += range.charAt(rand(0, range.length - 1));
            }
            return text;
        };
    };
    var randText = randStrGenerator("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
    var randAlpha = randStrGenerator("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
    var generate = function (amount) {
        var arr = (new Array(amount));
        for (var i = 0; i < arr.length; i++) {
            arr[i] = randText(5);
        }
        return arr;
    };
    var hiddenElements = generate(5);
    var visibleElements = generate(5);
    var randItem = function (items) {
        var index = Math.floor(Math.random() * items.length);
        return items[index];
    };
    var createKlasses = function (elements, props) {
        return elements.map(function (klass) {
            return "." + klass + " {\n      " + props + "\n      }";
        });
    };
    var generateStyles = function () {
        var hidden = "display: none;";
        var visiable = "display: inline-block;";
        return createKlasses(hiddenElements, hidden).concat(createKlasses(visibleElements, visiable));
    };
    var ObfuscateText = /** @class */ (function (_super) {
        __extends(ObfuscateText, _super);
        function ObfuscateText() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObfuscateText.prototype.componentDidMount = function () {
            if (!globalStyle) {
                globalStyle = document.createElement("style");
                document.head.appendChild(globalStyle);
                var newStyles = generateStyles().join("\n");
                globalStyle.innerHTML = newStyles;
            }
            componentCount++;
        };
        ObfuscateText.prototype.componentWillUnmount = function () {
            if (componentCount <= 0) {
                componentCount = 0;
                if (globalStyle) {
                    var parentNode = globalStyle.parentNode;
                    if (parentNode) {
                        parentNode.removeChild(globalStyle);
                    }
                }
                globalStyle = null;
            }
        };
        ObfuscateText.prototype.shouldComponentUpdate = function (nextProps) {
            return nextProps.text !== this.props.text;
        };
        ObfuscateText.prototype.render = function () {
            var _a = this.props.text, text = _a === void 0 ? "" : _a;
            var children = [];
            var key = function () {
                return "key-" + children.length;
            };
            var span = function (text, className) {
                return React.createElement("span", { key: key(), className: className }, text);
            };
            var space = function () {
                return React.createElement("span", { key: key() + " " }, " ");
            };
            for (var i = 0; i < text.length; i++) {
                var end = rand(1, 2);
                var value = text.slice(i, i + end);
                var fillAmount = rand(1, 2);
                for (var j = 0; j < fillAmount; j++) {
                    var txt = randAlpha(2);
                    var className_1 = randItem(hiddenElements);
                    children.push(span(txt, className_1));
                }
                if (value.startsWith(" ")) {
                    children.push(space());
                }
                var className = randItem(visibleElements);
                children.push(span(value.trim(), className));
                i += end - 1;
                if (value.endsWith(" ")) {
                    children.push(space());
                }
            }
            return (React.createElement(React.Fragment, null, children));
        };
        return ObfuscateText;
    }(React.Component));
    exports["default"] = ObfuscateText;
});
