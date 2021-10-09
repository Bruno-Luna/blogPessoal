import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { PostService } from 'src/app/service/post.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css']
})
export class PostDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()

  idPost: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostService,
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if (environment.token == ''){
      this.router.navigate(['/login'])
    }

    this.idPost = this.route.snapshot.params['id']
    this.findByIdPost(this.idPost)

  }

  findByIdPost(id: number){
    this.postagemService.getByIdPost(id).subscribe((resp: Postagem)=>{
      this.postagem = resp
    })
  }


  apagar(){
   this.postagemService.deletePost(this.idPost).subscribe(()=>{
     alert('Postagem apagada!!')
     this.router.navigate(['/home'])
   })
  }
}
