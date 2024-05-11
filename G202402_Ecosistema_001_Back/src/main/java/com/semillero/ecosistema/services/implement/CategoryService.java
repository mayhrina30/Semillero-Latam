package com.semillero.ecosistema.services.implement;

import com.semillero.ecosistema.DTO.CategoryDTO;
import com.semillero.ecosistema.mapper.CategoryMapper;
import com.semillero.ecosistema.repositories.ICategoryRepository;
import com.semillero.ecosistema.services.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@Service

public class CategoryService implements ICategoryService {
    @Autowired
    private ICategoryRepository categoryRepository;
    @Autowired
    private CategoryMapper categoryMapper;

   public ResponseEntity<?> getCategories(){
           List<CategoryDTO> categories = categoryRepository.findAll()
                   .stream()
                   .map(category -> categoryMapper.toDto(category)).toList();
           return ResponseEntity.ok(categories);
   }
}
