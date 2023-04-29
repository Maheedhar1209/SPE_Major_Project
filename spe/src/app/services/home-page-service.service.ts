import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { response } from 'express';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:8101';
@Injectable({
  providedIn: 'root'
})
export class HomePageServiceService {

  constructor(private httpclient:HttpClient) { }

  getMovieDetails(movie_name:String){
    console.log("fdfd")
    return this.httpclient.get(`${baseUrl}/Movie?movie_name=${movie_name}`)
  }
  sendmoviedetails(movie_details:any,phone_number:String){
    console.log("fdfd")
    return this.httpclient.get(`${baseUrl}/sms?phone_number=${phone_number}&movie_details=${movie_details}`,);
  }
  logout(){
    localStorage.removeItem("user_login");
  }
  httpHeaders = new HttpHeaders({
    'Content-Type': "application/json",
    'Access-Control-Allow-Origin': "*"
  })


params = new HttpParams()
                  .set('user_id', '1');

postMyList(user_id: String) {
  let url = "http://localhost:8101/MyList";
  return this.httpclient.post<any>(url, null, {params: this.params, headers: this.httpHeaders});
}

postGenre(genre: string) {
  let url ="http://localhost:8101/Genres";
  return this.httpclient.post<any>(url, null, {headers: this.httpHeaders, params: new HttpParams().set('genre', genre)});
}
}
