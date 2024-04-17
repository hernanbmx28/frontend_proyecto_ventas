import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://localhost/proyecto-u/backEnd/controlador/login.php';

  constructor(private http: HttpClient) { }

  consultar(username: any, clave: any){
    //console.log(`${this.url}?username=${username}&clave=${clave}`);

    return this.http.get(`${this.url}?username=${username}&clave=${clave}`);
  }
}
