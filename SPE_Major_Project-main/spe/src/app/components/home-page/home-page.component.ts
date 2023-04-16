import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent {
  curr=0;
  public next() {
    console.log("Button works");
    var loc = document.getElementById("look");
    this.curr++;
    if (this.curr >3) this.curr=0;
    if (loc != undefined) {
      loc.style.transform = "translateX(-" + (200*this.curr).toString() + "px)";
    }
  }

  public prev() {
    console.log("Button works");
    var loc = document.getElementById("look");
    this.curr--;
    if (this.curr < 0) this.curr = 3;
    if (loc != undefined) {
      loc.style.transform = "translateX(-" + (200*this.curr).toString() + "px)";
    }
  }
} 

