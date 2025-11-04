package com.app.logistica.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Invoices")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String invoiceCode;

    private String description;

    @OneToOne
    @JoinColumn(
            name = "order_Id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_orderToInvoice")
    )
    @JsonManagedReference
    private Order order;
}
