import { Component } from "@angular/core";
import { NavController, Header, Toast } from "ionic-angular";
import { SecondPage } from "../second/second";
import { Storage } from "@ionic/storage";
//import { HttpClientModule } from '@angular/common/http';
import { Http, Headers, RequestOptions, Jsonp } from "@angular/http";
import { Injectable } from "@angular/core";
import { enableProdMode } from "@angular/core";
import { WsService } from "../../services/communicationService";
import { ToastController } from "ionic-angular";
import { LoadingController } from "ionic-angular";

enableProdMode();

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  /* CONSTRUCTOR */
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public http: Http,
    public ws: WsService,
    public toast: ToastController,
    public loadingCtrl: LoadingController
  ) {}

  /* PLAY */

  play(link) {
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
  }

  /* ADD TO PLAYLIST */
  addToPlaylist(link) {
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
      this.navCtrl.push(SecondPage, {
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
  }

  /* NEXT */
  next() {
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
  }

  //nevem zakaj bi rabu tole
  ionViewDidLoad() {}

  /* PAUSE */

  pause() {
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
  }

  //music gumb, gre direktno na drugo stran
  launchSecondPage() {
    this.navCtrl.push(SecondPage);
  }

  presentToast(text, duration, position) {
    let toast = this.toast.create({
      message: text,
      duration: duration,
      position: position
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }

  //loading function
  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present();
  }
}
