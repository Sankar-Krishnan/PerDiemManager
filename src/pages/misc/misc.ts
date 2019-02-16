import { Component, AfterViewInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MiscEditPage } from '../miscedit/miscedit';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { DatePipe } from '@angular/common'

@Component({
    selector: 'page-misc',
    templateUrl: 'misc.html'
})

export class MiscPage {
    items: Array<{desc: string, amount: string, rowid: number}>;

    constructor(public navCtrl: NavController, plt: Platform, private sqlite: SQLite,private toastCtrl: ToastController,private datePipe: DatePipe) {
        this.items = [];
    }

    ionViewDidEnter() {
        this.items = [];
        this.getData().then((resp:any) => {
            for (var i = 0; i < resp.rows.length; i++) {
                this.items.push({desc: resp.rows.item(i).desc, amount:resp.rows.item(i).amount, rowid: resp.rows.item(i).rowid});
            }
        });
    }

    getData() {
        return new Promise((resolve, reject) => {
            this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
                var query = "SELECT * FROM misc";
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

    editData() {
        this.navCtrl.push(MiscEditPage);
    }

    itemTapped(event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(MiscEditPage, {
            item: item
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