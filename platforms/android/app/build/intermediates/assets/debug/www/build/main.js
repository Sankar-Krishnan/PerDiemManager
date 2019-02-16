webpackJsonp([0],{

/***/ 114:
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
webpackEmptyAsyncContext.id = 114;

/***/ }),

/***/ 155:
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
webpackEmptyAsyncContext.id = 155;

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__withdrawldetails_withdrawldetails__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
    function HomePage(navCtrl, sqlite, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.sqlite = sqlite;
        this.toastCtrl = toastCtrl;
        this.items = [];
        sqlite.create({
            name: 'data.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('create table if not exists deposits(rowid INTEGER PRIMARY KEY,amount integer, month datetime)', {}).then(function () {
                //this.presentToast('Created Deposit');
            }).catch(function (e) {
                _this.presentToast(e);
            });
            db.executeSql('create table if not exists withdrawls(rowid INTEGER PRIMARY KEY, amount integer, debitedamount decimal, conversioncharges decimal, month datetime,currencytype text, actualtotal decimal, debitedtotal decimal, difference decimal, conversionrate decimal)', {}).then(function () {
                //this.presentToast('Created Withdrawls');
            }).catch(function (e) {
                alert(JSON.stringify(e));
            });
            db.executeSql('create table if not exists misc(rowid INTEGER PRIMARY KEY,amount integer, desc text)', {}).then(function () {
                //this.presentToast('Created Deposit');
            }).catch(function (e) {
                _this.presentToast(e);
            });
            // db.executeSql('drop table settings', {}).then(() => {
            //     //this.presentToast('Created Deposit');
            // }).catch(e => {
            //     this.presentToast(e);
            // });
            db.executeSql('create table if not exists settings(rowid INTEGER PRIMARY KEY,startdate datetime,perdiem integer)', {}).then(function () {
                //this.presentToast('Created Deposit');
            }).catch(function (e) {
                _this.presentToast(e);
            });
        }).catch(function (e) { return _this.presentToast(e); });
    }
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.items = [];
        this.getData().then(function (resp) {
            for (var i = 0; i < resp.rows.length; i++) {
                //let dt = this.datePipe.transform(resp.rows.item(i).month, 'dd-MMM-yy'); 
                _this.items.push({ amount: resp.rows.item(i).amount, month: resp.rows.item(i).month, currencyType: resp.rows.item(i).currencytype, rowid: resp.rows.item(i).rowid });
            }
        });
    };
    HomePage.prototype.getData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then(function (db) {
                var query = "SELECT * FROM withdrawls";
                db.transaction(function (tx) {
                    tx.executeSql(query, [], function (tx, rs) {
                        resolve(rs);
                    }, function (tx, error) {
                        alert('SELECT error: ' + error.message);
                    });
                }).catch(function (e) { return alert(JSON.stringify(e)); });
            }).catch(function (e) { return _this.presentToast(e); });
        });
    };
    HomePage.prototype.editData = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__withdrawldetails_withdrawldetails__["a" /* WithdrawlDetailsPage */]);
    };
    HomePage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    HomePage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        //alert('Clicked');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__withdrawldetails_withdrawldetails__["a" /* WithdrawlDetailsPage */], {
            rowid: item.rowid
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/shankar/Projects/Ionic/MoneyManagement/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Withdrawls</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="editData()">\n            <ion-icon name="md-add-circle"></ion-icon>\n        </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-list>\n            <!-- <ion-item-sliding>\n \n                    <ion-item>\n                    Swipe me to the left\n                    </ion-item>\n                 \n                    <ion-item-options>\n                      <button danger (click)="removeItem()"><ion-icon trash></ion-icon> Delete</button>\n                    </ion-item-options>\n                  </ion-item-sliding> -->\n         <ion-item-sliding *ngFor="let item of items" >\n             <ion-item (click)="itemTapped($event, item)">\n                    ${{item.amount}} {{item.currencyType}}\n                    <div class="item-note" item-end>\n                        {{item.month | date: \'dd-MMM-yyyy\'}}\n                    </div>\n                    <ion-item-options>\n                            <button danger (click)="removeItem(item)"><ion-icon name="trash"></ion-icon> Delete</button>\n                    </ion-item-options>\n             </ion-item>\n        </ion-item-sliding> \n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/shankar/Projects/Ionic/MoneyManagement/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WithdrawlDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var WithdrawlDetailsPage = (function () {
    function WithdrawlDetailsPage(navCtrl, navParams, sqlite, toastCtrl, remoteService, datepipe) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.toastCtrl = toastCtrl;
        this.remoteService = remoteService;
        this.datepipe = datepipe;
        this.rowid = 0;
        this.amount = 0;
        this.debitedAmount = 0.0;
        this.converstionCharges = 0.0;
        this.actualTotal = 0.0;
        this.debitedTotal = 0.0;
        this.difference = 0.0;
        this.conversionRate = 0.0;
        var item = navParams.get('rowid');
        //alert(JSON.stringify(item));
        if (item != undefined) {
            this.rowid = item;
        }
    }
    WithdrawlDetailsPage.prototype.saveData = function () {
        var _this = this;
        if (this.validateData()) {
            this.actualTotal = 0.0;
            this.debitedTotal = 0.0;
            this.difference = 0.0;
            var dateWithdrawn = this.datepipe.transform(this.month, 'yyyy-MM-dd');
            ;
            if (this.currencyType == "MXN") {
                this.remoteService.getConversionRateAsPerDate(dateWithdrawn).subscribe(function (data) {
                    _this.conversionRate = data.rates.MXN;
                    //alert(this.conversionRate + " " + this.amount + " " + this.debitedAmount + " " + this.converstionCharges);
                    _this.actualTotal = _this.amount / _this.conversionRate;
                    _this.debitedTotal = +_this.debitedAmount + +_this.converstionCharges;
                    _this.difference = _this.debitedTotal - _this.actualTotal;
                    _this.saveToDB();
                    _this.navCtrl.pop();
                });
            }
            else {
                this.conversionRate = 1;
                this.actualTotal = this.amount / this.conversionRate;
                this.debitedTotal = +this.debitedAmount + +this.converstionCharges;
                this.difference = this.debitedTotal - this.actualTotal;
                this.saveToDB();
                this.navCtrl.pop();
            }
        }
    };
    WithdrawlDetailsPage.prototype.deleteData = function () {
        var _this = this;
        if (this.rowid != 0) {
            this.deleteDataFromDB().then(function () {
                _this.navCtrl.pop();
            });
        }
    };
    WithdrawlDetailsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //this.presentToast("View did enter");
        if (this.rowid != 0) {
            this.getData(this.rowid).then(function (resp) {
                //alert(JSON.stringify(resp));
                _this.amount = resp.rows.item(0).amount;
                _this.debitedAmount = resp.rows.item(0).debitedamount;
                _this.converstionCharges = resp.rows.item(0).conversioncharges;
                _this.actualTotal = resp.rows.item(0).actualtotal;
                _this.debitedTotal = resp.rows.item(0).debitedtotal;
                _this.difference = resp.rows.item(0).difference;
                _this.conversionRate = resp.rows.item(0).conversionrate;
                _this.month = resp.rows.item(0).month;
                _this.currencyType = resp.rows.item(0).currencytype;
                //alert(this.currencyType);
            });
        }
    };
    WithdrawlDetailsPage.prototype.getData = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then(function (db) {
                var query = "SELECT * FROM withdrawls where rowid=?";
                db.transaction(function (tx) {
                    //alert(id);
                    tx.executeSql(query, [id], function (tx, rs) {
                        resolve(rs);
                    }, function (tx, error) {
                        alert('SELECT error: ' + error.message);
                    });
                }).catch(function (e) { return alert(JSON.stringify(e)); });
            }).catch(function (e) { return _this.presentToast(e); });
        });
    };
    WithdrawlDetailsPage.prototype.saveToDB = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then(function (db) {
                if (_this.rowid == 0) {
                    var query = 'INSERT INTO withdrawls (amount, debitedamount,conversioncharges,month,currencytype,actualtotal,debitedtotal,difference,conversionrate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
                    db.executeSql(query, [_this.amount, _this.debitedAmount, _this.converstionCharges, _this.month, _this.currencyType, _this.actualTotal, _this.debitedTotal, _this.difference, _this.conversionRate]).then(function (data) {
                        _this.presentToast("New Withdrawl Recorded");
                        resolve();
                    }, function (error) {
                        alert(JSON.stringify(error));
                        //alert("ERROR: " + JSON.stringify(error.err));
                    });
                }
                else {
                    //alert("update");
                    var updateQuery = 'update withdrawls set amount=?, debitedamount=?,conversioncharges=?,month=?,currencytype=?,actualtotal=?,debitedtotal=?,difference=?,conversionrate=? where rowid=?';
                    db.executeSql(updateQuery, [_this.amount, _this.debitedAmount, _this.converstionCharges, _this.month, _this.currencyType, _this.actualTotal, _this.debitedTotal, _this.difference, _this.conversionRate, _this.rowid]).then(function (data) {
                        _this.presentToast("New Withdrawl Recorded");
                        //resolve();
                    }, function (error) {
                        alert(JSON.stringify(error));
                        //alert("ERROR: " + JSON.stringify(error.err));
                    });
                }
            }).catch(function (e) { return _this.presentToast(e); });
        });
    };
    WithdrawlDetailsPage.prototype.deleteDataFromDB = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then(function (db) {
                var query = 'delete from withdrawls where rowid=?';
                db.executeSql(query, [_this.rowid]).then(function (data) {
                    _this.presentToast("Deleted Succesfully");
                    resolve();
                }, function (error) {
                    alert(JSON.stringify(error));
                    //alert("ERROR: " + JSON.stringify(error.err));
                });
            }).catch(function (e) { return _this.presentToast(e); });
        });
    };
    WithdrawlDetailsPage.prototype.validateData = function () {
        if (!this.amount) {
            this.presentToast("Please enter the Amount of Withdrawl");
            return false;
        }
        else if (!this.month) {
            this.presentToast("Please select the Date of Withdrawl");
            return false;
        }
        else if (!this.debitedAmount) {
            this.presentToast("Please enter the Debited Amount from your account");
            return false;
        }
        else if (!this.converstionCharges) {
            if (this.converstionCharges != 0) {
                this.presentToast("Please enter the Conversion charges charged from your account");
                return false;
            }
        }
        else if (!this.currencyType) {
            this.presentToast("Please select an Applicable Currency Type");
            return false;
        }
        return true;
    };
    WithdrawlDetailsPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    WithdrawlDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-withdrawldetails',template:/*ion-inline-start:"/Users/shankar/Projects/Ionic/MoneyManagement/src/pages/withdrawldetails/withdrawldetails.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Withdrawl - Edit</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="saveData()">\n                <ion-icon name="md-checkmark-circle"></ion-icon>\n            </button>\n\n            <button *ngIf="rowid!=0" ion-button icon-only (click)="deleteData()">\n                <ion-icon name="md-trash"></ion-icon>\n            </button>\n\n\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-list>\n        <ion-list-header>\n            Transaction\n        </ion-list-header>\n        <ion-item>\n            <ion-label floating>Amount Withdrawn</ion-label>\n            <ion-input [(ngModel)]="amount" type="number"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating>Amount Debited (USD)</ion-label>\n            <ion-input [(ngModel)]="debitedAmount" type="number"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating>Conversion Charges (USD)</ion-label>\n            <ion-input [(ngModel)]="converstionCharges" type="number"></ion-input>\n        </ion-item>\n\n    </ion-list>\n\n    <ion-list>\n        <ion-list-header>\n            Details\n        </ion-list-header>\n\n        <ion-item>\n            <ion-label floating>Date of Transaction</ion-label>\n            <ion-datetime [(ngModel)]="month" displayFormat="DD-MMM-YYYY" pickerFormat="DD MMM YYYY"></ion-datetime>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating>Currency Type</ion-label>\n            <ion-select [(ngModel)]="currencyType">\n                <ion-option value="MXN">Mexican Pesos</ion-option>\n                <ion-option value="USD">US Dollars</ion-option>\n            </ion-select>\n        </ion-item>\n\n    </ion-list>\n\n    <ion-list>\n        <ion-list-header>\n            Computed Fields\n        </ion-list-header>\n\n        <ion-item>\n            <ion-label>Debited</ion-label>\n            <ion-label>{{debitedTotal | currency:\'USD\'}}</ion-label>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Actual</ion-label>\n            <ion-label>{{actualTotal | currency:\'USD\'}}</ion-label>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Difference</ion-label>\n            <ion-label>{{difference | currency:\'USD\'}}</ion-label>\n        </ion-item>\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"/Users/shankar/Projects/Ionic/MoneyManagement/src/pages/withdrawldetails/withdrawldetails.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */], __WEBPACK_IMPORTED_MODULE_4__angular_common__["d" /* DatePipe */]])
    ], WithdrawlDetailsPage);
    return WithdrawlDetailsPage;
}());

