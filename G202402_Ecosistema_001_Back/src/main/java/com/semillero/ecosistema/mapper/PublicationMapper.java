package com.semillero.ecosistema.mapper;

import com.semillero.ecosistema.DTO.ImageDTO;
import com.semillero.ecosistema.DTO.PublicationDTO;
import com.semillero.ecosistema.entities.Image;
import com.semillero.ecosistema.entities.Publication;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
@Component
public interface PublicationMapper {
    Publication toEntity (PublicationDTO publicationDTO);
    PublicationDTO toDTO (Publication publication);

    List<PublicationDTO> toListDTO (List<Publication> publicationList );
    List<Publication> toListEntity (List<PublicationDTO> publicationsDTO);
    ImageDTO toDTO (Image image);
    List<ImageDTO> toListImageDTO (List<Image> images);
}
