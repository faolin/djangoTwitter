(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-pages-pages-module"],{

/***/ "./src/app/app.state.ts":
/*!******************************!*\
  !*** ./src/app/app.state.ts ***!
  \******************************/
/*! exports provided: AppState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppState", function() { return AppState; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppState = /** @class */ (function () {
    function AppState() {
        var _this = this;
        this._data = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this._dataStream$ = this._data.asObservable();
        this._subscriptions = new Map();
        this._dataStream$.subscribe(function (data) { return _this._onEvent(data); });
    }
    AppState.prototype.notifyDataChanged = function (event, value) {
        var current = this._data[event];
        if (current !== value) {
            this._data[event] = value;
            this._data.next({
                event: event,
                data: this._data[event]
            });
        }
    };
    AppState.prototype.subscribe = function (event, callback) {
        var subscribers = this._subscriptions.get(event) || [];
        subscribers.push(callback);
        this._subscriptions.set(event, subscribers);
    };
    AppState.prototype._onEvent = function (data) {
        var subscribers = this._subscriptions.get(data['event']) || [];
        subscribers.forEach(function (callback) {
            callback.call(null, data['data']);
        });
    };
    AppState = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], AppState);
    return AppState;
}());



/***/ }),

/***/ "./src/app/pages/pages.component.html":
/*!********************************************!*\
  !*** ./src/app/pages/pages.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"main-wrapper\" [ngClass]=\"{ 'menu-collapsed': isMenuCollapsed }\">\n      <div class=\"main\"><router-outlet></router-outlet></div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/pages.component.scss":
/*!********************************************!*\
  !*** ./src/app/pages/pages.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/**** Colors (recommended use HEX colors) ****/\n/**** App roots ****/\n/**** General ****/\n/**** Navbar ****/\n/**** Sidebar ****/\n/**** Progress ****/\n/**** Fonts ****/\n/**** Social icons ****/\nbody::after {\n  content: '{\"main-color\":\"#282658\",\"default-color\":\"#fff\",\"dark-color\":\"#000\",\"primary-color\":\"#024a88\",\"success-color\":\"#2d922d\",\"warning-color\":\"#f79a17\",\"danger-color\":\"#bf1725\",\"info-color\":\"#248dad\",\"sidebar-bg-color\":\"#282658\",\"gray\":\"#555\",\"gray-light\":\"#ccc\"}';\n  display: none; }\n/**** Colors (recommended use HEX colors) ****/\n/**** App roots ****/\n/**** General ****/\n/**** Navbar ****/\n/**** Sidebar ****/\n/**** Progress ****/\n/**** Fonts ****/\n/**** Social icons ****/\nbody::after {\n  content: '{\"main-color\":\"#282658\",\"default-color\":\"#fff\",\"dark-color\":\"#000\",\"primary-color\":\"#024a88\",\"success-color\":\"#2d922d\",\"warning-color\":\"#f79a17\",\"danger-color\":\"#bf1725\",\"info-color\":\"#248dad\",\"sidebar-bg-color\":\"#282658\",\"gray\":\"#555\",\"gray-light\":\"#ccc\"}';\n  display: none; }\nbody::before {\n  content: '';\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  background: #e9ebee;\n  z-index: -1; }\n.main-wrapper {\n  padding: 30px 40px 60px;\n  padding-top: 12px;\n  margin-top: 60px;\n  position: relative;\n  flex: 1;\n  overflow: hidden; }\n.main-wrapper.menu-collapsed {\n    margin-left: 50px; }\n.main {\n  height: 100%;\n  min-height: calc(100vh - 202px); }\n.footer {\n  padding-top: 20px;\n  padding-bottom: 10px; }\n.footer .footer-main {\n    display: inline-block; }\n.footer .footer-main .copyright {\n      color: #242424;\n      font-size: 14px; }\n.footer .footer-main .copyright a {\n        color: #282658; }\n.footer .footer-main .share {\n      padding-left: 5px;\n      margin: 0; }\n.footer .footer-main .share li {\n        list-style: none;\n        float: left;\n        margin-left: 10px; }\n.footer .footer-main .share li i {\n          cursor: pointer;\n          transition: all 0.1s ease;\n          color: white;\n          padding: 9px 9px 6px 9px;\n          font-size: 12px;\n          border-radius: 50%;\n          background-color: #282658; }\n.footer .footer-main .share li i.socicon-facebook {\n            background-color: #3b5998; }\n.footer .footer-main .share li i.socicon-twitter {\n            background-color: #55acee; }\n.footer .footer-main .share li i.socicon-instagram {\n            background-color: #8a3ab9; }\n.footer .footer-main .share li i.socicon-pinterest {\n            background-color: #c92228; }\n.footer .footer-main .share li i:hover {\n            opacity: 0.9; }\n.footer .created {\n    color: #242424;\n    font-size: 14px; }\n.footer .created i {\n      color: red; }\n.az-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  z-index: 8;\n  background: rgba(40, 38, 88, 0.2);\n  width: 100%;\n  height: 100%;\n  display: none; }\n@media (max-width: 544px) {\n  .main-wrapper, .main-wrapper.menu-collapsed {\n    margin-left: 0;\n    padding: 30px 20px 70px; }\n  .main {\n    min-height: calc(100vh - 240px); }\n  .az-overlay {\n    display: block; }\n  .footer .footer-main, .footer .created {\n    float: none; } }\n@media (min-width: 544px) and (max-width: 768px) {\n  .main-wrapper, .main-wrapper.menu-collapsed {\n    margin-left: 0; }\n  .az-overlay {\n    display: block; } }\n"

/***/ }),

