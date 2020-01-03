(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"app/pages/annotate-tweets/annotate-tweets.module": [
		"./src/app/pages/annotate-tweets/annotate-tweets.module.ts",
		"app-pages-annotate-tweets-annotate-tweets-module~app-pages-dashboard-dashboard-module~app-pages-logi~3f966477",
		"app-pages-annotate-tweets-annotate-tweets-module~app-pages-dashboard-dashboard-module",
		"app-pages-annotate-tweets-annotate-tweets-module"
	],
	"app/pages/dashboard/dashboard.module": [
		"./src/app/pages/dashboard/dashboard.module.ts",
		"app-pages-annotate-tweets-annotate-tweets-module~app-pages-dashboard-dashboard-module~app-pages-logi~3f966477",
		"app-pages-annotate-tweets-annotate-tweets-module~app-pages-dashboard-dashboard-module",
		"app-pages-dashboard-dashboard-module"
	],
	"app/pages/login/login.module": [
		"./src/app/pages/login/login.module.ts",
		"app-pages-annotate-tweets-annotate-tweets-module~app-pages-dashboard-dashboard-module~app-pages-logi~3f966477",
		"app-pages-login-login-module"
	],
	"app/pages/pages.module": [
		"./src/app/pages/pages.module.ts",
		"app-pages-pages-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var module = __webpack_require__(ids[0]);
		return module;
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app.color.ts":
/*!******************************!*\
  !*** ./src/app/app.color.ts ***!
  \******************************/
/*! exports provided: RGB, HEX, Color */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGB", function() { return RGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEX", function() { return HEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
var RGB = /** @class */ (function () {
    function RGB(r, g, b) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.alpha = 1;
        this.value = 0;
        this.setRed(r)
            .setGreen(g)
            .setBlue(b);
        this.updateValue();
    }
    RGB.prototype.getHexPart = function (v) {
        var h = v.toString(16);
        return h.length > 1 ? h : '0' + h;
    };
    RGB.prototype.updateValue = function () {
        this.value = this.getRed() + this.getGreen() + this.getBlue();
        return this;
    };
    RGB.prototype.getValue = function () {
        return this.value;
    };
    RGB.prototype.toHex = function () {
        var hexString = this.getAlpha() < 1
            ? this.toHexAlpha().toString()
            : '#' +
                this.getHexPart(this.getRed()) +
                this.getHexPart(this.getGreen()) +
                this.getHexPart(this.getBlue());
        return new HEX(hexString);
    };
    RGB.prototype.toHexAlpha = function (light) {
        if (light === void 0) { light = true; }
        var tmpRgb = new RGB(this.getRed(), this.getGreen(), this.getBlue());
        if (this.getAlpha() < 1) {
            var tmp = 1 - this.getAlpha();
            tmpRgb.setRed(tmpRgb.getRed() * tmp);
            tmpRgb.setGreen(tmpRgb.getGreen() * tmp);
            tmpRgb.setBlue(tmpRgb.getBlue() * tmp);
        }
        var adjustValue = this.getAlpha() < 1 ? Math.floor(255 * this.getAlpha()) : 0;
        return light
            ? tmpRgb.lighten(adjustValue).toHex()
            : tmpRgb.darken(adjustValue).toHex();
    };
    RGB.prototype.setRed = function (value) {
        this.r = value > 255 ? 255 : value < 0 ? 0 : Math.floor(value);
        return this.updateValue();
    };
    RGB.prototype.getRed = function () {
        return this.r;
    };
    RGB.prototype.setGreen = function (value) {
        this.g = value > 255 ? 255 : value < 0 ? 0 : Math.floor(value);
        return this.updateValue();
    };
    RGB.prototype.getGreen = function () {
        return this.g;
    };
    RGB.prototype.setBlue = function (value) {
        this.b = value > 255 ? 255 : value < 0 ? 0 : Math.floor(value);
        return this.updateValue();
    };
    RGB.prototype.getBlue = function () {
        return this.b;
    };
    RGB.prototype.setAlpha = function (a) {
        this.alpha = a <= 1 && a >= 0 ? a : 1;
        return this;
    };
    RGB.prototype.getAlpha = function () {
        return this.alpha;
    };
    RGB.prototype.lighten = function (by) {
        this.setRed(this.getRed() + by)
            .setBlue(this.getBlue() + by)
            .setGreen(this.getGreen() + by);
        return this.updateValue();
    };
    RGB.prototype.darken = function (by) {
        this.setRed(this.getRed() - by)
            .setBlue(this.getBlue() - by)
            .setGreen(this.getGreen() - by);
        return this.updateValue();
    };
    RGB.prototype.toString = function () {
        return this.alpha < 1
            ? 'rgba(' +
                this.getRed() +
                ',' +
                this.getGreen() +
                ',' +
                this.getBlue() +
                ',' +
                this.getAlpha() +
                ')'
            : 'rgb(' +
                this.getRed() +
                ',' +
                this.getGreen() +
                ',' +
                this.getBlue() +
                ')';
    };
    return RGB;
}());

var HEX = /** @class */ (function () {
    function HEX(hex) {
        this.hex = '#000000';
        this.hex =
            hex.toString().length == 6
                ? '#' + hex
                : hex.toString().length == 7
                    ? hex
                    : null;
    }
    HEX.prototype.toRGB = function () {
        var hexString = this.hex.substr(1).toString();
        return new RGB(parseInt(hexString.substr(0, 2), 16), parseInt(hexString.substr(2, 2), 16), parseInt(hexString.substr(4, 2), 16));
    };
    HEX.prototype.toString = function () {
        return this.hex;
    };
    return HEX;
}());

var Color = /** @class */ (function () {
    function Color(color) {
        if (color instanceof HEX) {
            this.hex = color;
            this.rgb = color.toRGB();
        }
        else if (color instanceof RGB) {
            this.rgb = color;
            this.hex = color.toHex();
        }
    }
    Color.prototype.lighten = function (by) {
        this.rgb = this.rgb.lighten(by);
        this.hex = this.rgb.toHex();
        return this;
    };
    Color.prototype.darken = function (by) {
        this.rgb = this.rgb.darken(by);
        this.hex = this.rgb.toHex();
        return this;
    };
    Color.prototype.toString = function (rgb) {
        if (rgb === void 0) { rgb = true; }
        return rgb ? this.rgb.toString() : this.hex.toString();
    };
    Color.prototype.setAlpha = function (a) {
        this.rgb.setAlpha(a);
        this.hex = this.rgb.toHex();
        return this;
    };
    return Color;
}());



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/**** Colors (recommended use HEX colors) ****/\n/**** App roots ****/\n/**** General ****/\n/**** Navbar ****/\n/**** Sidebar ****/\n/**** Progress ****/\n/**** Fonts ****/\n/**** Social icons ****/\nbody::after {\n  content: '{\"main-color\":\"#282658\",\"default-color\":\"#fff\",\"dark-color\":\"#000\",\"primary-color\":\"#024a88\",\"success-color\":\"#2d922d\",\"warning-color\":\"#f79a17\",\"danger-color\":\"#bf1725\",\"info-color\":\"#248dad\",\"sidebar-bg-color\":\"#282658\",\"gray\":\"#555\",\"gray-light\":\"#ccc\"}';\n  display: none; }\n/**** Colors (recommended use HEX colors) ****/\n/**** App roots ****/\n/**** General ****/\n/**** Navbar ****/\n/**** Sidebar ****/\n/**** Progress ****/\n/**** Fonts ****/\n/**** Social icons ****/\nbody::after {\n  content: '{\"main-color\":\"#282658\",\"default-color\":\"#fff\",\"dark-color\":\"#000\",\"primary-color\":\"#024a88\",\"success-color\":\"#2d922d\",\"warning-color\":\"#f79a17\",\"danger-color\":\"#bf1725\",\"info-color\":\"#248dad\",\"sidebar-bg-color\":\"#282658\",\"gray\":\"#555\",\"gray-light\":\"#ccc\"}';\n  display: none; }\na:hover, a:focus {\n  text-decoration: none; }\n* {\n  outline: none !important; }\nbutton, input, optgroup, select, textarea {\n  font-family: inherit; }\nth {\n  font-weight: bold; }\ncode {\n  padding: .2rem .4rem;\n  border-radius: .25rem; }\n/*Progress*/\n.progress {\n  border-radius: 0; }\n.progress-xs {\n  height: 7px; }\n.progress-sm {\n  height: 10px; }\n.progress-md {\n  height: 13px; }\n/*BG*/\n.bg-primary {\n  background-color: #024a88 !important; }\n.bg-primary.medium-opacity {\n    background-color: rgba(2, 74, 136, 0.5) !important; }\n.bg-success {\n  background-color: #2d922d !important; }\n.bg-success.medium-opacity {\n    background-color: rgba(45, 146, 45, 0.5) !important; }\n.bg-info {\n  background-color: #248dad !important; }\n.bg-info.medium-opacity {\n    background-color: rgba(36, 141, 173, 0.5) !important; }\n.bg-warning {\n  background-color: #f79a17 !important; }\n.bg-warning.medium-opacity {\n    background-color: rgba(247, 154, 23, 0.5) !important; }\n.bg-danger {\n  background-color: #bf1725 !important; }\n.bg-danger.medium-opacity {\n    background-color: rgba(191, 23, 37, 0.5) !important; }\n.bg-main {\n  background-color: #282658 !important; }\n.bg-main.medium-opacity {\n    background-color: rgba(40, 38, 88, 0.5) !important; }\n.bg-dark {\n  background-color: black !important; }\n.bg-dark.medium-opacity {\n    background-color: rgba(0, 0, 0, 0.5) !important; }\n/*Card*/\n.card {\n  border: none;\n  border-radius: 0;\n  overflow: hidden;\n  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25); }\n.card .card-header {\n    background: #282658;\n    color: #fff;\n    line-height: 10px;\n    border-radius: 0;\n    border: none; }\n.card .card-header a {\n      color: #fff; }\n.card .card-header a:hover {\n        color: rgba(255, 255, 255, 0.8); }\n.card .card-footer {\n    background: #282658;\n    color: #fff;\n    line-height: 6px;\n    border-radius: 0;\n    border: none; }\n.card.card-outline-default {\n    background: transparent;\n    border: 1px solid #fff; }\n.card.card-primary {\n    background: #024a88; }\n.card.card-primary.medium-opacity {\n      background: rgba(2, 74, 136, 0.5); }\n.card.card-outline-primary {\n    background: transparent;\n    border: 1px solid #024a88; }\n.card.card-success {\n    background: #2d922d; }\n.card.card-success.medium-opacity {\n      background: rgba(45, 146, 45, 0.5); }\n.card.card-outline-success {\n    background: transparent;\n    border: 1px solid #2d922d; }\n.card.card-info {\n    background: #248dad; }\n.card.card-info.medium-opacity {\n      background: rgba(36, 141, 173, 0.5); }\n.card.card-outline-info {\n    background: transparent;\n    border: 1px solid #248dad; }\n.card.card-warning {\n    background: #f79a17; }\n.card.card-warning.medium-opacity {\n      background: rgba(247, 154, 23, 0.5); }\n.card.card-outline-warning {\n    background: transparent;\n    border: 1px solid #f79a17; }\n.card.card-danger {\n    background: #bf1725; }\n.card.card-danger.medium-opacity {\n      background: rgba(191, 23, 37, 0.5); }\n.card.card-outline-danger {\n    background: transparent;\n    border: 1px solid #bf1725; }\n.card.card-primary .card-header, .card.card-success .card-header, .card.card-info .card-header, .card.card-danger .card-header, .card.card-warning .card-header {\n    background: rgba(0, 0, 0, 0.4); }\n.card.card-primary .card-block, .card.card-success .card-block, .card.card-info .card-block, .card.card-danger .card-block, .card.card-warning .card-block {\n    color: #fff; }\n.card.card-primary .card-footer, .card.card-success .card-footer, .card.card-info .card-footer, .card.card-danger .card-footer, .card.card-warning .card-footer {\n    background: rgba(0, 0, 0, 0.2); }\n.card.overlay .card-img {\n    border-radius: 0;\n    -webkit-filter: brightness(100%);\n    -moz-filter: brightness(100%);\n    -ms-filter: brightness(100%);\n    -o-filter: brightness(100%);\n    filter: brightness(100%); }\n.card.overlay:hover .card-img {\n    -webkit-filter: brightness(80%);\n    -moz-filter: brightness(80%);\n    -ms-filter: brightness(80%);\n    -o-filter: brightness(80%);\n    filter: brightness(80%); }\n.card.overlay .card-img-overlay {\n    color: #fff; }\n.card.overlay .card-img-overlay.overlay-bottom {\n      top: auto; }\n.card.overlay .card-img-overlay.slide-up {\n      -webkit-transform: translateY(100%);\n      transform: translateY(100%); }\n.card.overlay .card-img-overlay.slide-down {\n      -webkit-transform: translateY(-100%);\n      transform: translateY(-100%); }\n.card.overlay .card-img-overlay.slide-left {\n      -webkit-transform: translateX(-100%);\n      transform: translateX(-100%); }\n.card.overlay .card-img-overlay.slide-right {\n      -webkit-transform: translateX(100%);\n      transform: translateX(100%); }\n.card.overlay .card-img-overlay.hover-opacity {\n      opacity: 0; }\n.card.overlay:hover .slide-up {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n.card.overlay:hover .slide-down {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n.card.overlay:hover .slide-left {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); }\n.card.overlay:hover .slide-right {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); }\n.card.overlay:hover .hover-opacity {\n    opacity: 1; }\n.card-img-top {\n  border-radius: 0; }\n@media (min-width: 576px) {\n  .card-columns {\n    -moz-column-count: 3;\n    -moz-column-gap: 1.25rem; } }\n/*Buttons*/\n.btn {\n  border-radius: 0; }\n.btn:focus {\n    outline: 0; }\n.btn:active {\n    outline: 0 !important; }\n.btn-rounded {\n  border-radius: 25rem; }\n.btn-xs {\n  padding: 0.2rem 0.4rem;\n  font-size: 0.715rem; }\n.btn-primary {\n  background: rgba(2, 74, 136, 0.8);\n  border-color: rgba(2, 74, 136, 0.8); }\n.btn-primary.medium-opacity {\n    background: rgba(2, 74, 136, 0.5);\n    border-color: rgba(2, 74, 136, 0.1); }\n.btn-primary:hover, .btn-primary:focus {\n    background: #024a88;\n    border-color: #024a88;\n    color: #fff; }\n.btn-primary:active {\n    background: rgba(2, 74, 136, 0.95) !important;\n    border-color: rgba(2, 74, 136, 0.95) !important; }\n.btn-success {\n  background: rgba(45, 146, 45, 0.8);\n  border-color: rgba(45, 146, 45, 0.8); }\n.btn-success.medium-opacity {\n    background: rgba(45, 146, 45, 0.5);\n    border-color: rgba(45, 146, 45, 0.1); }\n.btn-success:hover, .btn-success:focus {\n    background: #2d922d;\n    border-color: #2d922d;\n    color: #fff; }\n.btn-success:active {\n    background: rgba(45, 146, 45, 0.95) !important;\n    border-color: rgba(45, 146, 45, 0.95) !important; }\n.btn-info {\n  background: rgba(36, 141, 173, 0.8);\n  border-color: rgba(36, 141, 173, 0.8); }\n.btn-info.medium-opacity {\n    background: rgba(36, 141, 173, 0.5);\n    border-color: rgba(36, 141, 173, 0.1); }\n.btn-info:hover, .btn-info:focus {\n    background: #248dad;\n    border-color: #248dad;\n    color: #fff; }\n.btn-info:active {\n    background: rgba(36, 141, 173, 0.95) !important;\n    border-color: rgba(36, 141, 173, 0.95) !important; }\n.btn-warning {\n  background: rgba(247, 154, 23, 0.8);\n  border-color: rgba(247, 154, 23, 0.8); }\n.btn-warning.medium-opacity {\n    background: rgba(247, 154, 23, 0.5);\n    border-color: rgba(247, 154, 23, 0.1); }\n.btn-warning:hover, .btn-warning:focus {\n    background: #f79a17;\n    border-color: #f79a17;\n    color: #fff; }\n.btn-warning:active {\n    background: rgba(247, 154, 23, 0.95) !important;\n    border-color: rgba(247, 154, 23, 0.95) !important; }\n.btn-danger {\n  background: rgba(191, 23, 37, 0.8);\n  border-color: rgba(191, 23, 37, 0.8); }\n.btn-danger.medium-opacity {\n    background: rgba(191, 23, 37, 0.5);\n    border-color: rgba(191, 23, 37, 0.1); }\n.btn-danger:hover, .btn-danger:focus {\n    background: #bf1725;\n    border-color: #bf1725;\n    color: #fff; }\n.btn-danger:active {\n    background: rgba(191, 23, 37, 0.95) !important;\n    border-color: rgba(191, 23, 37, 0.95) !important; }\n.btn-dark {\n  background: rgba(0, 0, 0, 0.8);\n  border-color: rgba(0, 0, 0, 0.8);\n  color: #fff; }\n.btn-dark.medium-opacity {\n    background: rgba(0, 0, 0, 0.5);\n    border-color: rgba(0, 0, 0, 0.1); }\n.btn-dark:hover {\n    background: black;\n    border-color: black; }\n.btn-dark:active {\n    background: rgba(0, 0, 0, 0.95) !important;\n    border-color: rgba(0, 0, 0, 0.95) !important; }\n.btn-main {\n  background: rgba(40, 38, 88, 0.8);\n  border-color: rgba(40, 38, 88, 0.8);\n  color: #fff; }\n.btn-main.medium-opacity {\n    background: rgba(40, 38, 88, 0.5);\n    border-color: rgba(40, 38, 88, 0.1); }\n.btn-main:hover {\n    background: #282658;\n    border-color: #282658; }\n.btn-main:active {\n    background: rgba(40, 38, 88, 0.95) !important;\n    border-color: rgba(40, 38, 88, 0.95) !important; }\n.btn-outline-primary {\n  color: #024a88;\n  border-color: #024a88; }\n.btn-outline-primary:hover, .btn-outline-primary:focus {\n    color: #fff;\n    background: #024a88;\n    border-color: #024a88; }\n.btn-outline-primary:active, .btn-outline-primary.active {\n    color: #fff !important;\n    background: #024a88 !important;\n    border-color: #024a88 !important; }\n.btn-outline-success {\n  color: #2d922d;\n  border-color: #2d922d; }\n.btn-outline-success:hover, .btn-outline-success:focus {\n    color: #fff;\n    background: #2d922d;\n    border-color: #2d922d; }\n.btn-outline-success:active, .btn-outline-success.active {\n    color: #fff !important;\n    background: #2d922d !important;\n    border-color: #2d922d !important; }\n.btn-outline-info {\n  color: #248dad;\n  border-color: #248dad; }\n.btn-outline-info:hover, .btn-outline-info:focus {\n    color: #fff;\n    background: #248dad;\n    border-color: #248dad; }\n.btn-outline-info:active, .btn-outline-info.active {\n    color: #fff !important;\n    background: #248dad !important;\n    border-color: #248dad !important; }\n.btn-outline-warning {\n  color: #f79a17;\n  border-color: #f79a17; }\n.btn-outline-warning:hover, .btn-outline-warning:focus {\n    color: #fff;\n    background: #f79a17;\n    border-color: #f79a17; }\n.btn-outline-warning:active, .btn-outline-warning.active {\n    color: #fff !important;\n    background: #f79a17 !important;\n    border-color: #f79a17 !important; }\n.btn-outline-danger {\n  color: #bf1725;\n  border-color: #bf1725; }\n.btn-outline-danger:hover, .btn-outline-danger:focus {\n    color: #fff;\n    background: #bf1725;\n    border-color: #bf1725; }\n.btn-outline-danger:active, .btn-outline-danger.active {\n    color: #fff !important;\n    background: #bf1725 !important;\n    border-color: #bf1725 !important; }\n.btn-outline-dark {\n  color: #000;\n  border-color: #000;\n  background: transparent; }\n.btn-outline-dark:hover, .btn-outline-dark:focus {\n    color: #fff;\n    background: #000;\n    border-color: #000; }\n.btn-outline-main {\n  color: #282658;\n  border-color: #282658;\n  background: transparent; }\n.btn-outline-main:hover, .btn-outline-main:focus {\n    color: #fff;\n    background: #282658;\n    border-color: #282658; }\n.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle),\n.btn-group > .btn:last-child:not(:first-child), .btn-group > .dropdown-toggle:not(:first-child) {\n  border-radius: 0; }\n.form-control-sm,\n.input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  border-radius: 0; }\n.input-group > .input-group-prepend > .btn,\n.input-group > .input-group-prepend > .input-group-text,\n.input-group > .input-group-append:not(:last-child) > .btn,\n.input-group > .input-group-append:not(:last-child) > .input-group-text,\n.input-group > .input-group-append:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group > .input-group-append:last-child > .input-group-text:not(:last-child) {\n  border-radius: 0; }\n.input-group > .input-group-append > .btn,\n.input-group > .input-group-append > .input-group-text,\n.input-group > .input-group-prepend:not(:first-child) > .btn,\n.input-group > .input-group-prepend:not(:first-child) > .input-group-text,\n.input-group > .input-group-prepend:first-child > .btn:not(:first-child),\n.input-group > .input-group-prepend:first-child > .input-group-text:not(:first-child) {\n  border-radius: 0; }\n/*Tables*/\n.table-active,\n.table-active > th,\n.table-active > td {\n  background-color: rgba(0, 0, 0, 0.075); }\n.table-hover .table-active:hover {\n  background-color: rgba(0, 0, 0, 0.075); }\n.table-hover .table-active:hover > td,\n  .table-hover .table-active:hover > th {\n    background-color: rgba(0, 0, 0, 0.075); }\n.table-success,\n.table-success > th,\n.table-success > td {\n  background-color: #2d922d; }\n.table-hover .table-success:hover {\n  background-color: #277f27; }\n.table-hover .table-success:hover > td,\n  .table-hover .table-success:hover > th {\n    background-color: #277f27; }\n.table-info,\n.table-info > th,\n.table-info > td {\n  background-color: #248dad; }\n.table-hover .table-info:hover {\n  background-color: #207c98; }\n.table-hover .table-info:hover > td,\n  .table-hover .table-info:hover > th {\n    background-color: #207c98; }\n.table-warning,\n.table-warning > th,\n.table-warning > td {\n  background-color: #f79a17; }\n.table-hover .table-warning:hover {\n  background-color: #ec8e08; }\n.table-hover .table-warning:hover > td,\n  .table-hover .table-warning:hover > th {\n    background-color: #ec8e08; }\n.table-danger,\n.table-danger > th,\n.table-danger > td {\n  background-color: #bf1725; }\n.table-hover .table-danger:hover {\n  background-color: #a81421; }\n.table-hover .table-danger:hover > td,\n  .table-hover .table-danger:hover > th {\n    background-color: #a81421; }\n.table-reflow thead {\n  float: left; }\n.table-reflow tbody {\n  display: block;\n  white-space: nowrap; }\n.table-reflow th,\n.table-reflow td {\n  border-top: 1px solid #eceeef;\n  border-left: 1px solid #eceeef; }\n.table-reflow th:last-child,\n  .table-reflow td:last-child {\n    border-right: 1px solid #eceeef; }\n.table-reflow thead:last-child tr:last-child th,\n.table-reflow thead:last-child tr:last-child td,\n.table-reflow tbody:last-child tr:last-child th,\n.table-reflow tbody:last-child tr:last-child td,\n.table-reflow tfoot:last-child tr:last-child th,\n.table-reflow tfoot:last-child tr:last-child td {\n  border-bottom: 1px solid #eceeef; }\n.table-reflow tr {\n  float: left; }\n.table-reflow tr th,\n  .table-reflow tr td {\n    display: block !important;\n    border: 1px solid #eceeef; }\n/*Text*/\n.text-primary {\n  color: #024a88 !important; }\n.text-success {\n  color: #2d922d !important; }\n.text-info {\n  color: #248dad !important; }\n.text-warning {\n  color: #f79a17 !important; }\n.text-danger {\n  color: #bf1725 !important; }\n.text-muted {\n  color: #ccc !important; }\n.blockquote {\n  font-size: 1.2rem; }\n.blockquote-footer {\n  font-size: 70%; }\n/*Tabs*/\n.nav-tabs {\n  background-color: #ccc;\n  border: 1px solid #ccc; }\n.nav-tabs .nav-item .nav-link {\n    color: rgba(40, 38, 88, 0.8);\n    background-color: transparent;\n    border: none;\n    cursor: default; }\n.nav-tabs .nav-item .nav-link.active {\n      background-color: #fff;\n      color: #282658; }\n.nav-tabs .nav-item .nav-link:not(.active):hover {\n      background-color: transparent;\n      color: #282658;\n      cursor: pointer; }\n.nav-tabs.top {\n    border-top-left-radius: 0.3rem;\n    border-top-right-radius: 0.3rem; }\n.nav-tabs.bottom {\n    border-bottom-left-radius: 0.3rem;\n    border-bottom-right-radius: 0.3rem; }\n.nav-tabs.bottom .nav-item {\n      margin-bottom: 0;\n      margin-top: -1px; }\n.nav-tabs.bottom .nav-item .nav-link {\n        border-radius: 0 0 0.3rem 0.3rem; }\n.nav-tabs.tabs-primary {\n    background-color: rgba(2, 74, 136, 0.4);\n    border: 1px solid #024a88; }\n.nav-tabs.tabs-primary .nav-item .nav-link {\n      color: rgba(255, 255, 255, 0.8); }\n.nav-tabs.tabs-primary .nav-item .nav-link.active {\n        background-color: #024a88;\n        color: #fff; }\n.nav-tabs.tabs-primary .nav-item .nav-link:not(.active):hover {\n        color: #fff; }\n.nav-tabs.tabs-success {\n    background-color: rgba(45, 146, 45, 0.4);\n    border: 1px solid #2d922d; }\n.nav-tabs.tabs-success .nav-item .nav-link {\n      color: rgba(255, 255, 255, 0.8); }\n.nav-tabs.tabs-success .nav-item .nav-link.active {\n        background-color: #2d922d;\n        color: #fff; }\n.nav-tabs.tabs-success .nav-item .nav-link:not(.active):hover {\n        color: #fff; }\n.nav-tabs.tabs-info {\n    background-color: rgba(36, 141, 173, 0.4);\n    border: 1px solid #248dad; }\n.nav-tabs.tabs-info .nav-item .nav-link {\n      color: rgba(255, 255, 255, 0.8); }\n.nav-tabs.tabs-info .nav-item .nav-link.active {\n        background-color: #248dad;\n        color: #fff; }\n.nav-tabs.tabs-info .nav-item .nav-link:not(.active):hover {\n        color: #fff; }\n.nav-tabs.tabs-warning {\n    background-color: rgba(247, 154, 23, 0.4);\n    border: 1px solid #f79a17; }\n.nav-tabs.tabs-warning .nav-item .nav-link {\n      color: rgba(255, 255, 255, 0.8); }\n.nav-tabs.tabs-warning .nav-item .nav-link.active {\n        background-color: #f79a17;\n        color: #fff; }\n.nav-tabs.tabs-warning .nav-item .nav-link:not(.active):hover {\n        color: #fff; }\n.nav-tabs.tabs-danger {\n    background-color: rgba(191, 23, 37, 0.4);\n    border: 1px solid #bf1725; }\n.nav-tabs.tabs-danger .nav-item .nav-link {\n      color: rgba(255, 255, 255, 0.8); }\n.nav-tabs.tabs-danger .nav-item .nav-link.active {\n        background-color: #bf1725;\n        color: #fff; }\n.nav-tabs.tabs-danger .nav-item .nav-link:not(.active):hover {\n        color: #fff; }\n.tab-content {\n  position: relative;\n  z-index: 1;\n  border: 1px solid #ccc;\n  background: #fff; }\n.tab-content .tab-pane {\n    padding: 1rem; }\n.tab-content.tab-content-primary {\n    background-color: #024a88;\n    color: #fff;\n    border-color: #024a88; }\n.tab-content.tab-content-success {\n    background-color: #2d922d;\n    color: #fff;\n    border-color: #2d922d; }\n.tab-content.tab-content-info {\n    background-color: #248dad;\n    color: #fff;\n    border-color: #248dad; }\n.tab-content.tab-content-warning {\n    background-color: #f79a17;\n    color: #fff;\n    border-color: #f79a17; }\n.tab-content.tab-content-danger {\n    background-color: #bf1725;\n    color: #fff;\n    border-color: #bf1725; }\n.tab-content.top {\n    border-top: none; }\n.tab-content.bottom {\n    border-bottom: none; }\n.vertical-tabs .nav {\n  padding-right: 0;\n  overflow: hidden;\n  background-color: #ccc;\n  border: 1px solid #ccc; }\n.vertical-tabs .nav.left {\n    border-top-left-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem;\n    border-right: none;\n    margin-right: -1px;\n    z-index: 2; }\n.vertical-tabs .nav.right {\n    border-top-right-radius: 0.25rem;\n    border-bottom-right-radius: 0.25rem;\n    border-left: none;\n    margin-left: -1px;\n    z-index: 2; }\n.vertical-tabs .nav .nav-item .nav-link {\n    color: rgba(40, 38, 88, 0.8);\n    background-color: transparent;\n    border-radius: 0;\n    cursor: default; }\n.vertical-tabs .nav .nav-item .nav-link.active {\n      background-color: #fff; }\n.vertical-tabs .nav .nav-item .nav-link:not(.active):hover {\n      background-color: transparent;\n      color: #282658;\n      cursor: pointer; }\n.vertical-tabs .nav .nav-item .nav-link.disabled {\n      color: rgba(40, 38, 88, 0.6);\n      cursor: not-allowed !important; }\n/*ALERTS*/\n.alert.alert-success {\n  background-color: #2d922d;\n  border-color: #2d922d;\n  color: #fff; }\n.alert.alert-success.medium-opacity {\n    background: rgba(45, 146, 45, 0.5);\n    border-color: rgba(45, 146, 45, 0.6); }\n.alert.alert-info {\n  background-color: #248dad;\n  border-color: #248dad;\n  color: #fff; }\n.alert.alert-info.medium-opacity {\n    background-color: rgba(36, 141, 173, 0.5);\n    border-color: rgba(36, 141, 173, 0.6); }\n.alert.alert-warning {\n  background-color: #f79a17;\n  border-color: #f79a17;\n  color: #fff; }\n.alert.alert-warning.medium-opacity {\n    background-color: rgba(247, 154, 23, 0.5);\n    border-color: rgba(247, 154, 23, 0.6); }\n.alert.alert-danger {\n  background-color: #bf1725;\n  border-color: #bf1725;\n  color: #fff; }\n.alert.alert-danger.medium-opacity {\n    background-color: rgba(191, 23, 37, 0.5);\n    border-color: rgba(191, 23, 37, 0.6); }\n/* MODALS */\n.modal {\n  z-index: 99999;\n  padding-top: 10%; }\n.modal-dialog .modal-content {\n  color: #000; }\n.modal-dialog .modal-content .modal-header {\n    border-top-left-radius: 0.2rem;\n    border-top-right-radius: 0.2rem;\n    padding: 10px 15px; }\n.modal-dialog .modal-content .modal-header.modal-primary {\n      color: #fff;\n      background-color: #024a88; }\n.modal-dialog .modal-content .modal-header.modal-success {\n      color: #fff;\n      background-color: #2d922d; }\n.modal-dialog .modal-content .modal-header.modal-info {\n      color: #fff;\n      background-color: #248dad; }\n.modal-dialog .modal-content .modal-header.modal-warning {\n      color: #fff;\n      background-color: #f79a17; }\n.modal-dialog .modal-content .modal-header.modal-danger {\n      color: #fff;\n      background-color: #bf1725; }\n.modal-dialog .modal-content .modal-header i {\n      margin-right: 10px; }\n.modal-dialog .modal-content .modal-footer {\n    padding: 10px 15px; }\n/*List Group*/\n.list-group .list-group-item {\n  border-radius: 0;\n  padding: 0.55rem 1.25rem;\n  color: rgba(0, 0, 0, 0.8); }\n.list-group .list-group-item.active {\n    color: rgba(255, 255, 255, 0.9);\n    background-color: #024a88;\n    border-color: #024a88; }\n.list-group .list-group-item.active:hover, .list-group .list-group-item.active:focus {\n      color: #fff !important; }\n.list-group .list-group-item.disabled {\n    color: #818a91;\n    background-color: #ddd; }\n.list-group .list-group-item:not(.disabled):focus {\n    color: #000; }\n.list-group .list-group-item.list-group-item-primary {\n    color: #fff;\n    background-color: #024a88; }\n.list-group .list-group-item.list-group-item-success {\n    color: #fff;\n    background-color: #2d922d; }\n.list-group .list-group-item.list-group-item-info {\n    color: #fff;\n    background-color: #248dad; }\n.list-group .list-group-item.list-group-item-warning {\n    color: #fff;\n    background-color: #f79a17; }\n.list-group .list-group-item.list-group-item-danger {\n    color: #fff;\n    background-color: #bf1725; }\n/*Forms*/\n.has-success .form-control-success {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%232d922d' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\"); }\n.has-success .form-control {\n  border-color: rgba(45, 146, 45, 0.8); }\n.has-success .form-control:focus {\n    box-shadow: none;\n    border-color: rgba(45, 146, 45, 0.5); }\n.has-success .form-control-feedback, .has-success .form-control-label, .has-success .form-check-label, .has-success .form-check-inline, .has-success .custom-control {\n  color: #2d922d; }\n.has-warning .form-control-warning {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23f79a17' d='M4.4 5.324h-.8v-2.46h.8zm0 1.42h-.8V5.89h.8zM3.76.63L.04 7.075c-.115.2.016.425.26.426h7.397c.242 0 .372-.226.258-.426C6.726 4.924 5.47 2.79 4.253.63c-.113-.174-.39-.174-.494 0z'/%3E%3C/svg%3E\"); }\n.has-warning .form-control {\n  border-color: rgba(247, 154, 23, 0.8); }\n.has-warning .form-control:focus {\n    box-shadow: none;\n    border-color: rgba(247, 154, 23, 0.5); }\n.has-warning .form-control-feedback, .has-warning .form-control-label, .has-warning .form-check-label, .has-warning .form-check-inline, .has-warning .custom-control {\n  color: #f79a17; }\n.has-danger .form-control-danger {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23bf1725' viewBox='-2 -2 7 7'%3E%3Cpath stroke='%23d9534f' d='M0 0l3 3m0-3L0 3'/%3E%3Ccircle r='.5'/%3E%3Ccircle cx='3' r='.5'/%3E%3Ccircle cy='3' r='.5'/%3E%3Ccircle cx='3' cy='3' r='.5'/%3E%3C/svg%3E\"); }\n.has-danger .form-control {\n  border-color: rgba(191, 23, 37, 0.8); }\n.has-danger .form-control:focus {\n    box-shadow: none;\n    border-color: rgba(191, 23, 37, 0.5); }\n.has-danger .form-control-feedback, .has-danger .form-control-label, .has-danger .form-check-label, .has-danger .form-check-inline, .has-danger .custom-control {\n  color: #bf1725; }\n.form-control-danger, .form-control-success, .form-control-warning {\n  padding-right: 2.25rem;\n  background-repeat: no-repeat;\n  background-position: center right .5625rem;\n  background-size: 1.125rem 1.125rem; }\n.form-group label {\n  margin-bottom: 2px; }\n.help-block {\n  color: #555;\n  font-size: 12px; }\n.form-control {\n  border-radius: 0; }\n.form-control:focus {\n    border-color: rgba(85, 85, 85, 0.5); }\n.form-control.checking-field.ng-touched {\n    padding-right: 2.25rem;\n    background-repeat: no-repeat;\n    background-position: center right 0.625rem;\n    background-size: 1.25rem 1.25rem; }\n.form-control.checking-field.ng-touched.ng-invalid {\n      border-color: #bf1725;\n      background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23bf1725' viewBox='-2 -2 7 7'%3E%3Cpath stroke='%23d9534f' d='M0 0l3 3m0-3L0 3'/%3E%3Ccircle r='.5'/%3E%3Ccircle cx='3' r='.5'/%3E%3Ccircle cy='3' r='.5'/%3E%3Ccircle cx='3' cy='3' r='.5'/%3E%3C/svg%3E\"); }\n.form-control.checking-field.ng-touched.ng-valid {\n      border-color: #2d922d;\n      background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%232d922d' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\"); }\n.form-control-rounded {\n  border-radius: 16px; }\n.form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {\n  color: rgba(85, 85, 85, 0.7); }\n.input-group .input-group-addon {\n  padding: .3rem .7rem .3rem .7rem;\n  border-radius: 0; }\n.input-group-btn .btn {\n  padding: .36rem .9rem .36rem .9rem;\n  font-size: 17px; }\n.input-group .form-control:not(:first-child),\n.input-group-addon:not(:first-child),\n.input-group-btn:not(:first-child) > .btn,\n.input-group-btn:not(:first-child) > .btn-group > .btn,\n.input-group-btn:not(:first-child) > .dropdown-toggle,\n.input-group-btn:not(:last-child) > .btn:not(:first-child),\n.input-group-btn:not(:last-child) > .btn-group:not(:first-child) > .btn {\n  border-radius: 0; }\n.has-success .input-group-prepend,\n.has-success .input-group-append,\n.has-success .input-group-prepend .input-group-text,\n.has-success .input-group-append .input-group-text {\n  color: #2d922d;\n  border-color: #2d922d;\n  background-color: #eaf6ea; }\n.has-danger .input-group-prepend,\n.has-danger .input-group-append,\n.has-danger .input-group-prepend .input-group-text,\n.has-danger .input-group-append .input-group-text {\n  color: #bf1725;\n  border-color: #bf1725;\n  background-color: #fdf7f7; }\nselect.form-control:not([multiple]) option {\n  color: rgba(0, 0, 0, 0.8); }\nselect.form-control:not([size]):not([multiple]) {\n  height: calc(2.5rem - 5px); }\ninput[type=\"color\"].form-control {\n  padding: 0; }\n.form-inline .form-group input {\n  width: 100%; }\n.dropdown-menu {\n  padding-top: 0;\n  padding-bottom: 0;\n  border-radius: 0;\n  font-size: 14px;\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); }\n.dropdown-menu a {\n    color: #282658; }\n.dropdown-menu a:hover {\n      color: #fff;\n      background-color: #282658; }\n.dropdown-menu:before {\n    content: \" \";\n    position: absolute;\n    top: -12px;\n    left: 30px;\n    display: block;\n    width: 0;\n    height: 0;\n    border: 6px solid transparent;\n    border-bottom-color: #fff; }\n.dropdown-divider {\n  margin: 0.2rem 0; }\n.custom-control-label::before,\n.custom-control-label::after {\n  top: 0.2rem; }\n.custom-checkbox.checkbox-circle .custom-control-label::before,\n.custom-checkbox.checkbox-circle .custom-control-label::after {\n  border-radius: 50%; }\n.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {\n  background: rgba(85, 85, 85, 0.7); }\n.custom-checkbox .custom-control-input:focus ~ .custom-control-label::before {\n  border: 1px solid white;\n  box-shadow: 0 0 0 1px rgba(85, 85, 85, 0.7); }\n.custom-checkbox .custom-control-input.checkbox-primary:checked ~ .custom-control-label::before {\n  background: #024a88; }\n.custom-checkbox .custom-control-input.checkbox-primary:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 1px #024a88; }\n.custom-checkbox .custom-control-input.checkbox-success:checked ~ .custom-control-label::before {\n  background: #2d922d; }\n.custom-checkbox .custom-control-input.checkbox-success:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 1px #2d922d; }\n.custom-checkbox .custom-control-input.checkbox-info:checked ~ .custom-control-label::before {\n  background: #248dad; }\n.custom-checkbox .custom-control-input.checkbox-info:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 1px #248dad; }\n.custom-checkbox .custom-control-input.checkbox-warning:checked ~ .custom-control-label::before {\n  background: #f79a17; }\n.custom-checkbox .custom-control-input.checkbox-warning:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 1px #f79a17; }\n.custom-checkbox .custom-control-input.checkbox-danger:checked ~ .custom-control-label::before {\n  background: #bf1725; }\n.custom-checkbox .custom-control-input.checkbox-danger:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 1px #bf1725; }\n.custom-checkbox .custom-control-input.checkbox-main:checked ~ .custom-control-label::before {\n  background: #282658; }\n.custom-checkbox .custom-control-input.checkbox-main:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 1px #282658; }\n.custom-radio .custom-control-input:checked ~ .custom-control-label::before {\n  background: rgba(85, 85, 85, 0.7); }\n.custom-radio .custom-control-input:focus ~ .custom-control-label::before {\n  border: 1px solid white;\n  box-shadow: 0 0 0 1px rgba(85, 85, 85, 0.7); }\n.custom-radio .custom-control-input.radio-primary:checked ~ .custom-control-label::before {\n  background: #024a88; }\n.custom-radio .custom-control-input.radio-primary:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 1px #024a88; }\n.custom-radio .custom-control-input.radio-success:checked ~ .custom-control-label::before {\n  background: #2d922d; }\n.custom-radio .custom-control-input.radio-success:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 1px #2d922d; }\n.custom-radio .custom-control-input.radio-info:checked ~ .custom-control-label::before {\n  background: #248dad; }\n.custom-radio .custom-control-input.radio-info:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 1px #248dad; }\n.custom-radio .custom-control-input.radio-warning:checked ~ .custom-control-label::before {\n  background: #f79a17; }\n.custom-radio .custom-control-input.radio-warning:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 1px #f79a17; }\n.custom-radio .custom-control-input.radio-danger:checked ~ .custom-control-label::before {\n  background: #bf1725; }\n.custom-radio .custom-control-input.radio-danger:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 1px #bf1725; }\n.custom-radio .custom-control-input.radio-main:checked ~ .custom-control-label::before {\n  background: #282658; }\n.custom-radio .custom-control-input.radio-main:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 1px #282658; }\n/*Badge*/\n.badge {\n  font-weight: normal;\n  line-height: 1.4;\n  letter-spacing: 0.03em; }\n.badge.badge-primary {\n    background-color: #024a88; }\n.badge.badge-info {\n    background-color: #248dad; }\n.badge.badge-danger {\n    background-color: #bf1725; }\n.badge.badge-success {\n    background-color: #2d922d; }\n.badge.badge-warning {\n    color: #fff;\n    background-color: #f79a17; }\n.badge.badge-dark {\n    background-color: #000; }\n.badge.badge-main {\n    background-color: #282658;\n    color: #fff; }\ncode {\n  background-color: #e9ebee; }\n/*** Slim-scroll ***/\n.slimScrollBar, .slimScrollRail {\n  border-radius: 0px !important;\n  width: 4px !important; }\n/*** Pace ***/\n.pace .pace-progress {\n  background: #F4B092;\n  position: absolute;\n  height: 3px;\n  z-index: 0; }\n.pace .pace-activity {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  border-width: 1px;\n  right: auto;\n  width: 18px;\n  height: 18px;\n  border-top-color: #282658;\n  border-left-color: #282658; }\n/*** Full Calendar ***/\n.fc {\n  color: #242424; }\n.fc-toolbar button {\n  border-radius: 0 !important;\n  background: transparent;\n  border: 1px solid #555;\n  color: #242424;\n  text-shadow: none !important;\n  box-shadow: none !important; }\n.fc-toolbar button:hover, .fc-toolbar button:focus, .fc-toolbar button.fc-state-active {\n    background: #282658;\n    color: #fff; }\n.fc-toolbar button:first-letter {\n    text-transform: capitalize; }\n.fc-toolbar button.fc-state-disabled {\n    background: #ccc; }\n.fc-toolbar button.fc-state-disabled:hover {\n      cursor: not-allowed; }\n.fc-toolbar .fc-center h2 {\n  font-size: 22px;\n  margin-top: 3px; }\n.fc-event {\n  border: none; }\n.fc-day-grid-event {\n  padding: 2px 4px; }\n.fc-unthemed .fc-divider,\n.fc-unthemed .fc-popover .fc-header,\n.fc-unthemed .fc-list-heading td {\n  background: #ccc; }\n.fc-list-item:hover td {\n  background-color: #ccc; }\n@media (max-width: 543px) {\n  .fc .fc-toolbar > * > * {\n    float: none; }\n  .fc-toolbar .fc-left {\n    float: none; }\n  .fc-toolbar .fc-right {\n    float: none; }\n  .fc .fc-toolbar > * > :first-child {\n    vertical-align: top; } }\n.draggable {\n  cursor: move; }\n/*** Dropzone ***/\n.dropzone {\n  border: 2px dashed #ccc;\n  background: #f1f1f1;\n  min-height: 220px; }\n.dropzone .dz-preview .dz-remove {\n    font-size: 12px;\n    border: 1px solid #ccc;\n    border-radius: 10px;\n    color: #fff; }\n.dropzone .dz-preview.dz-image-preview {\n    background: transparent; }\n.dropzone .dz-preview .dz-error-mark, .dropzone .dz-preview .dz-success-mark {\n    margin-top: -38px; }\n/*** Froala editor ***/\n.fr-wrapper {\n  min-height: 300px; }\n/* perfect-scrollbar */\n.ps {\n  touch-action: auto;\n  overflow: hidden !important;\n  -ms-overflow-style: none;\n  position: relative; }\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  .ps {\n    overflow: auto !important; } }\n.ps__rail-x {\n  display: none;\n  opacity: 0;\n  transition: background-color .2s linear, opacity .2s linear;\n  -webkit-transition: background-color .2s linear, opacity .2s linear;\n  height: 7px;\n  bottom: 0px;\n  position: absolute; }\n.ps__rail-y {\n  display: none;\n  opacity: 0;\n  transition: background-color .2s linear, opacity .2s linear;\n  -webkit-transition: background-color .2s linear, opacity .2s linear;\n  width: 7px;\n  right: 0;\n  position: absolute; }\n.ps--active-x > .ps__rail-x,\n.ps--active-y > .ps__rail-y {\n  display: block;\n  background-color: transparent; }\n.ps:hover > .ps__rail-x,\n.ps:hover > .ps__rail-y,\n.ps--focus > .ps__rail-x,\n.ps--focus > .ps__rail-y,\n.ps--scrolling-x > .ps__rail-x,\n.ps--scrolling-y > .ps__rail-y {\n  opacity: 0.6; }\n.ps__rail-x:hover,\n.ps__rail-y:hover,\n.ps__rail-x:focus,\n.ps__rail-y:focus {\n  background-color: #eee;\n  opacity: 0.9; }\n.ps__thumb-x {\n  background-color: #aaa;\n  border-radius: 6px;\n  transition: background-color .2s linear, height .2s ease-in-out;\n  -webkit-transition: background-color .2s linear, height .2s ease-in-out;\n  height: 4px;\n  bottom: 1px;\n  position: absolute; }\n.ps__thumb-y {\n  background-color: #aaa;\n  border-radius: 6px;\n  transition: background-color .2s linear, width .2s ease-in-out;\n  -webkit-transition: background-color .2s linear, width .2s ease-in-out;\n  width: 4px;\n  right: 1px;\n  position: absolute; }\n.ps__rail-x:hover > .ps__thumb-x,\n.ps__rail-x:focus > .ps__thumb-x {\n  background-color: #999;\n  height: 7px; }\n.ps__rail-y:hover > .ps__thumb-y,\n.ps__rail-y:focus > .ps__thumb-y {\n  background-color: #999;\n  width: 7px; }\n@supports (-ms-overflow-style: none) {\n  .ps {\n    overflow: auto !important; } }\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  .ps {\n    overflow: auto !important; } }\n* {\n  font-family: 'Roboto', sans-serif;\n  font-weight: 400; }\nhtml {\n  height: 100%;\n  min-height: 100%; }\nbody {\n  font-family: \"Roboto\", sans-serif;\n  font-size: 14px;\n  color: #242424; }\nh1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {\n  font-weight: normal; }\nh1 small, h2 small, h3 small, h4 small, h5 small, h6 small, .h1 small, .h2 small, .h3 small, .h4 small, .h5 small, .h6 small {\n    font-size: 70%; }\n.transition {\n  transition: .3s; }\n.widget-controls {\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  right: 0;\n  padding: 10px 20px;\n  font-size: 14px; }\n.widget-controls a {\n    color: #fff;\n    margin-left: 7px;\n    line-height: 1;\n    vertical-align: top;\n    display: inline-block; }\n.widget-controls a:hover {\n      color: rgba(255, 255, 255, 0.7); }\n.widget-controls a.dropdown-toggle:after {\n      display: none; }\n.widget-controls ul.dropdown-menu {\n    min-width: 9rem;\n    padding: 0;\n    border-radius: 0; }\n.widget-controls ul.dropdown-menu li {\n      padding: 4px;\n      overflow: hidden; }\n.widget-controls ul.dropdown-menu li a {\n        color: #282658;\n        font-size: 13px;\n        width: 100%; }\n.widget-controls ul.dropdown-menu li:hover {\n        background-color: #282658; }\n.widget-controls ul.dropdown-menu li:hover a {\n        color: #fff; }\n.card.fullscreened .card-header {\n  line-height: 35px; }\n.card.fullscreened .card-header .widget-controls {\n    padding: 20px; }\n.card.fullscreened .card-header .widget-controls a {\n      margin-left: 12px; }\n.card.fullscreened .card-header .widget-controls a.setting {\n      display: none; }\n.card.fullscreened.card-primary {\n  background: #024a88; }\n.card.fullscreened.card-success {\n  background: #2d922d; }\n.card.fullscreened.card-info {\n  background: #248dad; }\n.card.fullscreened.card-warning {\n  background: #f79a17; }\n.card.fullscreened.card-danger {\n  background: #bf1725; }\n.scrolling {\n  height: 100%;\n  overflow-y: scroll;\n  padding-bottom: 60px; }\n.no-margin {\n  margin: 0; }\n.bottom-15 {\n  margin-bottom: 15px; }\n.bottom-30 {\n  margin-bottom: 30px; }\n.m-t-5 {\n  margin-top: 5px; }\n.mbm-20 {\n  margin-bottom: -20px; }\n.res-img {\n  width: 100%; }\n.chart-outher {\n  width: 55%;\n  margin: 0 auto; }\n.p-t-10 {\n  padding-top: 10%; }\n.o-visible {\n  overflow: visible; }\n.w-150 {\n  width: 150px; }\n.w-200 {\n  width: 200px; }\n.w-100p {\n  width: 100%; }\n.h-100p {\n  height: 100%; }\n@media (max-width: 543px) {\n  .chart-outher {\n    width: 100%; } }\n@media (min-width: 544px) and (max-width: 767px) {\n  .chart-outher {\n    width: 85%; } }\n@media (min-width: 992px) and (max-width: 1199px) {\n  .chart-outher {\n    width: 65%; } }\n.toast-container .toast {\n  opacity: 1 !important;\n  font-size: 1em !important; }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            // tslint:disable-next-line:component-selector
            selector: 'az-root',
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            template: "<router-outlet></router-outlet>",
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.config.ts":
/*!*******************************!*\
  !*** ./src/app/app.config.ts ***!
  \*******************************/
/*! exports provided: AppConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConfig", function() { return AppConfig; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.color */ "./src/app/app.color.ts");
/* harmony import */ var sass_to_js_js_src_sass_to_js_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sass-to-js/js/src/sass-to-js.js */ "./node_modules/sass-to-js/js/src/sass-to-js.js");
/* harmony import */ var sass_to_js_js_src_sass_to_js_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sass_to_js_js_src_sass_to_js_js__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppConfig = /** @class */ (function () {
    function AppConfig() {
        this.config = {
            name: 'Azimuth',
            title: 'Admin template based on Angular 6 and Bootstrap 4',
            version: '2.3.0',
            colors: {
                main: this.sassVariables['main-color'],
                default: this.sassVariables['default-color'],
                dark: this.sassVariables['dark-color'],
                primary: this.sassVariables['primary-color'],
                info: this.sassVariables['info-color'],
                success: this.sassVariables['success-color'],
                warning: this.sassVariables['warning-color'],
                danger: this.sassVariables['danger-color'],
                sidebarBgColor: this.sassVariables['sidebar-bg-color'],
                gray: this.sassVariables['gray'],
                grayLight: this.sassVariables['gray-light']
            }
        };
    }
    AppConfig.prototype.rgba = function (color, opacity) {
        if (color.indexOf('#') >= 0) {
            if (color.slice(1).length === 3) {
                color = '#' + color.slice(1) + '' + color.slice(1);
            }
            return new _app_color__WEBPACK_IMPORTED_MODULE_1__["Color"](new _app_color__WEBPACK_IMPORTED_MODULE_1__["HEX"](color)).setAlpha(opacity).toString();
        }
        else {
            console.log('incorrect color: ' + color);
            return 'rgba(255,255,255,0.7)';
        }
    };
    AppConfig = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], AppConfig);
    return AppConfig;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _app_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.config */ "./src/app/app.config.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var angular_2_local_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! angular-2-local-storage */ "./node_modules/angular-2-local-storage/dist/index.js");
/* harmony import */ var angular_2_local_storage__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(angular_2_local_storage__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _services_login_route_guard_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/login-route-guard.service */ "./src/app/services/login-route-guard.service.ts");
/* harmony import */ var _interceptors_token_interceptor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./interceptors/token.interceptor */ "./src/app/interceptors/token.interceptor.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                _app_routing__WEBPACK_IMPORTED_MODULE_4__["routing"],
                _angular_http__WEBPACK_IMPORTED_MODULE_7__["HttpModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                // Défini la durée des Toastr de toute l'application
                ngx_toastr__WEBPACK_IMPORTED_MODULE_11__["ToastrModule"].forRoot({
                    timeOut: 6000
                }),
                angular_2_local_storage__WEBPACK_IMPORTED_MODULE_8__["LocalStorageModule"].withConfig({
                    prefix: 'sinay-platform',
                    storageType: 'localStorage'
                })
            ],
            providers: [_app_config__WEBPACK_IMPORTED_MODULE_5__["AppConfig"], _services_login_route_guard_service__WEBPACK_IMPORTED_MODULE_9__["LoginRouteGuardService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_11__["ToastrService"],
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HTTP_INTERCEPTORS"],
                    useClass: _interceptors_token_interceptor__WEBPACK_IMPORTED_MODULE_10__["TokenInterceptor"],
                    multi: true
                }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: routes, routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_login_route_guard_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/login-route-guard.service */ "./src/app/services/login-route-guard.service.ts");


var routes = [
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
    {
        path: 'pages',
        canActivate: [_services_login_route_guard_service__WEBPACK_IMPORTED_MODULE_1__["LoginRouteGuardService"]],
        loadChildren: 'app/pages/pages.module#PagesModule'
    },
    { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes, {
    preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_0__["PreloadAllModules"]
});


/***/ }),

