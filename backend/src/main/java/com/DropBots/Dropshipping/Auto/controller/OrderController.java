package com.DropBots.Dropshipping.Auto.controller;

import com.DropBots.Dropshipping.Auto.dto.CreateOrderRequest;
import com.DropBots.Dropshipping.Auto.entity.Order;
import com.DropBots.Dropshipping.Auto.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderRequest request) {
        try {
            Order processedOrder = orderService.createAndProcessOrder(request);
            return new ResponseEntity<>(processedOrder, HttpStatus.CREATED); // Retorna 201 Created
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build(); // Retorna 500 Internal Server Error
        }
    }
}