package com.app.logistica.entities;

import com.app.logistica.entities.embedded.Dimensions;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Packages")
@Data
@AllArgsConstructor
@NoArgsConstructor
// @ManyToOne → Order
public class Package {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_dependant_order"))
    @JsonManagedReference
     private Order order;

    @Embedded
    private Dimensions dimensions;

    private float weight;

    public Package(Long id, Dimensions dimensions, float weight) {
        this.id = id;
        this.dimensions = dimensions;
        this.weight = weight;
    }
}

