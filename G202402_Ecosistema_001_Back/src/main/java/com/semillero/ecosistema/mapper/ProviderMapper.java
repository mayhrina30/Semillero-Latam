package com.semillero.ecosistema.mapper;

import com.semillero.ecosistema.DTO.*;
import com.semillero.ecosistema.entities.*;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
@Component
public interface ProviderMapper {

    ProviderDTO toDto (Provider provider);
    Provider toEntity (ProviderDTO providerDTO );

    List<ProviderDTO> listToDto(List<Provider> provider);
    CountryDTO countryToDto (Country country);

    ProvinceDTO provinceToDto (Province province);

    ImageDTO imageToDto (Image image);
    List<ImageDTO> imageListToDto (List<Image> imageList);

}
