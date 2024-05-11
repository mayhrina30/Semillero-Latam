package com.semillero.ecosistema.mapper;

import com.semillero.ecosistema.DTO.CategoryDTO;
import com.semillero.ecosistema.entities.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
@Component
public interface CategoryMapper {
    CategoryDTO toDto(Category category);
    Category toEntity(CategoryDTO categoryDTO);
}
