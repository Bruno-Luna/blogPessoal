package com.BlogPessoal.projeto.generation.servicos;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BlogPessoal.projeto.generation.modelos.Tema;
import com.BlogPessoal.projeto.generation.repositorios.TemaRepositorio;

@Service
public class TemaServicos {
	
	@Autowired
	private TemaRepositorio repositorio;
	
	/**
     * Método utilizado para alterar um tema que retorna um Optional com Tema caso
     * correto ou um Optional.empyt() caso id do tema não exista.
     * 
     * @param temaParaAlterar do tipo Tema
     * @return Optional com Tema alterado
     * @author Bruno Luna
     */
	
	public Optional<Tema> atualizarTema(Tema temaParaAlterar){
		return repositorio.findById(temaParaAlterar.getIdTema())
				.map(temaExistente -> {
					temaExistente.setTema(temaParaAlterar.getTema());
					return Optional.ofNullable(repositorio.save(temaExistente));
				}).orElseGet(() -> {
					return Optional.empty();
				});
	}
}
