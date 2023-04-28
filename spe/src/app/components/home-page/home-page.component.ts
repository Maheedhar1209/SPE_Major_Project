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
}
