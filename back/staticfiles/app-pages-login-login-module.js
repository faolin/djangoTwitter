(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-pages-login-login-module"],{

/***/ "./src/app/models/app-constants.ts":
/*!*****************************************!*\
  !*** ./src/app/models/app-constants.ts ***!
  \*****************************************/
/*! exports provided: AppConstants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConstants", function() { return AppConstants; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppConstants = /** @class */ (function () {
    function AppConstants() {
        this.TOKEN_HEADER = 'X-Auth-Token';
        this.DATA = 'DATA';
        this.DATA_LENGTH = 'DATA_LENGTH';
        this.ERROR = 'ERROR';
        this.UPDATE = 'UPDATE';
        this.REGISTRED = 'REGISTRED';
        this.EXIST_EMAIL = 'EXIST_EMAIL';
        this.USER = 'USER';
        this.ROLES = 'ROLES';
        this.USER_DETAILS = 'USER_DETAILS';
        this.TOKEN = 'TOKEN';
        this.MESSAGE = 'MESSAGE';
        this.MESSAGE_ERROR = 'MESSAGE_ERROR';
        this.CODE_ERROR = 'CODE_ERROR';
        this.TIMESTAMPS = 'TIMESTAMPS';
        this.SUBSCRIPTIONS = 'SUBSCRIPTIONS';
        this.APPLICATION_SINAY_PLATFORM = 'APPLICATION_SINAY_PLATFORM';
        this.APPLICATION_CATALOG = 'APPLICATION_CATALOG';
        this.APPLICATION_CABLE = 'APPLICATION_CABLE';
        this.APPLICATION_TWITTER = 'APPLICATION_TWITTER';
        this.WISH_LIST = 'WISH_LIST';
        this.WISH = 'WISH';
        this.APPLICATION_JSON = 'application/json';
        this.TYPE_DATA_SET = 'DATA_SET';
        this.TYPE_PACKAGE = 'PACKAGE';
    }
    AppConstants = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        })
    ], AppConstants);
    return AppConstants;
}());



/***/ }),

/***/ "./src/app/pages/login/login.component.html":
/*!**************************************************!*\
  !*** ./src/app/pages/login/login.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div\n  style=\"height: 100vh; overflow: hidden; border-width: 0px; padding: 0px; margin: 0px;\"\n  id=\"logout\"\n>\n  <iframe\n    name=\"the_iframe\"\n    [src]=\"this.urlLoginIframe | safe2\"\n    id=\"the_iframe\"\n    frameborder=\"0\"\n    marginheight=\"0\"\n    marginwidth=\"0\"\n    width=\"100%\"\n    height=\"100%\"\n    scrolling=\"no\"\n    allowfullscreen=\"yes\"\n    allowvr=\"yes\"\n  ></iframe>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/login/login.component.scss":
/*!**************************************************!*\
  !*** ./src/app/pages/login/login.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/**** Colors (recommended use HEX colors) ****/\n/**** App roots ****/\n/**** General ****/\n/**** Navbar ****/\n/**** Sidebar ****/\n/**** Progress ****/\n/**** Fonts ****/\n/**** Social icons ****/\nbody::after {\n  content: '{\"main-color\":\"#282658\",\"default-color\":\"#fff\",\"dark-color\":\"#000\",\"primary-color\":\"#024a88\",\"success-color\":\"#2d922d\",\"warning-color\":\"#f79a17\",\"danger-color\":\"#bf1725\",\"info-color\":\"#248dad\",\"sidebar-bg-color\":\"#282658\",\"gray\":\"#555\",\"gray-light\":\"#ccc\"}';\n  display: none; }\nbody {\n  height: 100% !important; }\n.container-fluid {\n  height: 100% !important; }\n.app-row {\n  height: 100% !important; }\n.main-wrapper {\n  padding: 0 !important; }\n@media (min-height: 800px) {\n  .login-container {\n    padding-bottom: 200px; } }\n.login-container {\n  top: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  z-index: 9; }\n.login-container .card {\n    padding: 15px; }\n.login-container .card .btn-link {\n      padding: 0; }\n.login-container .card .btn-link.forgot {\n        font-size: 14px; }\n.login-container .card .btn-link:hover {\n        color: #282658; }\n.auth-sep {\n  margin-top: 32px;\n  margin-bottom: 24px;\n  line-height: 20px;\n  font-size: 15px;\n  text-align: center;\n  display: block;\n  position: relative; }\n.auth-sep > span {\n    display: table-cell;\n    width: 30%;\n    white-space: nowrap;\n    padding: 0 14px;\n    color: #555; }\n.auth-sep > span > span {\n      margin-top: -11px;\n      display: block;\n      font-weight: 300; }\n.auth-sep:before, .auth-sep:after {\n    border-top: solid 1px #ccc;\n    content: \"\";\n    height: 1px;\n    width: 35%;\n    display: table-cell; }\n.login-help {\n  margin: 0;\n  padding: 0; }\n.login-help li {\n    list-style: none;\n    display: inline-block;\n    margin-left: 10px; }\n.login-help li:first-child {\n      margin-left: 0; }\n.login-help li i {\n      cursor: pointer;\n      transition: all 0.1s ease;\n      color: #fff;\n      padding: 9px 9px 6px 9px;\n      font-size: 12px;\n      background-color: #282658; }\n.login-help li i.socicon-facebook {\n        background-color: #3b5998; }\n.login-help li i.socicon-twitter {\n        background-color: #55acee; }\n.login-help li i.socicon-google {\n        background-color: #dd4b39; }\n.login-help li i:hover {\n        opacity: 0.9; }\n.login-img {\n  width: 250px; }\n.login-page::before {\n  content: '';\n  width: 100%;\n  height: 100%;\n  display: block;\n  z-index: -1;\n  background: url(\"/assets/img/login/bg_sinay_login.jpg\");\n  background-size: cover;\n  /*  -webkit-filter: blur(10px);\n    filter: blur(10px);*/\n  z-index: 1;\n  position: absolute;\n  top: 0;\n  right: 0; }\n"

/***/ }),

