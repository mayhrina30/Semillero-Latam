package com.semillero.ecosistema.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;

import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SQLDelete(sql = "UPDATE user SET deleted = true WHERE id=?")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    private String name;
    @NonNull
    private String lastName;
    @NonNull
    private Boolean deleted;
    @NonNull
    @Enumerated(EnumType.STRING)
    private Role role;
    private String picture;
    @Column(unique = true)
    private String userName;
    @OneToMany(mappedBy = "user")
    List<Provider> provider;

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
}
