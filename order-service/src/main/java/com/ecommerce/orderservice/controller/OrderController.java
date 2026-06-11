package com.ecommerce.orderservice.controller;

import org.springframework.web.bind.annotation.*;
import com.ecommerce.orderservice.entity.Order;
import com.ecommerce.orderservice.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        return service.placeOrder(order);
    }
}