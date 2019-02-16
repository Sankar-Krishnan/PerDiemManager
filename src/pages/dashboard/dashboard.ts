import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})

export class DashboardPage {

  totalReloads: number;
  totalDays: number;
  totalEligible: number;
  totalUSDWithdrawls: number;
  totalMXNWithdrawls: number;
  conversionCharges: number;
  miscRefunds: number;
  totalRefunds: number;


  constructor(public navCtrl: NavController, private sqlite: SQLite, private toastCtrl: ToastController) {
    this.totalReloads = 0;
    this.totalDays = 0;
    this.totalEligible = 0;
    this.totalUSDWithdrawls = 0;
    this.totalMXNWithdrawls = 0;
    this.conversionCharges = 0;
    this.miscRefunds = 0;
    this.totalRefunds = 0;

  }

  getReloadData() {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {

        db.transaction(function (tx) {
          var query = "SELECT sum(amount) as sumres FROM deposits";
          tx.executeSql(query, [], function (tx, rs) {
            console.log("deposites " + rs.rows.item(0).sumres);
            resolve(rs.rows.item(0).sumres);
          }, function (tx, error) {
            alert('SELECT error: ' + error.message);
            return 0;
          });
        }).catch(e => alert(JSON.stringify(e)));
      }).catch(e => this.presentToast(e));
    });
  }

  getWithdrawlData() {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.transaction(function (tx) {
          var query = "SELECT * FROM withdrawls";
          tx.executeSql(query, [], function (tx, rs) {
            resolve(rs);
          }, function (tx, error) {
            alert('SELECT error: ' + error.message);
            return 0;
          });
        }).catch(e => { throw e });
      }).catch(e => this.presentToast(e));
    });
  }

  getSettingsData() {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        var query = "SELECT * FROM settings";
        db.transaction(function (tx) {
          tx.executeSql(query, [], function (tx, rs) {
            resolve(rs);
          }, function (tx, error) {
            alert('SELECT error: ' + error.message);
          });
        }).catch(e => alert(JSON.stringify(e)));
      }).catch(e => this.presentToast(e));
    });
  }

  getMiscData() {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        var query = "SELECT sum(amount) as res FROM misc";
        db.transaction(function (tx) {
          tx.executeSql(query, [], function (tx, rs) {
            resolve(rs);
          }, function (tx, error) {
            alert('SELECT error: ' + error.message);
          });
        }).catch(e => alert(JSON.stringify(e)));
      }).catch(e => this.presentToast(e));
    });
  }



  ionViewDidEnter() {
    this.totalReloads = 0;

    Promise.all([this.getReloadData(), this.getWithdrawlData(), this.getSettingsData(), this.getMiscData()]).then((data: any[]) => {
      console.log(data[0]);
      this.totalReloads = data[0];

      let withdrawlData = data[1];
      for (var i = 0; i < withdrawlData.rows.length; i++) {
        if (withdrawlData.rows.item(i).currencytype == "MXN") {
          this.totalMXNWithdrawls += withdrawlData.rows.item(i).amount;
        }
        else {
          this.totalUSDWithdrawls += withdrawlData.rows.item(i).amount;
        }

        this.conversionCharges += withdrawlData.rows.item(i).difference;
      }

      let settingsData = data[2];
      if (settingsData.rows.length > 0) {
        let stDate: Date = new Date(settingsData.rows.item(0).startdate);
        let perdiem: number = settingsData.rows.item(0).perdiem;
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var today = new Date();
        var diffDays = Math.round(Math.abs((today.getTime() - stDate.getTime()) / (oneDay)));
        this.totalDays = diffDays;

        this.totalEligible = +this.totalDays * +perdiem;
      }

      let miscData = data[3];
      if (miscData.rows.length > 0) {
        this.miscRefunds = miscData.rows.item(0).res;
      }

      this.totalRefunds = +this.conversionCharges + +this.miscRefunds;
    });
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}



// let query1 = "select sum(amount) as res from withdrawls where currencytype='MXN'";
// let p2 = tx.executeSql(query1, [], function (tx, rs) {
//   console.log("Withdrawls " + rs.rows.item(0).res);
//   return rs.rows.item(0).res;
// }, function (tx, error) {
//   alert('SELECT error: ' + error.message);
//   return 0;
// });