import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../components/registration/registration.component';
import {Observable} from 'rxjs';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private authUrl = environment.authUrl;

  constructor(private httpClient:HttpClient) { }

  registerUser(user:User):Observable<User>{

    return this.httpClient.post<User>(`${this.authUrl}/register`,user,{
       responseType: 'json'
     })
  }

  loginUser(user:User):Observable<string>{
    return  this.httpClient.post(`${this.authUrl}/login`,user,{
      responseType: 'text' as 'text'
    })

  }

  decodeToken(){
    let user = JSON.stringify(sessionStorage.getItem("access-token"));
    let jwtPayload = jwtDecode(user);
    console.log(jwtPayload)
    sessionStorage.setItem("login-User",JSON.stringify(jwtPayload))
  }

  getUserDetails(){
    let user = sessionStorage.getItem("login-User");
    if (user) {
      const commonUser = JSON.parse(user);

      return commonUser;
    } else {
      return null; // or you can handle it differently
    }
  }


}

interface AuthenticationResponse {
  token: string;
}
