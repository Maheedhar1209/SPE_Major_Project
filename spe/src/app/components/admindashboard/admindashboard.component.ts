import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
  showFormFlag = false;
  movie = {
    name: '',
    releaseDate: '',
    genre: '',
    about: '',
    ottPlatforms: ''
  };

  constructor(private http: HttpClient) { }

  showForm() {
    this.showFormFlag = true;
  }

  onSubmit() {
    const url = 'https://your-movie-api-url.com/add-movie';
    this.http.post(url, this.movie)
      .subscribe(res => {
        console.log(res);
        // reset form
        this.movie = {
          name: '',
          releaseDate: '',
          genre: '',
          about: '',
          ottPlatforms: ''
        };
        // hide form
        this.showFormFlag = false;
      });
  }
}
