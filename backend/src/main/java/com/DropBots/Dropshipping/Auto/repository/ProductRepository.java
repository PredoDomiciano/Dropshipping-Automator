package com.DropBots.Dropshipping.Auto.repository;

import com.DropBots.Dropshipping.Auto.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}