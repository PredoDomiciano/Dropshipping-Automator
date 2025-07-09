package com.DropBots.Dropshipping.Auto.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data // Anotação do Lombok que cria getters, setters, toString, etc.
@Entity
@Table(name = "pedidos")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String customerAddress;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private Long productIdOnSupplier;

    @Column(nullable = false)
    private BigDecimal amountPaid;

    @Column
    private String status; // Ex: PENDENTE, PROCESSANDO, FALHA_AUTOMACAO, CONCLUIDO

    @Column
    private LocalDateTime creationDate;
}