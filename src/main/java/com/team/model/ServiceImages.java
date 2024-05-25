package com.team.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "IMAGES")
public class ServiceImages {
    @Id
    private Integer imageID;
    private Integer serviceID;

    private String imageURL;
}
