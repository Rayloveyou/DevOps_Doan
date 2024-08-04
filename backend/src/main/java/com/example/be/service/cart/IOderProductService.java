package com.example.be.service.cart;

import com.example.be.model.OderProduct;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

public interface IOderProductService {
    OderProduct findByIdOderProduct(int id);
    Page<OderProduct> findAllOderProduct(Pageable pageable);
    Integer getTotalCodeAmount();
    void createOderProduct(OderProduct oderProduct);
    
    public List<OderProduct> getAllOderProduct();
}
