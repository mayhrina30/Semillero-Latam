package com.semillero.ecosistema.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PublicationDTO {
    private Long id;
    private String title;
    private String description;
    private Boolean deleted;
    private LocalDate creationDate;
    private Long numberOfViews;
    private List<ImageDTO> images;
}
