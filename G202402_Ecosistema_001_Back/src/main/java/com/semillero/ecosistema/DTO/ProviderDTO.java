package com.semillero.ecosistema.DTO;


import com.semillero.ecosistema.entities.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProviderDTO {
    private Long id;
    private String name;
    private String description;
    private String phone;
    private String email;
    private String facebook;
    private String instagram;
    private CountryDTO country;
    private ProvinceDTO province;
    private State state;
    private List<ImageDTO> images;
    private CategoryDTO category;
    private boolean active;
    private boolean deleted;
    private String feedback;
}