//create table if not exists withdrawls(rowid INTEGER PRIMARY KEY, amount integer, debitedamount decimal, conversioncharges decimal, month datetime,currencytype text, actualtotal decimal, debitedtotal decimal, difference decimal, conversionrate decimal)
//# sourceMappingURL=withdrawldetails.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RemoteServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_do__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RemoteServiceProvider = (function () {
    //https://openexchangerates.org/api/historical/2017-01-19.json?app_id=58f2bf08c96246f2a6efdac01032a446
    function RemoteServiceProvider(http) {
        this.http = http;
        console.log('Hello RemoteServiceProvider Provider');
    }
    RemoteServiceProvider.prototype.getConversionRateAsPerDate = function (date) {
        //let getApiUrl = "http://api.fixer.io/" + date + "?base=USD&symbols=USD,MXN";
        var getApiUrl = "https://openexchangerates.org/api/historical/" + date + ".json?app_id=58f2bf08c96246f2a6efdac01032a446";
        return this.http.get(getApiUrl)
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].throw(error); });
    };
    RemoteServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], RemoteServiceProvider);
    return RemoteServiceProvider;
}());

//# sourceMappingURL=remote-service.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__depositEdit_depositEdit__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ListPage = (function () {
    function ListPage(navCtrl, plt, sqlite, toastCtrl, datePipe) {
        this.navCtrl = navCtrl;
        this.sqlite = sqlite;
        this.datePipe = datePipe;
        this.toastCtrl = toastCtrl;
        this.items = [];
        this.platform = plt;
    }
    ListPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.items = [];
        this.getData().then(function (resp) {
            for (var i = 0; i < resp.rows.length; i++) {
                //let dt = this.datePipe.transform(resp.rows.item(i).month, 'dd-MMM-yy'); 
                _this.items.push({ title: resp.rows.item(i).month, note: resp.rows.item(i).amount, rowid: resp.rows.item(i).rowid });
            }
        });
    };
    //    ionViewDidLoad() {
    //        this.getData().then((resp:any) => {
    //            for (var i = 0; i < resp.rows.length; i++) {
    //                this.items.push({title: resp.rows.item(i).month, note:resp.rows.item(i).amount});
    //            }
    //        });
    //    }
    ListPage.prototype.getData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then(function (db) {
                var query = "SELECT * FROM deposits";
                db.transaction(function (tx) {
                    tx.executeSql(query, [], function (tx, rs) {
                        resolve(rs);
                    }, function (tx, error) {
                        alert('SELECT error: ' + error.message);
                    });
                }).catch(function (e) { return alert(JSON.stringify(e)); });
            }).catch(function (e) { return _this.presentToast(e); });
        });
    };
    ListPage.prototype.editData = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__depositEdit_depositEdit__["a" /* DepositEditPage */]);
    };
    ListPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__depositEdit_depositEdit__["a" /* DepositEditPage */], {
            item: item
        });
    };
    ListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/Users/shankar/Projects/Ionic/MoneyManagement/src/pages/list/list.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Deposits</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="editData()">\n                <ion-icon name="md-add-circle"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list>\n        <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n            {{item.title | date: \'dd-MMM-yyyy\'}}\n            <div class="item-note" item-end>\n                {{item.note}} USD\n            </div>\n        </button>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/shankar/Projects/Ionic/MoneyManagement/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__angular_common__["d" /* DatePipe */]])
    ], ListPage);
    return ListPage;
}());

