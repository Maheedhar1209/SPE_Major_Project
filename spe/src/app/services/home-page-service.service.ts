import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
