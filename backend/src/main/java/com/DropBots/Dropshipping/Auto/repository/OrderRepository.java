package com.DropBots.Dropshipping.Auto.repository;

import com.DropBots.Dropshipping.Auto.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // O Spring Data JPA implementa os métodos básicos como save(), findById(), etc.
}