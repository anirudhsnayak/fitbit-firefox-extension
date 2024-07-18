export class FitbitAPI {
    static code_verifier : String;
    static async initializeOAuth(){
        this.code_verifier = this.generateCodeVerifier()
        let code_challenge : string = await this.generateCodeChallengeFromVerifier(this.code_verifier)
        await browser.storage.local.set({"code_verifier": this.code_verifier})
        window.location.replace(
            "https://www.fitbit.com/oauth2/authorize" 
            + "?response_type=code"
            + "&client_id=23PGXM"
            + "&scope=activity+cardio_fitness+electrocardiogram+heartrate+location+nutrition+oxygen_saturation+profile+respiratory_rate+settings+sleep+social+temperature+weight"
            + "&code_challenge=" + code_challenge
            + "&code_challenge_method=S256"
            + "&redirect_uri=https%3A%2F%2Fanirudhsnayak.github.io%2F"
        )
    }
    static async getAccessToken(code: string){
        this.code_verifier = JSON.parse(JSON.stringify(await browser.storage.local.get("code_verifier"))).code_verifier;
        let response = await fetch("https://api.fitbit.com/oauth2/token", {
            method: "POST",
            headers: {
                "Authorization": "Basic " + btoa("23PGXM:"+"44acdf319cd0b94c2d141c02023b050d"),
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body:
                "client_id=23PGXM"
                + "&code="+ code
                + "&code_verifier=" + FitbitAPI.code_verifier
                + "&grant_type=authorization_code"
                + "&redirect_uri=https%3A%2F%2Fanirudhsnayak.github.io%2F"
        })
        let json : any = await response.json();
        console.log(json)
        await browser.storage.local.set({"access_token": json.access_token})
        await browser.storage.local.set({"refresh_token": json.refresh_token})
        await browser.storage.local.set({"user_id": json.user_id})
        console.log(json.access_token)
    }
    // Date format: YYYY-MM-DD
    static async getSleepData(date: string){
        let access_token = await browser.storage.local.get("access_token");
        let user_id = await browser.storage.local.get("user_id");
        let response = await fetch("https://api.fitbit.com/1.2/user/" + user_id + "/sleep/date/" + date + ".json", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + access_token,
                "Accept": "application/json"
            }
        })
        let json = await response.json();
        console.log(json)
    }
    // GENERATING CODE VERIFIER
    static dec2hex(dec: any) {
        return ("0" + dec.toString(16)).substr(-2);
    }
    static generateCodeVerifier() {
        var array = new Uint32Array(112 / 2);
        window.crypto.getRandomValues(array);
        return Array.from(array, this.dec2hex).join("");
    }

    static sha256(plain: any) {
        // returns promise ArrayBuffer
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest("SHA-256", data);
      }
      
      static base64urlencode(a: any) {
        var str = "";
        var bytes = new Uint8Array(a);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          str += String.fromCharCode(bytes[i]);
        }
        return btoa(str)
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");
      }
      
      static async generateCodeChallengeFromVerifier(v: any) {
        var hashed = await this.sha256(v);
        var base64encoded = this.base64urlencode(hashed);
        return base64encoded;
      }

} 