//db.executeSql('INSERT INTO deposits (amount, month) VALUES (?, ?)', [1000, '02/05/2018']).then((data) => {
//
//                alert("INSERTED error " + JSON.stringify(data));
//                //alert("Insert into page title content OK !");
//            }, (error) => {
//
//                this.presentToast("Report Error inserting table page title content : " + error);
//                //alert("ERROR: " + JSON.stringify(error.err));
//            });
//# sourceMappingURL=list.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DepositEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DepositEditPage = (function () {
    function DepositEditPage(navCtrl, navParams, sqlite, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.toastCtrl = toastCtrl;
        this.amount = 0;
        var item = navParams.get('item');
        //alert(JSON.stringify(item));
        if (item != undefined) {
            this.amount = item.note;
            this.month = item.title;
            this.rowid = item.rowid;
        }
        else {
            this.rowid = 0;
        }
    }
    DepositEditPage.prototype.saveData = function () {
        var _this = this;
        if (this.validateData()) {
            this.saveToDB().then(function () {
                _this.navCtrl.pop();
            });
        }
    };
    DepositEditPage.prototype.deleteData = function () {
        var _this = this;
        if (this.rowid != 0) {
            this.deleteDataFromDB().then(function () {
                _this.navCtrl.pop();
            });
        }
    };
    DepositEditPage.prototype.validateData = function () {
        if (!this.amount) {
            this.presentToast("Please enter the Amount of Deposit");
            return false;
        }
        else if (!this.month) {
            this.presentToast("Please select the Date of Deposit");
            return false;
        }
        return true;
    };
    DepositEditPage.prototype.saveToDB = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then(function (db) {
                if (_this.rowid == 0) {
                    var query = 'INSERT INTO deposits (amount, month) VALUES (?, ?)';
                    db.executeSql(query, [_this.amount, _this.month]).then(function (data) {
                        _this.presentToast("New Deposit Recorded");
                        resolve();
                    }, function (error) {
                        _this.presentToast("Report Error inserting table page title content : " + error);
                        //alert("ERROR: " + JSON.stringify(error.err));
                    });
                }
                else {
                    var query = 'update deposits SET amount=?,month=? where rowid=?';
                    db.executeSql(query, [_this.amount, _this.month, _this.rowid]).then(function (data) {
                        _this.presentToast("Deposit Updated");
                        resolve();
                    }, function (error) {
                        _this.presentToast("Report Error updating table page title content : " + error);
                    });
                }
            }).catch(function (e) { return _this.presentToast(e); });
        });
    };
    DepositEditPage.prototype.deleteDataFromDB = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then(function (db) {
                var query = 'delete from deposits where rowid=?';
                db.executeSql(query, [_this.rowid]).then(function (data) {
                    _this.presentToast("Deleted Succesfully");
                    resolve();
                }, function (error) {
                    alert(JSON.stringify(error));
                    //alert("ERROR: " + JSON.stringify(error.err));
                });
            }).catch(function (e) { return _this.presentToast(e); });
        });
    };
    DepositEditPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    DepositEditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-depositEdit',template:/*ion-inline-start:"/Users/shankar/Projects/Ionic/MoneyManagement/src/pages/depositEdit/depositEdit.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Deposit - Edit</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="saveData()">\n                <ion-icon name="md-checkmark-circle"></ion-icon>\n            </button>\n            <button *ngIf="rowid!=0" ion-button icon-only (click)="deleteData()">\n                    <ion-icon name="md-trash"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-list>\n        <ion-list-header>\n            Transaction\n        </ion-list-header>\n        <ion-item>\n            <ion-label floating>Amount</ion-label>\n            <ion-input [(ngModel)]="amount" type="number"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating>Month</ion-label>\n            <ion-datetime [(ngModel)]="month" displayFormat="DD-MMM-YYYY" pickerFormat="DD MMM YYYY"></ion-datetime>\n        </ion-item>\n\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/shankar/Projects/Ionic/MoneyManagement/src/pages/depositEdit/depositEdit.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */]])
    ], DepositEditPage);
    return DepositEditPage;
}());

