import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostService } from 'src/app/service/post.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  postagem: Postagem = new Postagem()

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostService,
    private temaService: ThemeService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if (environment.token == ''){
      this.router.navigate(['/login'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdPost(id)
    this.findAllTheme()
  }

  findByIdPost(id: number){
    this.postagemService.getByIdPost(id).subscribe((resp: Postagem)=>{
      this.postagem = resp
    })
  }

  findByIdTheme(){
    this.temaService.getByIdTheme(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  findAllTheme(){
    this.temaService.getAllTheme().subscribe((resp: Tema[])=>{
      this.listaTemas =resp
    })
  }

  atualizar(){
    this.tema.idTema = this.idTema
    this.postagem.temaRelacionado = this.tema

    this.postagemService.putPost(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp

      alert('Postagem atualizada!!')
      this.router.navigate(['/home'])
    })
  }
}
