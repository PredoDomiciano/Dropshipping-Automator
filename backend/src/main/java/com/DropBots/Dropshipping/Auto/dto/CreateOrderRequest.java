package com.DropBots.Dropshipping.Auto.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CreateOrderRequest {
    private String customerName;
    private String customerAddress;
    private String productName;
    private Long productIdOnSupplier;
    private BigDecimal amountPaid;
}