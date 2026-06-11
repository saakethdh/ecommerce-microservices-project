package com.ecommerce.inventoryservice.service;

import org.springframework.stereotype.Service;
import com.ecommerce.inventoryservice.entity.Inventory;
import com.ecommerce.inventoryservice.repository.InventoryRepository;

@Service
public class InventoryService {

    private final InventoryRepository repository;

    public InventoryService(InventoryRepository repository) {
        this.repository = repository;
    }

    public Inventory saveInventory(Inventory inventory) {
        return repository.save(inventory);
    }

    public boolean isInStock(Long productId, Integer quantity) {
        return repository.findByProductId(productId)
                .map(inv -> inv.getStock() >= quantity)
                .orElse(false);
    }
}