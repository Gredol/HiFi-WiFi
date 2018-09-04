webpackJsonp([1],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecondPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_communicationService__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* enableProdMode */])();
/**
 * Generated class for the SecondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SecondPage = /** @class */ (function () {
    function SecondPage(navCtrl, navParams, storage, http, ws) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.ws = ws;
        //fetcham link
        this.link = navParams.get("data");
        //fetcham komando
        this.command = navParams.get("command");
        //izpis test
        console.log(this.command);
        console.log(this.link);
        //fetcham iz  storage
        this.storage.get("MyStorage").then(function (data) {
            console.log(data);
            if (data != null) {
                //ce je link undefined ga ne bo dal v array ki izrise seznam linkov
                if (_this.link != undefined) {
                    //ce je play ga da na 1 mesto, če commanda ni play ga da na konec
                    if (_this.command == "play") {
                        data.splice(0, 0, _this.link);
                    }
                    else {
                        data.push(_this.link);
                    }
                }
                //shranem podatke v storage
                _this.storage.set("MyStorage", data);
            }
            else {
                //ce je link undefined ga ne bo dal v array ki izrise seznam
                if (_this.link != undefined) {
                    //ce je komanda play ga da na index 0, cene pa na dno quja
                    if (_this.command == "play") {
                        //ce je play ga da na 1 mesto, če commanda ni play ga da na konec
                        _this.ObjectLinks.splice(0, 0, _this.link);
                    }
                    else {
                        _this.ObjectLinks.push(_this.link);
                    }
                }
                _this.storage.set("MyStorage", _this.ObjectLinks);
            }
            _this.ObjectLinks = data;
            if (_this.command == "pause") {
                console.log("0 index: " + _this.ObjectLinks[0]);
                _this.sendData = {
                    link: _this.ObjectLinks[0],
                    command: "pause"
                };
            }
            else {
                _this.sendData = {
                    link: _this.link,
                    command: _this.command
                };
            }
            console.log("Send data: " + _this.sendData);
            _this.json = JSON.stringify(_this.sendData);
            console.log(_this.json);
        });
        this.ObjectLinks = [];
    }
    SecondPage.prototype.ionViewDidLoad = function () { };
    //updata indexe na seznamu, če prestavlaš linke gor dol
    SecondPage.prototype.reorderItem = function (indexes) {
        this.ObjectLinks = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* reorderArray */])(this.ObjectLinks, indexes);
        //test
        console.log("izpisujem linke");
        console.log(this.ObjectLinks);
        //si zapomne indexe v arrayu da jih naslednic pravilno prikaze ce spremenimo vrstni red
        this.storage.set("MyStorage", this.ObjectLinks);
        //WEBSOCKET
        //zapakiram sporocilo
        var msg = JSON.stringify({
            command: "queue",
            p1: this.ObjectLinks
        });
        //poslem sporocilo na websocket
        this.ws.send(msg);
    };
    //remova specifičen link iz seznama
    SecondPage.prototype.remove = function (i) {
        console.log("brisem");
        this.ObjectLinks.splice(i, 1);
        console.log(this.ObjectLinks);
        //shranemo spremembe v storage
        this.storage.set("MyStorage", this.ObjectLinks);
        //WEBSOCKET
        //zapakiram sporocilo
        var msg = JSON.stringify({
            command: "queue",
            p1: this.ObjectLinks
        });
        //poslem sporocilo
        this.ws.send(msg);
    };
    SecondPage.prototype.launchFirstPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    SecondPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-second",template:/*ion-inline-start:"D:\Users\eXecutor\Desktop\pkp 17.08.2018\post\post\projekt\src\pages\second\second.html"*/'<!--\n  Generated template for the SecondPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="dark">\n    <ion-title>Playlist Of Youtube Links</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list reorder="true" (ionItemReorder)="reorderItem($event)">\n    <ion-item *ngFor="let links of ObjectLinks;let i = index">\n      <ion-icon ios="ios-remove-circle" md="md-remove-circle" color="danger" style="font-size:150%;" (click)="remove(i)"></ion-icon> {{links}}</ion-item>\n  </ion-list>\n\n  <!--FOOTER-->\n  <ion-footer>\n    <ion-toolbar>\n      <ion-grid class="button-group">\n        <ion-row>\n          <ion-col style="width: 50%;text-align:center;">\n            <ion-icon ios="ios-options" md="md-options" style="font-size:35px;" (click)="launchFirstPage()"></ion-icon>\n          </ion-col>\n          <ion-col style="width: 50%;text-align:center;">\n            <ion-icon ios="ios-musical-notes" md="md-musical-notes" style="font-size:35px;"></ion-icon>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-toolbar>\n  </ion-footer>\n</ion-content>'/*ion-inline-end:"D:\Users\eXecutor\Desktop\pkp 17.08.2018\post\post\projekt\src\pages\second\second.html"*/
        })
        //To move the text to the left, press Shift+Tab.
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_4__services_communicationService__["a" /* WsService */]])
    ], SecondPage);
    return SecondPage;
}());

