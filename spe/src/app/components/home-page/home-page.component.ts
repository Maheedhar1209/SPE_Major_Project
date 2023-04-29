import { ChangeDetectionStrategy, Component, Renderer2, ElementRef, HostBinding, OnInit } from '@angular/core';
// import {HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
//import { GoogleMapsAPIWrapper } from '@google/maps';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HomePageServiceService } from 'src/app/services/home-page-service.service';
import { Movie_Details } from 'src/app/models/Movie_Details.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class HomePageComponent implements OnInit {

  ImagePath: string = "";
  constructor(private service: HomePageServiceService){}
  // constructor(private http: HttpClient) { }

  getImg(){
    this.myList();
    //return this.ImagePath;
  }
  curr=0;
   next(id: string) {
    console.log("Button works");
    var loc = document.getElementById(id);
    console.log(loc?.className)
    this.curr++;
    if (this.curr >3) this.curr=0;
    if (loc != undefined) {
      loc.style.transform = "translateX(-" + (200*this.curr).toString() + "px)";
    }
    return;
  }

  prev(id: string) {
    console.log("Button works");
    var loc = document.getElementById(id);
    this.curr--;
    if (this.curr < 0) this.curr = 3;
    if (loc != undefined) {
      loc.style.transform = "translateX(-" + (200*this.curr).toString() + "px)";
    }
  }

  // httpHeaders = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*'
  //   })
  // };

  // postMyList(user_id: String) {
  //   let url = "http://localhost:8101/MyList";
  //   return this.http.post<any>(url, user_id, this.httpHeaders);
  // }
  ngOnInit(): void {
      
  }
  myList() {
    let user_id = "1";
    let ind: string = "";
   let observable = this.service.postMyList(user_id).subscribe(
      resp=> {console.log(resp);
        console.log(resp[0]['movie_img']);
        console.log("in func " + this.ImagePath)

        var images = new Array();
        for (let i=0; i<resp.length; i++)
        {
          images.push([resp[i]['movie_img'], resp[i]['movie_name']]);
        }

      //  const container = document.getElementById("cont");

        const wrap = document.getElementById("mylist");
        if (wrap)
        wrap.innerHTML = "";
        if (wrap){
           wrap.style.transform = "translateX(0px)"
          images.forEach(image => {
            const item = document.createElement('div');
            const style = document.createElement("style");
            item.style.flex =  "0 0 33.33%";
            item.style.padding = "10px";
            item.style.boxSizing= "border-box";
            const img = document.createElement('img');
            img.style.width = "100%";
            const head = document.createElement('h3');
            head.textContent = image[1];
            img.src = image[0];
            item.appendChild(img);
            item.appendChild(head);
            wrap.appendChild(item);
          //  container.style.overflow = "hidden";
        });
        // container?.append(wrap);
        // console.log(container);
      }
      
    }
    );
  }

  Genre(genre: string, id: string) {
    let observable = this.service.postGenre(genre).subscribe(
      resp=> {console.log(resp);
        console.log(resp[0]['movie_img']);
        console.log("in func " + this.ImagePath)

        var images = new Array();
        for (let i=0; i<resp.length; i++)
        {
          images.push([resp[i]['movie_img'], resp[i]['movie_name']]);
        }

      //  const container = document.getElementById("cont");

        const wrap = document.getElementById(id);
        if (wrap)
        wrap.innerHTML = "";
        if (wrap){
           wrap.style.transform = "translateX(0px)"
          images.forEach(image => {
            const item = document.createElement('div');
            const style = document.createElement("style");
            item.style.flex =  "0 0 33.33%";
            item.style.padding = "10px";
            item.style.boxSizing= "border-box";
            const img = document.createElement('img');
            img.style.width = "100%";
            const head = document.createElement('h3');
            head.textContent = image[1];
            img.src = image[0];
            item.appendChild(img);
            item.appendChild(head);
            wrap.appendChild(item);
          //  container.style.overflow = "hidden";
        });
        // container?.append(wrap);
        // console.log(container);
      }
      
    }
    );
  }

} 

