import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaService: ThemeService
  ) { }

  ngOnInit(){

    if(environment.token == ''){
      alert('Sua sessão expirou. Faça o login novamente')
      this.router.navigate(['/login'])
    }

    this.buscarTodosTemas()
    
  }

  buscarTodosTemas(){
    this.temaService.getAllTheme().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  cadastrar(){
    this.temaService.postTheme(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      alert('Tema cadastrado com sucesso!!')
      this.buscarTodosTemas()
      this.tema = new Tema()
    })
  }
}
