package com.DropBots.Dropshipping.Auto.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor // <-- ESSA É CRUCIAL: Cria o construtor vazio
@AllArgsConstructor // <-- Boa prática: Cria um construtor com todos os campos
@Entity
@Table(name = "produtos") // A tabela continua a mesma
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // Nome do produto

    @Column(length = 1000) // Aumentamos o tamanho para descrições longas
    private String description; // DESCRIÇÃO (novo)

    @Column(nullable = false)
    private double price; // Preço de venda

    @Column(nullable = false)
    private String category; // CATEGORIA (novo)

    @Column(nullable = false)
    private String image; // URL DA IMAGEM (novo)

    @Column
    private double rating; // AVALIAÇÃO (novo)

    @Column
    private int stock; // ESTOQUE (novo)

    // Mantemos os campos originais do backend
    @Column(nullable = false, length = 1000)
    private String supplierUrl; // URL no fornecedor

    @Column
    private double supplierPrice; // Preço no fornecedor
}