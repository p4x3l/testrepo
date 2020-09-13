import CryptoJS from 'crypto-js';
import { CompileSpy } from 'aurelia-testing';

export class App {
  private appId: string =  'AppID';
  private appSecret: string = 'AppSecret';

  private apiVersion: string = 'v8.0';
  private pixelId: string = 'PixelId';
  private token: string = 'Token';

  public user = {
    firstName: 'David',
    surName: 'Bandemo',
    email: 'david.bandemo@voyado.se'
  }

  async activate() {
    const url = `https://graph.facebook.com/oauth/access_token?client_id=${this.appId}&client_secret=${this.appSecret}&grant_type=client_credentials`;

    const response = await fetch(url);

    const data = await response.json();
    this.token = data.access_token.split('|')[1];
  }

  private async sendFbRequest() {
    const url = `https://graph.facebook.com/${this.apiVersion}/${this.pixelId}/events?access_token=${this.token}`;
    const data = [
      {
        event_name: 'Purchase',
        event_time: Math.floor(new Date().getTime() / 1000),
        user_data: {
            em: CryptoJS.SHA256(this.user.email).toString(CryptoJS.enc.Hex)
        },
        custom_data: {
            content_name: 'Dator',
            content_ids: ['62717'],
            currency: 'SEK',
            value: 5000
        },
      }
    ]
    const response = await fetch(url, {
      method: 'POST',
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: data }) // body data type must match 'Content-Type' header
    });
    var stuff = await response.json();
    console.log(stuff);
  }
}
