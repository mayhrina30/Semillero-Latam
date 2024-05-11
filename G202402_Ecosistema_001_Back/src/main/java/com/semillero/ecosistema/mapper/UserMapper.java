package com.semillero.ecosistema.mapper;

import com.semillero.ecosistema.DTO.*;
import com.semillero.ecosistema.entities.Provider;
import com.semillero.ecosistema.entities.Publication;
import com.semillero.ecosistema.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

import java.util.List;
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
@Component
public interface UserMapper {
    User toEntity (UserDTO userDTO);
    UserDTO toDto (User user);

    List<ProviderDTO> toDtoProvider (List<Provider> provider);

    List<PublicationDTO> toDTOPublication (List<Publication> publications);
}