//# sourceMappingURL=depositEdit.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardPage = (function () {
    function DashboardPage(navCtrl, sqlite, toastCtrl) {
        this.navCtrl = navCtrl;
        this.sqlite = sqlite;
        this.toastCtrl = toastCtrl;
        this.totalReloads = 0;
        this.totalDays = 0;
        this.totalEligible = 0;
        this.totalUSDWithdrawls = 0;
        this.totalMXNWithdrawls = 0;
        this.conversionCharges = 0;
        this.miscRefunds = 0;
        this.totalRefunds = 0;
    }
    DashboardPage.prototype.getReloadData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then(function (db) {
                db.transaction(function (tx) {
                    var query = "SELECT sum(amount) as sumres FROM deposits";
                    tx.executeSql(query, [], function (tx, rs) {
                        console.log("deposites " + rs.rows.item(0).sumres);
                        resolve(rs.rows.item(0).sumres);
                    }, function (tx, error) {
                        alert('SELECT error: ' + error.message);
                        return 0;
                    });
                }).catch(function (e) { return alert(JSON.stringify(e)); });
            }).catch(function (e) { return _this.presentToast(e); });
        });
    };
    DashboardPage.prototype.getWithdrawlData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then(function (db) {
                db.transaction(function (tx) {
                    var query = "SELECT * FROM withdrawls";
                    tx.executeSql(query, [], function (tx, rs) {
                        resolve(rs);
                    }, function (tx, error) {
                        alert('SELECT error: ' + error.message);
                        return 0;
                    });
                }).catch(function (e) { throw e; });
            }).catch(function (e) { return _this.presentToast(e); });
        });
    };
    DashboardPage.prototype.getSettingsData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then(function (db) {
                var query = "SELECT * FROM settings";
                db.transaction(function (tx) {
                    tx.executeSql(query, [], function (tx, rs) {
                        resolve(rs);
                    }, function (tx, error) {
                        alert('SELECT error: ' + error.message);
                    });
                }).catch(function (e) { return alert(JSON.stringify(e)); });
            }).catch(function (e) { return _this.presentToast(e); });
        });
    };
    DashboardPage.prototype.getMiscData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then(function (db) {
                var query = "SELECT sum(amount) as res FROM misc";
                db.transaction(function (tx) {
                    tx.executeSql(query, [], function (tx, rs) {
                        resolve(rs);
                    }, function (tx, error) {
                        alert('SELECT error: ' + error.message);
                    });
                }).catch(function (e) { return alert(JSON.stringify(e)); });
            }).catch(function (e) { return _this.presentToast(e); });
        });
    };
    DashboardPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.totalReloads = 0;
        Promise.all([this.getReloadData(), this.getWithdrawlData(), this.getSettingsData(), this.getMiscData()]).then(function (data) {
            console.log(data[0]);
            _this.totalReloads = data[0];
            var withdrawlData = data[1];
            for (var i = 0; i < withdrawlData.rows.length; i++) {
                if (withdrawlData.rows.item(i).currencytype == "MXN") {
                    _this.totalMXNWithdrawls += withdrawlData.rows.item(i).amount;
                }
                else {
                    _this.totalUSDWithdrawls += withdrawlData.rows.item(i).amount;
                }
                _this.conversionCharges += withdrawlData.rows.item(i).difference;
            }
            var settingsData = data[2];
            if (settingsData.rows.length > 0) {
                var stDate = new Date(settingsData.rows.item(0).startdate);
                var perdiem = settingsData.rows.item(0).perdiem;
                var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                var today = new Date();
                var diffDays = Math.round(Math.abs((today.getTime() - stDate.getTime()) / (oneDay)));
                _this.totalDays = diffDays;
                _this.totalEligible = +_this.totalDays * +perdiem;
            }
            var miscData = data[3];
            if (miscData.rows.length > 0) {
                _this.miscRefunds = miscData.rows.item(0).res;
            }
            _this.totalRefunds = +_this.conversionCharges + +_this.miscRefunds;
        });
    };
    DashboardPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    DashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dashboard',template:/*ion-inline-start:"/Users/shankar/Projects/Ionic/MoneyManagement/src/pages/dashboard/dashboard.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Dashboard - Reports</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-item-group>\n        <ion-item-divider color="light">Summary</ion-item-divider>\n        <ion-item>\n            <label>Total Reloads</label>\n            <label item-end>{{totalReloads | currency:\'USD\'}}</label>\n        </ion-item>\n        <ion-item>\n            <label>Total Days</label>\n            <label item-end>{{totalDays}} Days</label>\n        </ion-item>\n        <ion-item>\n            <label>Eligible</label>\n            <label item-end>{{totalEligible | currency:\'USD\'}}</label>\n        </ion-item>\n    </ion-item-group>\n\n    <ion-item-group>\n        <ion-item-divider color="light">Withdrawls</ion-item-divider>\n        <ion-item>\n            <label>Total USD Withdrawls</label>\n            <label item-end>{{totalUSDWithdrawls | currency:\'USD\'}}</label>\n        </ion-item>\n        <ion-item>\n            <label>Total MXN Withdrawls</label>\n            <label item-end>{{totalMXNWithdrawls | currency:\'MXN\'}}</label>\n        </ion-item>\n    </ion-item-group>\n\n    <ion-item-group>\n        <ion-item-divider color="light">Refunds</ion-item-divider>\n        <ion-item>\n            <label>Conversion Charges</label>\n            <label item-end>{{conversionCharges | currency:\'USD\'}}</label>\n        </ion-item>\n        <ion-item>\n            <label>Misc</label>\n            <label item-end>{{miscRefunds | currency:\'USD\'}}</label>\n        </ion-item>\n        <ion-item>\n            <label>Total</label>\n            <label item-end>{{totalRefunds | currency:\'USD\'}}</label>\n        </ion-item>\n    </ion-item-group>\n</ion-content>'/*ion-inline-end:"/Users/shankar/Projects/Ionic/MoneyManagement/src/pages/dashboard/dashboard.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */]])
    ], DashboardPage);
    return DashboardPage;
}());

