package com.semillero.ecosistema.mapper;

import com.semillero.ecosistema.DTO.CountryDTO;
import com.semillero.ecosistema.entities.Country;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
@Component
public interface CountryMapper {

    Country toEntity (CountryDTO countryDTO);

    CountryDTO toDTO (Country country);

    List<CountryDTO> listToDto(List<Country> countries);
}
