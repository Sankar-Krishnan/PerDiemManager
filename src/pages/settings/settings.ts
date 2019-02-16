import { Component, AfterViewInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DepositEditPage } from '../depositEdit/depositEdit'
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { DatePipe } from '@angular/common'

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})

export class SettingsPage {
    startDate: Date;
    perdiem: number;
    rowId: number;

    constructor(public navCtrl: NavController, plt: Platform, private sqlite: SQLite,private toastCtrl: ToastController,private datePipe: DatePipe) {
        this.rowId = 0;
    }

    ionViewDidEnter() {
        this.getData().then((resp:any) => {
            console.log(JSON.stringify(resp));
            if(resp.rows.length>0) {
                console.log(resp.rows.item(0).startdate);
                this.startDate = resp.rows.item(0).startdate;
                this.rowId = resp.rows.item(0).rowid;
                this.perdiem = resp.rows.item(0).perdiem;
            }
        });
    }

    getData() {
        return new Promise((resolve, reject) => {
            this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
                var query = "SELECT * FROM settings";
                db.transaction(function(tx) {
                    tx.executeSql(query, [], function(tx, rs) {
                        resolve(rs);
                    }, function(tx, error) {
                        alert('SELECT error: ' + error.message);
                    });
                }).catch(e => alert(JSON.stringify(e)));
            }).catch(e => this.presentToast(e));
        });
    }

    saveData() {
        this.saveToDB();
    }

    saveToDB() {
        return new Promise((resolve, reject) => {
            this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
                if(this.rowId == 0) {
                    var query = 'INSERT INTO settings (startdate,perdiem) VALUES (?,?)';
                    db.executeSql(query, [this.startDate,this.perdiem]).then((data) => {
                        this.presentToast("Settings Saved");
                        resolve();
                    }, (error) => {
                        this.presentToast("Report Error inserting table page title content : " + error);
                        //alert("ERROR: " + JSON.stringify(error.err));
                    });
                }
                else {
                    var query = 'update settings SET startdate=?, perdiem=? where rowid=?';
                    db.executeSql(query,[this.startDate,this.perdiem,this.rowId]).then((data) => {
                       this.presentToast("Settings Updated");
                        resolve();
                    }, (error) => {
                        this.presentToast("Report Error updating table page title content : " + error);
                    });
                }
            }).catch(e => this.presentToast(e));
        });
    }

    presentToast(msg:string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }
}