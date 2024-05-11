package com.semillero.ecosistema.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Provider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    private String name;
    @NonNull
    private String description;
    @NonNull
    private String phone;
    @NonNull
    private String email;

    private String facebook;

    private String instagram;

    @ManyToOne
    @JoinColumn(name = "country_id",updatable = false,insertable = false)
    private Country country;

    @Column(name = "country_id")
    private Long countryId;

    @ManyToOne
    @JoinColumn(name = "province_id",updatable = false,insertable = false)
    private Province province;

    @Column(name = "province_id")
    private Long provinceId;

    @Enumerated(EnumType.STRING)
    private State state;

    @ManyToOne
    @JoinColumn(name = "category_id",updatable = false,insertable = false)
    private Category category;

    @Column(name = "category_id")
    private Long categoryId;

    private boolean active;

    private boolean deleted;

    private String feedback;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDate creationDate;
}
