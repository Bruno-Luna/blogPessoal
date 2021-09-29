package com.BlogPessoal.projeto.generation.repositorios;


import com.BlogPessoal.projeto.generation.modelos.Postagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostagemRepositorio extends JpaRepository<Postagem, Long> {


    /**
     * Método utilizado para pesquisar coluna titulo ContainigIgnoreCase
     *
     * @param titulo do tipo String
     * @return Lista de Postagens
     * @author Bruno Luna
     */

    List<Postagem> findAllByTituloContainingIgnoreCase(String titulo);
}