/***/ "./src/app/interceptors/token.interceptor.ts":
/*!***************************************************!*\
  !*** ./src/app/interceptors/token.interceptor.ts ***!
  \***************************************************/
/*! exports provided: TokenInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenInterceptor", function() { return TokenInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// src/app/auth/token.interceptor.ts



var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        if (this.userService.isSessionExpired()) {
            this.router.navigate(['/login', { logout: true }]);
        }
        var token = this.userService.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Auth-Token': "" + token
                }
            });
        }
        else {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            });
        }
        return next.handle(request);
    };
    TokenInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], TokenInterceptor);
    return TokenInterceptor;
}());



/***/ }),

/***/ "./src/app/services/login-route-guard.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/services/login-route-guard.service.ts ***!
  \*******************************************************/
/*! exports provided: LoginRouteGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginRouteGuardService", function() { return LoginRouteGuardService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var angular_2_local_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-2-local-storage */ "./node_modules/angular-2-local-storage/dist/index.js");
/* harmony import */ var angular_2_local_storage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular_2_local_storage__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginRouteGuardService = /** @class */ (function () {
    function LoginRouteGuardService(loginService, router, localStorageService) {
        this.loginService = loginService;
        this.router = router;
        this.localStorageService = localStorageService;
    }
    LoginRouteGuardService.prototype.canActivate = function (next, state) {
        var role = this.loginService.getRoles();
        var subscriptions = this.loginService.getSubscriptions();
        var url = state.url;
        // handle any redirects if a user isn't authenticated
        if (this.loginService.isSessionExpired()) {
            // redirect the user
            this.router.navigate(['/login']);
            return false;
        }
        if (!this.hasAccess(role, subscriptions, url)) {
            window.location.href =
                'https://platform.sinay.fr/platform/pages/home';
            return false;
        }
        return true;
    };
    /**
     * Vérifie si l'utilisateur à le droit d'accéder à la page cible
     * @param role Rôle de l'utilisateur
     * @param subscriptions Abonnements de l'utilisateur
     * @param url URL de la page cible
     */
    LoginRouteGuardService.prototype.hasAccess = function (role, subscriptions, url) {
        // Prend en charge toutes les redirections selon le rôle et les abonnements de l'utilisateur
        if (role) {
            for (var i = 0; i < role.length; i++) {
                if (role[i].authority === 'ROLE_ADMIN') {
                    return true;
                }
                if (role[i].authority === 'ROLE_SINAY') {
                    return true;
                }
                if (role[i].authority === 'ROLE_CUSTOMER') {
                    for (var y = 0; y < subscriptions.length; y++) {
                        if (subscriptions[y].application.name === 'APPLICATION_NEWS_CATCHER') {
                            return true;
                        }
                    }
                    // vérifie les accès de l'utilisateur et le renvoi sur la page home ou non en fonction
                    return false;
                }
            }
        }
    };
    LoginRouteGuardService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], angular_2_local_storage__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"]])
    ], LoginRouteGuardService);
    return LoginRouteGuardService;
}());



