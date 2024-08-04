package com.example.be.controller.order;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletResponse;
import com.example.be.model.OderProduct;
import com.example.be.service.cart.IOderProductService;

@RestController
@RequestMapping("/api/order")
@CrossOrigin("*")
public class OderProductController {

    @Autowired
    private IOderProductService iOderProductService;


    @GetMapping("/")
    public List<OderProduct> getAllOderProduct(HttpServletResponse response) {
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);
        return iOderProductService.getAllOderProduct();
    }


}
