import { Component, Renderer2, ElementRef } from '@angular/core';
//import { GoogleMapsAPIWrapper } from '@google/maps';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  divElement:any;
movie_title: any;
  constructor(private renderer: Renderer2, private el: ElementRef,private httpClient:HttpClient) {}

  ngOnInit() {
    this.divElement = this.el.nativeElement.querySelector('.slider-next');
    
  }
  slide(){
    console.log("sss");
    this.renderer.setStyle(this.divElement, 'transform', '`translateX(-${2*33.33}%)`');
  }
  moviesearch(){
    
      const apiKey = 'AIzaSyAiKvaBSuFPay27HYSLvxJtdNvDDuIl2L0'; // Replace with your API key
      const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${this.movie_title} ott platforms&cx=6271e80630a164067&key=${apiKey}`; // Replace with your custom search engine ID
  
      this.httpClient.get(apiUrl,{ responseType: 'text' }).pipe(
        map((responseData: string) => {
          // Parse the JSON data
          const data = JSON.parse(responseData);
          return data;
        })
      ).subscribe(
        data => {
          // Do something with the decoded data
          console.log(data);
        },
        error => {
          // Handle any errors
          console.error(error);
        }
      );
      //console.log(ans);
    
  }
}
