package com.BlogPessoal.projeto.generation.modelos;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity

public class Tema {
    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long idTema;
    private @NotBlank String tema;

   @OneToMany(mappedBy = "temaRelacionado", cascade = CascadeType.REMOVE)
    @JsonIgnoreProperties({"temaRelacionado"})
    private List<Postagem> postagens = new ArrayList<>();

public Long getIdTema() {
	return idTema;
}

public void setIdTema(Long idTema) {
	this.idTema = idTema;
}

public String getTema() {
	return tema;
}

public void setTema(String tema) {
	this.tema = tema;
}

public List<Postagem> getPostagens() {
	return postagens;
}

public void setPostagens(List<Postagem> postagens) {
	this.postagens = postagens;
}
   
}
