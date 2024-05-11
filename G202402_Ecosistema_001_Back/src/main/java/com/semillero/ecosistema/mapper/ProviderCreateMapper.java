package com.semillero.ecosistema.mapper;

import com.semillero.ecosistema.DTO.ProviderCreateDTO;
import com.semillero.ecosistema.entities.Provider;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
@Component
public interface ProviderCreateMapper {
    Provider toEntity(ProviderCreateDTO providerCreateDTO);
    ProviderCreateDTO toDto(Provider provider);
}
