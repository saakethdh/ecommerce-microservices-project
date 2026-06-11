package com.ecommerce.inventoryservice.controller;

import org.springframework.web.bind.annotation.*;
import com.ecommerce.inventoryservice.entity.Inventory;
import com.ecommerce.inventoryservice.service.InventoryService;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    private final InventoryService service;

    public InventoryController(InventoryService service) {
        this.service = service;
    }

    @PostMapping
    public Inventory addInventory(@RequestBody Inventory inventory) {
        return service.saveInventory(inventory);
    }

    @GetMapping("/check/{productId}/{quantity}")
    public boolean checkStock(@PathVariable Long productId, @PathVariable Integer quantity) {
        return service.isInStock(productId, quantity);
    }
}