// let query1 = "select sum(amount) as res from withdrawls where currencytype='MXN'";
// let p2 = tx.executeSql(query1, [], function (tx, rs) {
//   console.log("Withdrawls " + rs.rows.item(0).res);
//   return rs.rows.item(0).res;
// }, function (tx, error) {
//   alert('SELECT error: ' + error.message);
//   return 0;
// }); 
//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MiscPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__miscedit_miscedit__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MiscPage = (function () {
    function MiscPage(navCtrl, plt, sqlite, toastCtrl, datePipe) {
        this.navCtrl = navCtrl;
        this.sqlite = sqlite;
        this.toastCtrl = toastCtrl;
        this.datePipe = datePipe;
        this.items = [];
    }
    MiscPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.items = [];
        this.getData().then(function (resp) {
            for (var i = 0; i < resp.rows.length; i++) {
                _this.items.push({ desc: resp.rows.item(i).desc, amount: resp.rows.item(i).amount, rowid: resp.rows.item(i).rowid });
            }
        });
    };
    MiscPage.prototype.getData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then(function (db) {
                var query = "SELECT * FROM misc";
                db.transaction(function (tx) {
                    tx.executeSql(query, [], function (tx, rs) {
                        resolve(rs);
                    }, function (tx, error) {
                        alert('SELECT error: ' + error.message);
                    });
                }).catch(function (e) { return alert(JSON.stringify(e)); });
            }).catch(function (e) { return _this.presentToast(e); });
        });
    };
    MiscPage.prototype.editData = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__miscedit_miscedit__["a" /* MiscEditPage */]);
    };
    MiscPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__miscedit_miscedit__["a" /* MiscEditPage */], {
            item: item
        });
    };
    MiscPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    MiscPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-misc',template:/*ion-inline-start:"/Users/shankar/Projects/Ionic/MoneyManagement/src/pages/misc/misc.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Misc Refunds</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="editData()">\n                <ion-icon name="md-add-circle"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list>\n        <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n            {{item.desc }}\n            <div class="item-note" item-end>\n                {{item.amount | currency:\'USD\'}} \n            </div>\n        </button>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/shankar/Projects/Ionic/MoneyManagement/src/pages/misc/misc.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__angular_common__["d" /* DatePipe */]])
    ], MiscPage);
    return MiscPage;
}());