/***/ "./src/app/pages/pages.component.ts":
/*!******************************************!*\
  !*** ./src/app/pages/pages.component.ts ***!
  \******************************************/
/*! exports provided: PagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesComponent", function() { return PagesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _app_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app.state */ "./src/app/app.state.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PagesComponent = /** @class */ (function () {
    function PagesComponent(_state, _location, router) {
        var _this = this;
        this._state = _state;
        this._location = _location;
        this.router = router;
        this.isMenuCollapsed = false;
        this._state.subscribe('menu.isCollapsed', function (isCollapsed) {
            _this.isMenuCollapsed = isCollapsed;
        });
    }
    PagesComponent.prototype.ngOnInit = function () {
        this.getCurrentPageName();
    };
    PagesComponent.prototype.getCurrentPageName = function () {
        /* const url = this._location.path();
         const hash = window.location.hash ? '#' : '';
         setTimeout(function() {
           const subMenu = jQuery('a[href="' + hash + url + '"]')
             .closest('li')
             .closest('ul');
           window.scrollTo(0, 0);
           subMenu.closest('li').addClass('sidebar-item-expanded');
           subMenu.slideDown(250);
         });*/
    };
    PagesComponent.prototype.hideMenu = function () {
        this._state.notifyDataChanged('menu.isCollapsed', true);
    };
    PagesComponent.prototype.ngAfterViewInit = function () {
        document.getElementById('preloader').style['display'] = 'none';
    };
    PagesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-pages',
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            template: __webpack_require__(/*! ./pages.component.html */ "./src/app/pages/pages.component.html"),
            styles: [__webpack_require__(/*! ./pages.component.scss */ "./src/app/pages/pages.component.scss")],
            providers: [_app_state__WEBPACK_IMPORTED_MODULE_2__["AppState"]]
        }),
        __metadata("design:paramtypes", [_app_state__WEBPACK_IMPORTED_MODULE_2__["AppState"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], PagesComponent);
    return PagesComponent;
}());



/***/ }),

/***/ "./src/app/pages/pages.module.ts":
/*!***************************************!*\
  !*** ./src/app/pages/pages.module.ts ***!
  \***************************************/
/*! exports provided: PagesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesModule", function() { return PagesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _pages_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages.routing */ "./src/app/pages/pages.routing.ts");
/* harmony import */ var _pages_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages.component */ "./src/app/pages/pages.component.ts");
/* harmony import */ var _theme_components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/components/navbar/navbar.component */ "./src/app/theme/components/navbar/navbar.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var PagesModule = /** @class */ (function () {
    function PagesModule() {
    }
    PagesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _pages_routing__WEBPACK_IMPORTED_MODULE_2__["routing"],
            ],
            declarations: [
                _pages_component__WEBPACK_IMPORTED_MODULE_3__["PagesComponent"],
                _theme_components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__["NavbarComponent"],
            ],
            providers: []
        })
    ], PagesModule);
    return PagesModule;
}());



