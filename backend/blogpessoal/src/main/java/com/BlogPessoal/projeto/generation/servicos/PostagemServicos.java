package com.BlogPessoal.projeto.generation.servicos;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BlogPessoal.projeto.generation.modelos.Postagem;
import com.BlogPessoal.projeto.generation.modelos.Tema;
import com.BlogPessoal.projeto.generation.modelos.Usuario;
import com.BlogPessoal.projeto.generation.repositorios.PostagemRepositorio;
import com.BlogPessoal.projeto.generation.repositorios.TemaRepositorio;
import com.BlogPessoal.projeto.generation.repositorios.UsuarioRepositorio;

@Service
public class PostagemServicos {
	
	@Autowired
	private PostagemRepositorio repositorioP;
	
	@Autowired
	private UsuarioRepositorio repositorioU;
	
	@Autowired
	private TemaRepositorio repositorioT;
	
	
	
	/**
	 * Método utilizado para alterar uma postagem que retorna um Optional com
	 * Postagem caso corretoou um Optional.empty() caso id da Postagem não exista.
	 * 
	 * @param postagemParaAlterar do tipo Postagem
	 * @return Optional com Postagem alterada
	 * @author Bruno Luna
	 */
	
	
	public Optional<?> atualizarPostagem(Postagem postagemParaAlterar) {
		return repositorioP.findById(postagemParaAlterar.getIdPostagem()).map(postagemExistente -> {
			Optional<Usuario> optionalUsuario = repositorioU.findById(postagemParaAlterar.getCriador().getIdUsuario());
			Optional<Tema> optionalTema = repositorioT.findById(postagemParaAlterar.getTemaRelacionado().getIdTema());
			if (optionalUsuario.isPresent() && optionalTema.isPresent()) {
				postagemExistente.setTitulo(postagemParaAlterar.getTitulo());
				postagemExistente.setDescricao(postagemParaAlterar.getDescricao());
				return Optional.ofNullable(repositorioP.save(postagemExistente));
			} else {
				return Optional.empty();
			}
		}).orElseGet(() -> {
			return Optional.empty();
		});
	}

	
	/**
	 * Método usado no cadastro de uma nova postagem dentro do banco, validando se o
	 * usuario criador é existente. O id do usuario criador e o id do tema devem ser
	 * repassados dentro do objeto postagem para que a devida criação seja efetuada.
	 * Caso o id do usuario não for passado ou não existir no banco, há retorno de
	 * um Optional.empty()
	 * 
	 * @param novaPostagem do tipo Postagem
	 * @return Optional com Postagem
	 * @author Bruno Luna
	 */
	
	
	public Optional<?> cadastrarPostagem(Postagem novaPostagem) {
		Optional<Tema> objetoExistente = repositorioT.findById(novaPostagem.getTemaRelacionado().getIdTema());
		return repositorioU.findById(novaPostagem.getCriador().getIdUsuario()).map(usuarioExistente -> {
			if (objetoExistente.isPresent()) {
				novaPostagem.setCriador(usuarioExistente);
				novaPostagem.setTemaRelacionado(objetoExistente.get());
				return Optional.ofNullable(repositorioP.save(novaPostagem));
			} else {
				return Optional.empty();
			}
		}).orElseGet(() -> {
			return Optional.empty();
		});
	}
}
