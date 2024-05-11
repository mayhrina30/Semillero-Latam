package com.semillero.ecosistema.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Publication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String title;
    @Column(length = 2500)
    private String description;
    private Boolean deleted;
    private LocalDate creationDate;
    private Long numberOfViews;
    @ManyToOne
    @JoinColumn(name = "user_id", updatable = false, insertable = false)
    private User user;
    @Column(name = "user_id")
    private Long userId;
}
