package com.semillero.ecosistema.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProvinceDTO {
    private Long id;
    private String name;
    private Long countryId;
}