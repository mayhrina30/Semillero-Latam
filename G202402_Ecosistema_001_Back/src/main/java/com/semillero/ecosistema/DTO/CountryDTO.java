package com.semillero.ecosistema.DTO;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CountryDTO {

    private Long id;
    private String name;
    private List<ProvinceDTO> provinces;

}
