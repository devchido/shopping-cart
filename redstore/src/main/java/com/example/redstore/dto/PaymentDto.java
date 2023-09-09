package com.example.redstore.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class PaymentDto implements Serializable {
    private String status;
    private String message;
    private String URL;
}
