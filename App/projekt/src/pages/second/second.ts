import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  reorderArray
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import { WsService } from "../../services/communicationService";
import { enableProdMode } from "@angular/core";
import { HomePage } from "../home/home";

enableProdMode();

/**
 * Generated class for the SecondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-second",
  templateUrl: "second.html"
})
//To move the text to the left, press Shift+Tab.
export class SecondPage {
  link: string;
  ObjectLinks: any;
  command: any;

  sendData: any;
  json: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public http: Http,
    public ws: WsService
  ) {
    //fetcham link
    this.link = navParams.get("data");

    //fetcham komando
    this.command = navParams.get("command");

    //izpis test
    console.log(this.command);
    console.log(this.link);

    //fetcham iz  storage
    this.storage.get("MyStorage").then(data => {
      console.log(data);
      if (data != null) {
        //ce je link undefined ga ne bo dal v array ki izrise seznam linkov
        if (this.link != undefined) {
          //ce je play ga da na 1 mesto, če commanda ni play ga da na konec
          if (this.command == "play") {
            data.splice(0, 0, this.link);
          } else {
            data.push(this.link);
          }
        }
        //shranem podatke v storage
        this.storage.set("MyStorage", data);
      } else {
        //ce je link undefined ga ne bo dal v array ki izrise seznam
        if (this.link != undefined) {
          //ce je komanda play ga da na index 0, cene pa na dno quja
          if (this.command == "play") {
            //ce je play ga da na 1 mesto, če commanda ni play ga da na konec
            this.ObjectLinks.splice(0, 0, this.link);
          } else {
            this.ObjectLinks.push(this.link);
          }
        }

        this.storage.set("MyStorage", this.ObjectLinks);
      }
      this.ObjectLinks = data;
      if (this.command == "pause") {
        console.log("0 index: " + this.ObjectLinks[0]);
        this.sendData = {
          link: this.ObjectLinks[0],
          command: "pause"
        };
      } else {
        this.sendData = {
          link: this.link,
          command: this.command
        };
      }
      console.log("Send data: " + this.sendData);
      this.json = JSON.stringify(this.sendData);
      console.log(this.json);
    });

    this.ObjectLinks = [];
  }

  ionViewDidLoad() {}

  //updata indexe na seznamu, če prestavlaš linke gor dol
  reorderItem(indexes) {
    this.ObjectLinks = reorderArray(this.ObjectLinks, indexes);

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
  }

  //remova specifičen link iz seznama
  remove(i) {
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
  }

  launchFirstPage() {
    this.navCtrl.push(HomePage);
  }
}
