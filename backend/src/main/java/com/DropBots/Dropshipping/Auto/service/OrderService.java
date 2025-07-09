package com.DropBots.Dropshipping.Auto.service;

import com.DropBots.Dropshipping.Auto.automation.SupplierAutomationService;
import com.DropBots.Dropshipping.Auto.dto.CreateOrderRequest;
import com.DropBots.Dropshipping.Auto.entity.Order;
import com.DropBots.Dropshipping.Auto.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private SupplierAutomationService automationService;

    @Transactional // Garante que as operações de banco de dados sejam consistentes
    public Order createAndProcessOrder(CreateOrderRequest request) {
        // 1. Converte o DTO (dados da requisição) para uma Entidade (objeto do banco)
        Order newOrder = new Order();
        newOrder.setCustomerName(request.getCustomerName());
        newOrder.setCustomerAddress(request.getCustomerAddress());
        newOrder.setProductName(request.getProductName());
        newOrder.setProductIdOnSupplier(request.getProductIdOnSupplier());
        newOrder.setAmountPaid(request.getAmountPaid());
        newOrder.setStatus("PROCESSANDO");
        newOrder.setCreationDate(LocalDateTime.now());

        // 2. Salva o pedido no banco de dados
        Order savedOrder = orderRepository.save(newOrder);
        System.out.println("Pedido " + savedOrder.getId() + " salvo no banco de dados.");

        // 3. Tenta executar a automação
        try {
            automationService.purchaseFromSupplier(savedOrder);
            savedOrder.setStatus("CONCLUIDO");
        } catch (Exception e) {
            System.err.println("!! ATENÇÃO: Falha na automação do pedido " + savedOrder.getId() + ": " + e.getMessage());
            savedOrder.setStatus("FALHA_AUTOMACAO");
        }

        // 4. Atualiza o pedido com o status final e retorna
        return orderRepository.save(savedOrder);
    }
}