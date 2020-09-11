import CryptoJS from 'crypto-js';
import fetch from 'node-fetch';

export default class FacebookEventsService {
    private appId: string =  '2805966193060065';
    private appSecret: string = '989f389770a0819e86216fd9615d781d';

    private apiVersion: string = 'v8.0';
    private pixelId: string = '3223765234388297';
    private token: string = 'EAAn4AuowaOEBADsJXfVqTcZAFoLQR6sfCsqUj8ZCbxVPk8yfzufgJRX9BiXwvZBkGrXngJhgdFsjHPX7zRDwRIqEm8x7qy8vCZClGNGfXnzSjB8IrqFi2dBztylnBR1VUHthQ7IBQfMyjieaMw2Y9CiFT1tKTULeqF3QS6ZAp9wg2yP2F6BmCPgrNZBPDUAkhksZCQHvtoG2FKZCSaZB46dIIOfL7evx4Hra2XHOskmT66QZDZD';
    private generatedToken: string = '';

    public user = {
        firstName: 'David',
        surName: 'Bandemo',
        email: 'david.bandemo@voyado.se'
    }

    constructor() {
        const url = `https://graph.facebook.com/oauth/access_token?client_id=${this.appId}&client_secret=${this.appSecret}&grant_type=client_credentials`;
    
        fetch(url)
        .then((response) => {
            response.json()
            .then((data) => {
                this.generatedToken = data.access_token.split('|')[1];
            });
        });
    }

    public async sendFbRequest() {
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
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data: data }) // body data type must match 'Content-Type' header
        });

        return response.json();
    }
}