/***/ }),

/***/ "./src/app/pages/pages.routing.ts":
/*!****************************************!*\
  !*** ./src/app/pages/pages.routing.ts ***!
  \****************************************/
/*! exports provided: routes, routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _pages_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages.component */ "./src/app/pages/pages.component.ts");


var routes = [
    {
        path: '',
        component: _pages_component__WEBPACK_IMPORTED_MODULE_1__["PagesComponent"],
        children: [
            { path: '', redirectTo: 'annotateTweets', pathMatch: 'full' },
            { path: 'annotateTweets', loadChildren: 'app/pages/annotate-tweets/annotate-tweets.module#AnnotateTweetModule',
                data: { breadcrumb: 'Annotate your tweets' } },
            { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule',
                data: { breadcrumb: 'See your model' } },
        ]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/theme/components/navbar/navbar.component.html":
/*!***************************************************************!*\
  !*** ./src/app/theme/components/navbar/navbar.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"nav az-navbar fixed-top\">\n    <a class=\"navbar-brand\" routerLink=\"/\" (click)=\"closeSubMenus()\">\n        <img src=\"assets/img/logo/az_logo_full.svg\" alt=\"\" class=\"d-md-block d-none\"> \n        <img src=\"assets/img/logo/az_logo.png\" alt=\"\" class=\"d-md-none\"> \n    </a>\n\n    <ul class=\"nav right-section\">\n        <li class=\"nav-item\">\n          <div class=\"dropdown float-right user-menu\">\n              <a class=\"dropdown-toggle user-link\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-expanded=\"false\">\n                  <span class=\"d-lg-inline d-none\">{{ email }}</span>\n              </a>\n\n              <ul class=\"dropdown-menu\">\n                  <a class=\"dropdown-item\" [routerLink]=\"['/login', { logout: true }]\"><i class=\"fa fa-power-off\"></i>Log out</a>\n              </ul>\n          </div>\n        </li>\n    </ul>\n</nav>"

/***/ }),

