import { Injectable } from "@angular/core";
@Injectable()
export class WsService {
  ws: any;

  constructor() {
    this.ws = new WebSocket("ws://localhost:3333");
  }

  //pošle na websocket
  send(params) {
    //ws.send();
    console.log("Simulate sending");
    this.ws.send(params);
  }
}
