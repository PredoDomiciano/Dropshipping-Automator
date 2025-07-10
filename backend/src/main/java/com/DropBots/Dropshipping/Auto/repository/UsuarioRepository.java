package com.DropBots.Dropshipping.Auto.repository;

import com.DropBots.Dropshipping.Auto.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByEmail(String email);
}