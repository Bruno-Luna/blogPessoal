import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }

  token ={
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllTheme(): Observable <Tema[]>{
    return this.http.get<Tema[]>('http://localhost:8080/tema/todos', this.token)
  }

  postTheme(tema: Tema): Observable<Tema>{
    return this.http.post<Tema>('http://localhost:8080/tema/salvar', tema, this.token)
  }
}
