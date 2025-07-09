package com.DropBots.Dropshipping.Auto.controller;

import com.DropBots.Dropshipping.Auto.entity.Product;
import com.DropBots.Dropshipping.Auto.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // O método de criar produto
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) { // <-- A ANOTAÇÃO MÁGICA É ESTA
        Product createdProduct = productService.createProduct(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    // O método de listar produtos
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }
}