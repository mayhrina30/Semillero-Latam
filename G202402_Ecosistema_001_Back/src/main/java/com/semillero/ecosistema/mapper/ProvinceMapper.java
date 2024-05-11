package com.semillero.ecosistema.mapper;

import com.semillero.ecosistema.DTO.ProvinceDTO;
import com.semillero.ecosistema.entities.Province;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
@Component
public interface ProvinceMapper {

    Province toEntity(ProvinceDTO provinceDTO);



    ProvinceDTO toDTO(Province province);



    List<ProvinceDTO> toProvinceDTOList (List<Province> provinceList);
}
