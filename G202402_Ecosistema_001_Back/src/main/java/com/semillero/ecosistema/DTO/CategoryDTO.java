package com.semillero.ecosistema.DTO;


import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryDTO {
    private Long id;
    private String name;
    private String image;
}