/***/ }),

/***/ "./src/app/services/user.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/user.service.ts ***!
  \******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");
/* harmony import */ var angular_2_local_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-2-local-storage */ "./node_modules/angular-2-local-storage/dist/index.js");
/* harmony import */ var angular_2_local_storage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular_2_local_storage__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserService = /** @class */ (function () {
    function UserService(localStorageService) {
        this.localStorageService = localStorageService;
        if (UserService_1.token === null || UserService_1.user === null) {
            UserService_1.user = this.localStorageService.get('user');
            UserService_1.token = this.localStorageService.get('token');
            UserService_1.roles = this.localStorageService.get('roles');
            UserService_1.subscriptions = this.localStorageService.get('subscriptions');
        }
    }
    UserService_1 = UserService;
    /**
     * @description on envoie la classe utilisateur au webservice pour qu'il mette ses informations a jour
     * @param user
     */
    UserService.prototype.updateUser = function (user) {
        UserService_1.user = user;
        var saveUser = this.localStorageService.set('user', user);
        return saveUser !== null;
    };
    /**
     * @description l'on envoie la classe utilisateur, les roles et le token de l'utilisateur a un webservice pour qu'il sauvegarde
     * ses informations
     * @param user
     * @param token
     * @param roles
     * @param subscriptions
     */
    UserService.prototype.saveUser = function (user, token, roles, subscriptions) {
        UserService_1.token = token;
        UserService_1.user = user;
        UserService_1.roles = roles;
        UserService_1.subscriptions = subscriptions;
        var saveToken = this.localStorageService.set('token', token);
        var saveUser = this.localStorageService.set('user', user);
        var saveRoles = this.localStorageService.set('roles', roles);
        var saveSubscriptions = this.localStorageService.set('subscriptions', subscriptions);
        return saveToken && saveUser && saveRoles && saveSubscriptions;
    };
    /**
     * @description remove l'utilisateur dans la mémoire locale
     */
    UserService.prototype.removeUser = function () {
        UserService_1.user = null;
        UserService_1.token = null;
        UserService_1.roles = null;
        UserService_1.subscriptions = null;
        var removeUser = this.localStorageService.remove('user');
        var removeToken = this.localStorageService.remove('token');
        var removeRoles = this.localStorageService.remove('roles');
        var removesubscriptions = this.localStorageService.remove('subscriptions');
        return removeToken && removeUser && removeRoles && removesubscriptions;
    };
    /**
     * @description vérifie que le token dans la mémoire locale est toujours actif
     */
    UserService.prototype.isSessionExpired = function () {
        try {
            if (UserService_1.token === null || UserService_1.user === null) {
                return true;
            }
            var jwtHelper = new _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_2__["JwtHelperService"]();
            if (jwtHelper.isTokenExpired(UserService_1.token.toString())) {
                return true;
            }
            return false;
        }
        catch (ex) {
            return true;
        }
    };
    /**
     * @description récupére le token de l'utilisateur dans la mémoire locale
     */
    UserService.prototype.getToken = function () {
        return UserService_1.token;
    };
    /**
     * @description récupére les infos de l'utilisateur dans la mémoire locale
     */
    UserService.prototype.getUser = function () {
        return UserService_1.user;
    };
    /**
     * @description récupére les roles de l'utilisateur dans la mémoire locale
     */
    UserService.prototype.getRoles = function () {
        return UserService_1.roles;
    };
    /**
    * Renvoie les abonnements de l'utilisateur
    */
    UserService.prototype.getSubscriptions = function () {
        return UserService_1.subscriptions;
    };
    /**
     * @description vérifie que l'utilisateur a bien un role donnée en paramtéres
     * @param roleIn
     */
    UserService.prototype.hasRole = function (roleIn) {
        if (!roleIn) {
            return false;
        }
        if (UserService_1.roles === null) {
            return false;
        }
        if (roleIn === 'ROLE_ANY') {
            return true;
        }
        if (UserService_1 === null || UserService_1.roles === null) {
            return false;
        }
        for (var _i = 0, _a = UserService_1.roles; _i < _a.length; _i++) {
            var role = _a[_i];
            if (roleIn === role['authority']) {
                return true;
            }
        }
        return false;
    };
    /**
     * @description renvoie a la page d'acceuil
     */
    UserService.prototype.getDefaultPath = function () {
        return '/pages';
    };
    UserService.token = null;
    UserService.user = null;
    UserService.roles = [];
    UserService.subscriptions = [];
    UserService = UserService_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [angular_2_local_storage__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"]])
    ], UserService);
    return UserService;
    var UserService_1;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    server: 'https://app-twitter.dev.sinay.fr',
    urlDjango: 'http://localhost:8000/',
    elasticSearchServer: 'http://localhost:9500/twitter-learning-',
    urlLoginIframe: 'https://platform.dev.sinay.fr/account/auth/login',
    urlLogoutIframe: 'https://platform.dev.sinay.fr/account/auth/logout'
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\f.danselme\Documents\djangoTwitter\front\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map