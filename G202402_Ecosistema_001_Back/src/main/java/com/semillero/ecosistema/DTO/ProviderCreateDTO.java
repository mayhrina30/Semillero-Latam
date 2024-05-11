package com.semillero.ecosistema.DTO;

import com.semillero.ecosistema.entities.State;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProviderCreateDTO {
    private Long id;
    private String name;
    private String description;
    private String phone;
    private String email;
    private String facebook;
    private String instagram;
    private Long countryId;
    private Long provinceId;
    private State state;
    private Long categoryId;
    private boolean active;
    private boolean deleted;
    private String feedback;
}
