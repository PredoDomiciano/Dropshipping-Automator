package com.DropBots.Dropshipping.Auto.service;

import com.DropBots.Dropshipping.Auto.entity.Product;
import com.DropBots.Dropshipping.Auto.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // 1. ADICIONE ESTA IMPORTAÇÃO

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Transactional // 2. ADICIONE ESTA ANOTAÇÃO
    public Product createProduct(Product product) {
        // Agora esta operação será transacional e garantirá o salvamento
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}