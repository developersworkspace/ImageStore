import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from './../environments/environment';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  images: any[] = [];

  constructor(private http: Http) {

    this.http.get(environment.api.uri + '/image/list')
        .map((res: Response) => res.json()).subscribe((result: any) => {
          this.images = result;
        });

  }
}
