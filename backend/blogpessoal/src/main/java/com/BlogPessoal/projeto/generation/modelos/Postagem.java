package com.BlogPessoal.projeto.generation.modelos;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
public class Postagem {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPostagem;
	
	@NotBlank 
    private String titulo;
	
	@NotBlank
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "criador_id")
    @JsonIgnoreProperties({"minhasPostagens"})
    private Usuario criador;

    @ManyToOne
    @JoinColumn(name = "tema_id")
    @JsonIgnoreProperties({"postagens"})
    private Tema temaRelacionado;

	public Long getIdPostagem() {
		return idPostagem;
	}

	public void setIdPostagem(Long idPostagem) {
		this.idPostagem = idPostagem;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Usuario getCriador() {
		return criador;
	}

	public void setCriador(Usuario criador) {
		this.criador = criador;
	}

	public Tema getTemaRelacionado() {
		return temaRelacionado;
	}

	public void setTemaRelacionado(Tema temaRelacionado) {
		this.temaRelacionado = temaRelacionado;
	}

}
