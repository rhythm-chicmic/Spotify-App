export interface signUpModel {
    email: string,
    firstName: string,
    lastName:string,
    password: string,
    phoneNo:number
}
export interface songInfoModel {
    songName:string,
    songType:string,
    genre:string,
    artistName:string
}
export interface songIdModel {
    songId:string
}

export const data= 
    {
        "owner": {
          "email": "jenny.rosen@example.com",
          "name": "jenny rosen",
          "phone": "561-561-5611",
          "address": {
            "city": "Coconut Creek",
            "country": null,
            "line1": "1234 sw 1st ct",
            "line2": null,
            "postal_code": "33066",
            "state": "FL"
          }
        },
        "metadata": {
          "testedUsing": "stripe-angular",
          "author": "Acker Apple"
        }
      }