/***/ "./src/app/theme/components/navbar/navbar.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/theme/components/navbar/navbar.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/**** Colors (recommended use HEX colors) ****/\n/**** App roots ****/\n/**** General ****/\n/**** Navbar ****/\n/**** Sidebar ****/\n/**** Progress ****/\n/**** Fonts ****/\n/**** Social icons ****/\nbody::after {\n  content: '{\"main-color\":\"#282658\",\"default-color\":\"#fff\",\"dark-color\":\"#000\",\"primary-color\":\"#024a88\",\"success-color\":\"#2d922d\",\"warning-color\":\"#f79a17\",\"danger-color\":\"#bf1725\",\"info-color\":\"#248dad\",\"sidebar-bg-color\":\"#282658\",\"gray\":\"#555\",\"gray-light\":\"#ccc\"}';\n  display: none; }\n/**** Colors (recommended use HEX colors) ****/\n/**** App roots ****/\n/**** General ****/\n/**** Navbar ****/\n/**** Sidebar ****/\n/**** Progress ****/\n/**** Fonts ****/\n/**** Social icons ****/\nbody::after {\n  content: '{\"main-color\":\"#282658\",\"default-color\":\"#fff\",\"dark-color\":\"#000\",\"primary-color\":\"#024a88\",\"success-color\":\"#2d922d\",\"warning-color\":\"#f79a17\",\"danger-color\":\"#bf1725\",\"info-color\":\"#248dad\",\"sidebar-bg-color\":\"#282658\",\"gray\":\"#555\",\"gray-light\":\"#ccc\"}';\n  display: none; }\n.nav.az-navbar {\n  height: 60px;\n  align-items: center;\n  background-color: #282658; }\n.nav.az-navbar .navbar-brand {\n    width: 205px;\n    padding-top: 0;\n    font-size: 0;\n    margin-left: 10px; }\n.fixed-top {\n  z-index: 9999 !important; }\n#lines {\n  border-bottom: 7px double;\n  border-top: 2px solid;\n  border-color: rgba(255, 255, 255, 0.9);\n  content: \"\";\n  height: 3px;\n  width: 20px;\n  box-sizing: content-box;\n  cursor: pointer; }\n#lines:hover {\n    opacity: 0.8; }\n.app-search {\n  position: relative;\n  margin-left: 20px; }\n.app-search a {\n    position: absolute;\n    top: 3px;\n    right: 14px;\n    font-size: 16px;\n    color: rgba(255, 255, 255, 0.3); }\n.app-search .form-control {\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    font-size: 13px;\n    letter-spacing: 0.03em;\n    height: 30px;\n    color: #fff;\n    padding: 7px 40px 7px 20px;\n    background: rgba(255, 255, 255, 0.05);\n    box-shadow: none;\n    border-radius: 30px;\n    width: 190px; }\n.right-section {\n  position: absolute;\n  right: 10px; }\n.user-menu {\n  font-size: 14px; }\n.user-menu .dropdown-toggle::after {\n    display: none; }\n.user-menu .dropdown-menu {\n    right: 0;\n    top: auto !important;\n    left: auto !important;\n    margin-top: 10px;\n    padding-top: 0;\n    overflow: hidden;\n    border-radius: 0;\n    font-size: 14px;\n    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);\n    -webkit-transform: none !important;\n    transform: none !important; }\n.user-menu .dropdown-menu a {\n      color: #282658; }\n.user-menu .dropdown-menu a:hover {\n        color: #fff;\n        background-color: #282658; }\n.user-menu .dropdown-menu a i {\n        margin-right: 8px; }\n.user-link {\n  margin-right: 6px; }\n.user-link span {\n    color: #fff;\n    margin-left: 7px;\n    letter-spacing: 0.02em; }\n.user-link img {\n    width: 40px;\n    border-radius: 50%; }\n.user-link:hover, .user-link:focus {\n    text-decoration: none; }\n.user-info {\n  background-color: #282658;\n  padding: 8px;\n  text-align: center;\n  width: 240px;\n  margin-bottom: 5px; }\n.user-info img {\n    width: 100px;\n    margin-top: 5px;\n    border-radius: 50%; }\n.user-info p {\n    color: #ebebeb;\n    margin-top: 10px; }\n.user-info small {\n    display: block; }\n@media (max-width: 767px) {\n  .nav.az-navbar .navbar-brand {\n    width: auto; } }\n"

/***/ }),

/***/ "./src/app/theme/components/navbar/navbar.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/theme/components/navbar/navbar.component.ts ***!
  \*************************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app.state */ "./src/app/app.state.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(_state, router, userService) {
        var _this = this;
        this._state = _state;
        this.router = router;
        this.userService = userService;
        this.isMenuCollapsed = false;
        this.email = '';
        this._state.subscribe('menu.isCollapsed', function (isCollapsed) {
            _this.isMenuCollapsed = isCollapsed;
        });
    }
    NavbarComponent.prototype.ngOnInit = function () {
        if (!this.userService.isSessionExpired()) {
            this.email = this.userService.getUser().email.toString();
        }
    };
    NavbarComponent.prototype.closeSubMenus = function () {
        /* when using <az-sidebar> instead of <az-menu> uncomment this line */
        // this._sidebarService.closeAllSubMenus();
    };
    NavbarComponent.prototype.toggleMenu = function () {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    };
    NavbarComponent.prototype.logout = function () {
        localStorage.removeItem('sinay-app-twitter-user');
        this.router.navigate(['/login']);
    };
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-navbar',
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/theme/components/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.scss */ "./src/app/theme/components/navbar/navbar.component.scss")],
            providers: []
        }),
        __metadata("design:paramtypes", [_app_state__WEBPACK_IMPORTED_MODULE_1__["AppState"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ })

}]);
//# sourceMappingURL=app-pages-pages-module.js.map