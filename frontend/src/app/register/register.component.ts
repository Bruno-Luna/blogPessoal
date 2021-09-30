import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../model/UserLogin';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userLogin: UserLogin = new UserLogin
  confirmSenha: string
  tipoUsuario: string

  constructor() { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmarSenha(event: any){
    this.confirmSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

}
