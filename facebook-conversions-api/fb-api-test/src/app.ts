import CryptoJS from 'crypto-js';
import { CompileSpy } from 'aurelia-testing';

export class App {
  private appId: string =  '2805966193060065';
  private appSecret: string = '989f389770a0819e86216fd9615d781d';

  private apiVersion: string = 'v8.0';
  private pixelId: string = '3223765234388297';
  private token: string = 'EAAn4AuowaOEBAIjxX8kdNPyNjWZByKtsDliI6hSvAqhv6hkK6c8nDA9MjwfadEoWtzOoHJlgIMQCnWL4hwHKdZCNZBHT8WfIw5AW32b09zoUBQsrdeVBW4q5CYN6813ZBZCMcXOek3ybpB56WIQdOPybgSDwZAXyOwowHB3w4t6kPa16sL7OyZCcNg6n1XdlznpZCidl8WtzVwZDZD';

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
    return response.json();
  }
}
