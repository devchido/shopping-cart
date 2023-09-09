package com.example.redstore.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class TransactionStatusDto implements Serializable {
    private String status;
    private String message;
    private String data;
}
