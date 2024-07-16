import * as crypto from 'crypto'
import base64url from 'base64url'
export class FitbitAPI {
    static code_verifier : crypto.BinaryLike = "";
    accessToken : string = ""
    static initializeOAuth(){
        console.log("test")
        this.code_verifier = crypto.randomBytes(96)
        let pseudocode : string = base64url(crypto.createHash('sha256').update(this.code_verifier).digest('hex'))
        window.location.replace(
            "https://www.fitbit.com/oauth2/authorize" 
            + "?response_type=code"
            + "&client_id=23PGXM"
            + "&scope=activity+cardio_fitness+electrocardiogram+heartrate+location+nutrition+oxygen_saturation+profile+respiratory_rate+settings+sleep+social+temperature+weight"
            + "&code_challenge=" + pseudocode
            + "&code_challenge_method=S256"
            + "&redirect_uri=https%3A%2F%2Fgithub.com%2Fanirudhsnayak%2Ffitbit-firefox-extension"
        )
    }
    static getAccessToken(code: string){
        fetch("https://api.fitbit.com/oauth2/token", {
            method: "POST",
            body: JSON.stringify({
                client_id: "23PGXM",
                code: code,
                code_verifier: FitbitAPI.code_verifier,
                grant_type: "authorization_code"
            })
        })
        .then((response) => {
            //finish
        })
    }
} 