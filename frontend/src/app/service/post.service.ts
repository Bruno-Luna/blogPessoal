import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPost(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>('http://localhost:8080/postagem/todas', this.token)
  }

  getByIdPost(id: number): Observable<Postagem>{
    return this.http.get<Postagem>(`http://localhost:8080/postagem/${id}`, this.token)
  }

  postPost(postagem: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>('http://localhost:8080/postagem/salvar', postagem, this.token)
  }

  putPost(postagem: Postagem):  Observable<Postagem>{
    return this.http.put<Postagem>('http://localhost:8080/postagem/atualizar', postagem, this.token)
  }

  deletePost(id: number){
    return this.http.delete(`http://localhost:8080/postagem/deletar/${id}`)
  }
}
