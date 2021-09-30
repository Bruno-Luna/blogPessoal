import { Postagem } from "./Postagem";

export class User{

    public idUsuario: number
    public nome: string
    public senha: string
    public email: string
    public foto: string
    public tipo: string
    public minhasPostagens:Postagem[]
}