//# sourceMappingURL=second.js.map

/***/ }),

/***/ 115:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 115;

/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/second/second.module": [
		282,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 157;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(222);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_second_second__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_communicationService__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_7__pages_second_second__["a" /* SecondPage */]],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/second/second.module#SecondPageModule', name: 'SecondPage', segment: 'second', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["a" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_http__["b" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_7__pages_second_second__["a" /* SecondPage */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                Storage,
                __WEBPACK_IMPORTED_MODULE_11__services_communicationService__["a" /* WsService */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Users\eXecutor\Desktop\pkp 17.08.2018\post\post\projekt\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"D:\Users\eXecutor\Desktop\pkp 17.08.2018\post\post\projekt\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WsService = /** @class */ (function () {
    function WsService() {
        this.ws = new WebSocket("ws://localhost:3333");
    }
    //pošle na websocket
    WsService.prototype.send = function (params) {
        //ws.send();
        console.log("Simulate sending");
        this.ws.send(params);
    };
    WsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], WsService);
    return WsService;
}());

//# sourceMappingURL=communicationService.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__second_second__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_communicationService__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { HttpClientModule } from '@angular/common/http';





Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* enableProdMode */])();
var HomePage = /** @class */ (function () {
    /* CONSTRUCTOR */
    function HomePage(navCtrl, storage, http, ws, toast, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.http = http;
        this.ws = ws;
        this.toast = toast;
        this.loadingCtrl = loadingCtrl;
    }
    /* PLAY */
    HomePage.prototype.play = function (link) {
        this.presentLoading();
        /* WEBSOCKET */
        console.log("play command clicked");
        var msg = JSON.stringify({
            command: "play"
        });
        this.ws.send(msg);
        //cakam na odgovor
        //ce je uspesno napisem toast
        var text = "Successful";
        var duration = 1500;
        var position = "bottom";
        this.presentToast(text, duration, position);
        console.log("finished sending play command");
    };
    /* ADD TO PLAYLIST */
    HomePage.prototype.addToPlaylist = function (link) {
        console.log("addToPlaylist command clicked");
        //zapakiram sporocilo
        var msg = JSON.stringify({
            command: "add",
            p1: link
        });
        //poslem sporocilo na websocket
        this.ws.send(msg);
        //cakam na odgovor
        link = link || "No link Entered";
        //preveri če je prazen label
        if (link != "No link Entered") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__second_second__["a" /* SecondPage */], {
                data: link,
                command: "addToPlaylist"
            });
            //ce je uspesno napisem toast
            var text = "Successful";
            var duration = 1500;
            var position = "bottom";
            this.presentToast(text, duration, position);
            console.log("finished sending add command");
        }
    };
    /* NEXT */
    HomePage.prototype.next = function () {
        console.log("next command preapering to send ...");
        //zapakiram sporocilo
        var msg = JSON.stringify({
            command: "next"
        });
        //poslem na websocket
        this.ws.send(msg);
        //cakam na odgovor
        //ce je uspesno napisem toast
        var text = "Successful";
        var duration = 1500;
        var position = "bottom";
        this.presentToast(text, duration, position);
    };
    //nevem zakaj bi rabu tole
    HomePage.prototype.ionViewDidLoad = function () { };
    /* PAUSE */
    HomePage.prototype.pause = function () {
        console.log("pause command prepearing");
        //zapakiram sporocilo
        var msg = JSON.stringify({
            command: "pause"
        });
        //poslem na websocket
        this.ws.send(msg);
        //cakam na odgovor
        //ce je uspesno napisem toast
        var text = "Successful";
        var duration = 1500;
        var position = "bottom";
        this.presentToast(text, duration, position);
    };
    //music gumb, gre direktno na drugo stran
    HomePage.prototype.launchSecondPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__second_second__["a" /* SecondPage */]);
    };
    HomePage.prototype.presentToast = function (text, duration, position) {
        var toast = this.toast.create({
            message: text,
            duration: duration,
            position: position
        });
        toast.onDidDismiss(function () {
            console.log("Dismissed toast");
        });
        toast.present();
    };
    //loading function
    HomePage.prototype.presentLoading = function () {
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 1000
        });
        loader.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-home",template:/*ion-inline-start:"D:\Users\eXecutor\Desktop\pkp 17.08.2018\post\post\projekt\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <ion-title>\n      Music Application\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-item style="padding-bottom: 30px;">\n    <ion-label color="primary">\n      <ion-icon name="ios-link"></ion-icon>\n    </ion-label>\n    <ion-input type="link" placeholder=\'Youtube Link\' #link></ion-input>\n  </ion-item>\n  <!--tlele moram vstavit to kar sem zbrisal-->\n  <ion-card>\n    <ion-card-header color="default">\n      Options\n    </ion-card-header>\n    <ion-list (click)="play(link.value)">\n      <button ion-item>\n        <ion-icon ios="ios-play" md="md-play" item-start></ion-icon>\n        Play\n      </button>\n    </ion-list>\n  </ion-card>\n\n  <ion-card (click)="pause()">\n    <ion-list>\n      <button ion-item>\n        <ion-icon ios="ios-pause" md="md-pause" item-start></ion-icon>\n        Stop\n      </button>\n    </ion-list>\n  </ion-card>\n\n  <ion-card (click)="next()">\n    <ion-list>\n      <button ion-item>\n        <ion-icon ios="ios-fastforward" md="md-fastforward" item-start></ion-icon>\n        Next\n      </button>\n    </ion-list>\n  </ion-card>\n\n  <ion-card (click)="addToPlaylist(link.value)">\n    <ion-list>\n      <button ion-item>\n        <ion-icon ios="ios-add-circle" md="md-add-circle" item-start></ion-icon>\n        Add To Playlist\n      </button>\n    </ion-list>\n  </ion-card>\n\n  <ion-card>\n    <ion-list>\n      <!--FAB BUTTON-->\n      <ion-fab>\n        <button ion-fab>\n          <ion-icon ios="ios-apps" md="md-apps"></ion-icon>\n        </button>\n        <ion-fab-list side="right">\n          <button ion-fab>\n            <ion-icon ios="logo-facebook" md="logo-facebook"></ion-icon>\n          </button>\n          <button ion-fab>\n            <ion-icon ios="logo-twitter" md="logo-twitter"></ion-icon>\n          </button>\n        </ion-fab-list>\n      </ion-fab>\n    </ion-list>\n  </ion-card>\n\n\n  <!--FOOTER-->\n  <ion-footer>\n    <ion-toolbar>\n      <ion-grid class="button-group">\n        <ion-row>\n          <ion-col style="width: 50%;text-align:center;">\n            <ion-icon ios="ios-options" md="md-options" style="font-size:35px;"></ion-icon>\n          </ion-col>\n          <ion-col style="width: 50%;text-align:center;">\n            <ion-icon ios="ios-musical-notes" md="md-musical-notes" style="font-size:35px;" (click)="launchSecondPage()"></ion-icon>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-toolbar>\n  </ion-footer>\n</ion-content>'/*ion-inline-end:"D:\Users\eXecutor\Desktop\pkp 17.08.2018\post\post\projekt\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_5__services_communicationService__["a" /* WsService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[201]);
//# sourceMappingURL=main.js.map