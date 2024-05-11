package com.semillero.ecosistema.services.implement;

import com.semillero.ecosistema.entities.Image;
import com.semillero.ecosistema.repositories.ImageRepository;
import com.semillero.ecosistema.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageRepository imageRepository;


    @Override
    public ResponseEntity<?> delete(Long id) {
        Optional<Image> image = imageRepository.findById(id);
        if(image.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        imageRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Override
    public Optional<Image> getById(Long id) {
        Optional<Image> image = imageRepository.findById(id);
        return image;
    }

    @Override
    public boolean exists(Long id) {
        return imageRepository.existsById(id);
    }
}
