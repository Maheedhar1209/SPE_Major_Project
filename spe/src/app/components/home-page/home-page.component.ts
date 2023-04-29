import { Component, Renderer2, ElementRef } from '@angular/core';
//import { GoogleMapsAPIWrapper } from '@google/maps';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HomePageServiceService } from 'src/app/services/home-page-service.service';
import { Movie_Details } from 'src/app/models/Movie_Details.model';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  divElement:any;
movie_title: any;
moviedetails?: Movie_Details;
movie_details = "Please enter a movie";
showElement: boolean = false;
  constructor(private router:Router,private renderer: Renderer2, private el: ElementRef,private httpClient:HttpClient,private homepageservice:HomePageServiceService) {}

  ngOnInit() {
    this.divElement = this.el.nativeElement.querySelector('.slider-next');
    
  }
  slide(){
    console.log("sss");
    this.renderer.setStyle(this.divElement, 'transform', '`translateX(-${2*33.33}%)`');
  }
  moviesearch(){
      console.log(this.movie_title)
      if (this.movie_title=="" || this.movie_title == null)
       alert("Please type a movie");
      else{
       
        this.homepageservice.getMovieDetails(this.movie_title)
        .subscribe((res:Movie_Details)=>{
        this.moviedetails=res;
        if (this.moviedetails==null)
          alert("movie not found,try another movie");
        else{
        this.movie_details="Movie name is "+this.moviedetails?.movie_name  + ".Release date is " + this.moviedetails?.release_date + ".OTT platforms are " + this.moviedetails?.ott_platforms; 
        console.log(this.moviedetails.movie_name);
        localStorage.setItem("movie_details",JSON.stringify(this.movie_details));
        this.router.navigate(["popup"]);  
      }
        });
      
      
      
      }
      //console.log(ans);
    
  }
  closepopup(){
    this.showElement=!this.showElement;
  }
  logout(){
    this.homepageservice.logout();
    this.router.navigate(["/login"]);
  }
  ImagePath: string = "";
  // constructor(private service: HomePageServiceService){}
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
  // ngOnInit(): void {
      
  // }
  myList() {
    let user_id = "1";
    let ind: string = "";
   let observable = this.homepageservice.postMyList(user_id).subscribe(
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
    let observable = this.homepageservice.postGenre(genre).subscribe(
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
