import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    
    /**
     * Basic auth mechanism with usr and passw
     * 
     * @param username 
     * @param password 
     */
    login(username: string, password: string) {


        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.http.get<any>('https://jovs5zmau3.execute-api.eu-west-1.amazonaws.com/prod/transactions',{headers}).pipe(
        map(
          userData => {
            sessionStorage.setItem('username',username);
            return userData;
          }
        )
        );


  }


/*

      let config = {
        headers: {
          "Authorization": "Basic " + btoa(username + ":" + password),
          "Content-Type": "application/x-www-form-urlencoded"
          }
        }  
        
       

  */
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}