//# sourceMappingURL=misc.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MiscEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MiscEditPage = (function () {
    function MiscEditPage(navCtrl, navParams, plt, sqlite, toastCtrl, datePipe) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.toastCtrl = toastCtrl;
        this.datePipe = datePipe;
        this.amount = 0;
        var item = navParams.get('item');
        if (item != undefined) {
            this.amount = item.amount;
            this.desc = item.desc;
            this.rowId = item.rowid;
        }
        else {
            this.rowId = 0;
        }
    }
    MiscEditPage.prototype.saveData = function () {
        var _this = this;
        if (this.validateData()) {
            this.saveToDB().then(function () {
                _this.navCtrl.pop();
            });
        }
    };
    MiscEditPage.prototype.deleteData = function () {
        var _this = this;
        if (this.rowId != 0) {
            this.deleteDataFromDB().then(function () {
                _this.navCtrl.pop();
            });
        }
    };
    MiscEditPage.prototype.validateData = function () {
        if (!this.amount) {
            this.presentToast("Please enter the Amount");
            return false;
        }
        else if (!this.desc) {
            this.presentToast("Please enter a Description");
            return false;
        }
        return true;
    };
    MiscEditPage.prototype.saveToDB = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then(function (db) {
                if (_this.rowId == 0) {
                    var query = 'INSERT INTO misc (amount, desc) VALUES (?, ?)';
                    db.executeSql(query, [_this.amount, _this.desc]).then(function (data) {
                        _this.presentToast("New Misc Recorded");
                        resolve();
                    }, function (error) {
                        _this.presentToast("Report Error inserting table page title content : " + error);
                        //alert("ERROR: " + JSON.stringify(error.err));
                    });
                }
                else {
                    var query = 'update misc SET amount=?,desc=? where rowid=?';
                    db.executeSql(query, [_this.amount, _this.desc, _this.rowId]).then(function (data) {
                        _this.presentToast("Misc Updated");
                        resolve();
                    }, function (error) {
                        _this.presentToast("Report Error updating table page title content : " + error);
                    });
                }
            }).catch(function (e) { return _this.presentToast(e); });
        });
    };
    MiscEditPage.prototype.deleteDataFromDB = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then(function (db) {
                var query = 'delete from misc where rowid=?';
                db.executeSql(query, [_this.rowId]).then(function (data) {
                    _this.presentToast("Deleted Succesfully");
                    resolve();
                }, function (error) {
                    alert(JSON.stringify(error));
                    //alert("ERROR: " + JSON.stringify(error.err));
                });
            }).catch(function (e) { return _this.presentToast(e); });
        });
    };
    MiscEditPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    MiscEditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-miscedit',template:/*ion-inline-start:"/Users/shankar/Projects/Ionic/MoneyManagement/src/pages/miscedit/miscedit.html"*/'<ion-header>\n        <ion-navbar>\n            <button ion-button menuToggle>\n                <ion-icon name="menu"></ion-icon>\n            </button>\n            <ion-title>Misc - Edit</ion-title>\n            <ion-buttons end>\n                <button ion-button icon-only (click)="saveData()">\n                    <ion-icon name="md-checkmark-circle"></ion-icon>\n                </button>\n                <button *ngIf="rowId!=0" ion-button icon-only (click)="deleteData()">\n                        <ion-icon name="md-trash"></ion-icon>\n                </button>\n            </ion-buttons>\n        </ion-navbar>\n    </ion-header>\n    \n    <ion-content padding>\n        <ion-list>\n            <ion-list-header>\n                Transaction\n            </ion-list-header>\n            <ion-item>\n                <ion-label floating>Amount</ion-label>\n                <ion-input [(ngModel)]="amount" type="number"></ion-input>\n            </ion-item>\n    \n            <ion-item>\n                <ion-label floating>Description</ion-label>\n                <ion-input [(ngModel)]="desc" type="text"></ion-input>\n            </ion-item>\n    \n        </ion-list>\n    </ion-content>\n    '/*ion-inline-end:"/Users/shankar/Projects/Ionic/MoneyManagement/src/pages/miscedit/miscedit.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__angular_common__["d" /* DatePipe */]])
    ], MiscEditPage);
    return MiscEditPage;
}());

