import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { PostService } from '../service/post.service';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postagem: Postagem = new Postagem

  tema: Tema = new Tema
  listaTemas: Tema[]
  idTheme:number

  user: User = new User()
  idUser = environment.id

  constructor(
    private router: Router,
    private postagemService: PostService,
    private temaService: ThemeService
  ) { }

  ngOnInit() {

    if(environment.token == ''){
      alert('Sua sessão expirou. Faça o login novamente')
      this.router.navigate(['/login'])
    }

    this.getAllTheme()
  }

  getAllTheme(){
    this.temaService.getAllTheme().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  findByIdTheme(){
    this.temaService.getByIdTheme(this.idTheme).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  publicar(){
    this.tema.idTema = this.idTheme
    this.postagem.tema = this.tema

    this.user.idUsuario = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPost(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      alert('Postagem realizada com sucesso!!')
      this.postagem = new Postagem()
    })
  }
}