/***/ "./src/app/pages/login/login.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/login/login.component.ts ***!
  \************************************************/
/*! exports provided: SafePipe2, LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SafePipe2", function() { return SafePipe2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _models_app_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../models/app-constants */ "./src/app/models/app-constants.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SafePipe2 = /** @class */ (function () {
    function SafePipe2(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe2.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    SafePipe2 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'safe2' }),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["DomSanitizer"]])
    ], SafePipe2);
    return SafePipe2;
}());

var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, userService, renderer, route, appConstants) {
        this.router = router;
        this.userService = userService;
        this.renderer = renderer;
        this.route = route;
        this.appConstants = appConstants;
        this.user = null;
        this.token = null;
        this.roles = null;
        this.subscriptions = null;
        this.urlLoginIframe = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urlLoginIframe;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Capture the session ID if available
        this.route.params.subscribe(function (params) {
            var logout = params['logout'];
            if (logout !== undefined && logout === 'true') {
                console.error('log out request .....');
                _this.userService.removeUser();
                _this.urlLoginIframe = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urlLogoutIframe;
            }
        });
        var global = this.renderer.listen('window', 'message', function (evt) {
            // console.log('Clicking the document', evt);
            if (evt.data[0] !== 'authentication') {
                return;
            }
            var data = JSON.parse(evt.data[1]);
            if (typeof window.localStorage !== 'undefined') {
                // Code for localStorage/sessionStorage.
                /*localStorage.setItem('authentication.token', data[this.appConstants.TOKEN]);
                localStorage.setItem(
                  'authentication.roles',
                  JSON.stringify(data[this.appConstants.ROLES])
                );
                localStorage.setItem(
                  'authentication.user',
                  JSON.stringify(data[this.appConstants.USER])
                );*/
                _this.loginSuccessful(data);
            }
            else {
                // Sorry! No Web Storage support..
                console.error('Sorry! No Web Storage support..', Storage);
            }
        });
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        document.getElementById('preloader').style['display'] = 'none';
    };
    LoginComponent.prototype.loginSuccessful = function (data) {
        console.log(data);
        if (data[this.appConstants.USER]) {
            this.user = data[this.appConstants.USER];
        }
        if (data[this.appConstants.TOKEN]) {
            this.token = data[this.appConstants.TOKEN];
        }
        if (data[this.appConstants.ROLES]) {
            this.roles = data[this.appConstants.ROLES];
        }
        if (data[this.appConstants.SUBSCRIPTIONS]) {
            this.subscriptions = data[this.appConstants.SUBSCRIPTIONS];
        }
        var save = this.userService.saveUser(this.user, this.token, this.roles, this.subscriptions);
        this.router.navigate([this.userService.getDefaultPath()]);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('the_iframe'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], LoginComponent.prototype, "iframe", void 0);
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/pages/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/pages/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _models_app_constants__WEBPACK_IMPORTED_MODULE_4__["AppConstants"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/pages/login/login.module.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/login/login.module.ts ***!
  \*********************************************/
/*! exports provided: routes, LoginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login.component */ "./src/app/pages/login/login.component.ts");
/* harmony import */ var _theme_components_spinner_spinner_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../theme/components/spinner/spinner.module */ "./src/app/theme/components/spinner/spinner.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    { path: '', component: _login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"], pathMatch: 'full' }
];
var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _theme_components_spinner_spinner_module__WEBPACK_IMPORTED_MODULE_5__["SpinnerModule"],
            ],
            declarations: [_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"], _login_component__WEBPACK_IMPORTED_MODULE_4__["SafePipe2"]]
        })
    ], LoginModule);
    return LoginModule;
}());



/***/ })

}]);
//# sourceMappingURL=app-pages-login-login-module.js.map