//# sourceMappingURL=miscedit.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SettingsPage = (function () {
    function SettingsPage(navCtrl, plt, sqlite, toastCtrl, datePipe) {
        this.navCtrl = navCtrl;
        this.sqlite = sqlite;
        this.toastCtrl = toastCtrl;
        this.datePipe = datePipe;
        this.rowId = 0;
    }
    SettingsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.getData().then(function (resp) {
            console.log(JSON.stringify(resp));
            if (resp.rows.length > 0) {
                console.log(resp.rows.item(0).startdate);
                _this.startDate = resp.rows.item(0).startdate;
                _this.rowId = resp.rows.item(0).rowid;
                _this.perdiem = resp.rows.item(0).perdiem;
            }
        });
    };
    SettingsPage.prototype.getData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then(function (db) {
                var query = "SELECT * FROM settings";
                db.transaction(function (tx) {
                    tx.executeSql(query, [], function (tx, rs) {
                        resolve(rs);
                    }, function (tx, error) {
                        alert('SELECT error: ' + error.message);
                    });
                }).catch(function (e) { return alert(JSON.stringify(e)); });
            }).catch(function (e) { return _this.presentToast(e); });
        });
    };
    SettingsPage.prototype.saveData = function () {
        this.saveToDB();
    };
    SettingsPage.prototype.saveToDB = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then(function (db) {
                if (_this.rowId == 0) {
                    var query = 'INSERT INTO settings (startdate,perdiem) VALUES (?,?)';
                    db.executeSql(query, [_this.startDate, _this.perdiem]).then(function (data) {
                        _this.presentToast("Settings Saved");
                        resolve();
                    }, function (error) {
                        _this.presentToast("Report Error inserting table page title content : " + error);
                        //alert("ERROR: " + JSON.stringify(error.err));
                    });
                }
                else {
                    var query = 'update settings SET startdate=?, perdiem=? where rowid=?';
                    db.executeSql(query, [_this.startDate, _this.perdiem, _this.rowId]).then(function (data) {
                        _this.presentToast("Settings Updated");
                        resolve();
                    }, function (error) {
                        _this.presentToast("Report Error updating table page title content : " + error);
                    });
                }
            }).catch(function (e) { return _this.presentToast(e); });
        });
    };
    SettingsPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"/Users/shankar/Projects/Ionic/MoneyManagement/src/pages/settings/settings.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Settings</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="saveData()">\n                <ion-icon name="md-checkmark-circle"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list>\n        <ion-item>\n            <ion-label item-start>Start Date</ion-label>\n            <div class="item-note" item-end>\n                <ion-datetime [(ngModel)]="startDate" displayFormat="DD-MMM-YYYY" pickerFormat="DD MMM YYYY"></ion-datetime>\n            </div>\n        </ion-item>\n        <ion-item>\n            <ion-label item-start>Per-Diem</ion-label>\n            <ion-input class="item-note" item-end [(ngModel)]="perdiem" type="number" end></ion-input>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/shankar/Projects/Ionic/MoneyManagement/src/pages/settings/settings.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__angular_common__["d" /* DatePipe */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(231);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_list_list__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_dashboard_dashboard__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_withdrawldetails_withdrawldetails__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_depositEdit_depositEdit__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_misc_misc__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_miscedit_miscedit__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_settings_settings__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_remote_service_remote_service__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_withdrawldetails_withdrawldetails__["a" /* WithdrawlDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_depositEdit_depositEdit__["a" /* DepositEditPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_misc_misc__["a" /* MiscPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_miscedit_miscedit__["a" /* MiscEditPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClientModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_withdrawldetails_withdrawldetails__["a" /* WithdrawlDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_depositEdit_depositEdit__["a" /* DepositEditPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_misc_misc__["a" /* MiscPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_miscedit_miscedit__["a" /* MiscEditPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */],
                [__WEBPACK_IMPORTED_MODULE_5__angular_common__["d" /* DatePipe */]],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_19__providers_remote_service_remote_service__["a" /* RemoteServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClientModule */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_dashboard_dashboard__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_misc_misc__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_settings_settings__ = __webpack_require__(208);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Withdrawls', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Deposits', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] },
            { title: 'Dashboard', component: __WEBPACK_IMPORTED_MODULE_6__pages_dashboard_dashboard__["a" /* DashboardPage */] },
            { title: 'Misc', component: __WEBPACK_IMPORTED_MODULE_7__pages_misc_misc__["a" /* MiscPage */] },
            { title: 'Settings', component: __WEBPACK_IMPORTED_MODULE_8__pages_settings_settings__["a" /* SettingsPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/shankar/Projects/Ionic/MoneyManagement/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/shankar/Projects/Ionic/MoneyManagement/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[209]);
//# sourceMappingURL=main.js.map