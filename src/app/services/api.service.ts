import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { SignUp } from '../models/signup.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public post(message: SignUp): Observable<any> {
    return this.http.post(environment.api_endpoint, message);
  }
}
