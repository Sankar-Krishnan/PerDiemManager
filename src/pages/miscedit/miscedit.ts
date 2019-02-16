import { Component, AfterViewInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MiscPage } from '../misc/misc';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { DatePipe } from '@angular/common'

@Component({
    selector: 'page-miscedit',
    templateUrl: 'miscedit.html'
})

export class MiscEditPage {
    amount: number;
    desc: string;
    rowId: number;

    constructor(public navCtrl: NavController,public navParams: NavParams, plt: Platform, private sqlite: SQLite,private toastCtrl: ToastController,private datePipe: DatePipe) {
        this.amount=0;

        let item = navParams.get('item');
        
        if(item != undefined) {
            this.amount = item.amount;
            this.desc = item.desc;
            this.rowId = item.rowid;
        }
        else {
            this.rowId = 0;
        }
    }
       
    saveData() {
        if(this.validateData()) {
            this.saveToDB().then(() => {
                this.navCtrl.pop();
            });
        }
    }

    deleteData() {
        if(this.rowId!=0) {
            this.deleteDataFromDB().then(() => {
                this.navCtrl.pop();
            });
        }
    }

    validateData() : boolean {
        if(!this.amount) {
            this.presentToast("Please enter the Amount");
            return false;
        }
        else if(!this.desc) {
            this.presentToast("Please enter a Description");
            return false;
        }

        return true;
    }

    saveToDB() {
        return new Promise((resolve, reject) => {
            this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then((db: SQLiteObject) => {

                if(this.rowId == 0) {
                    var query = 'INSERT INTO misc (amount, desc) VALUES (?, ?)';
                    db.executeSql(query, [this.amount, this.desc]).then((data) => {
                        this.presentToast("New Misc Recorded")
                        resolve();
                    }, (error) => {
                        this.presentToast("Report Error inserting table page title content : " + error);
                        //alert("ERROR: " + JSON.stringify(error.err));
                    });
                }
                else {
                    var query = 'update misc SET amount=?,desc=? where rowid=?';
                    db.executeSql(query,[this.amount,this.desc,this.rowId]).then((data) => {
                       this.presentToast("Misc Updated");
                        resolve();
                    }, (error) => {
                        this.presentToast("Report Error updating table page title content : " + error);
                    });
                }
            }).catch(e => this.presentToast(e));
        });
    }

    deleteDataFromDB() {
        return new Promise((resolve, reject) => {
            this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
                var query = 'delete from misc where rowid=?';
                db.executeSql(query, [this.rowId]).then((data) => {
                    this.presentToast("Deleted Succesfully")
                    resolve();
                }, (error) => {
                    alert(JSON.stringify(error));
                    //alert("ERROR: " + JSON.stringify(error.err));
                });

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