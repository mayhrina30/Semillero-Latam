package com.semillero.ecosistema.controllers;

import com.semillero.ecosistema.entities.Image;
import com.semillero.ecosistema.services.ICloudinaryService;
import com.semillero.ecosistema.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private ICloudinaryService cloudinaryService;

    @Autowired
    private ImageService imageService;

    @PostMapping("/upload/publication")
    public ResponseEntity<?> upload(@RequestParam MultipartFile image,@RequestParam Long publicationId
                                    ,@RequestParam String height,
                                    @RequestParam String width){
        return cloudinaryService.uploadPublication(image,publicationId,width,height);
    }

    @PostMapping("/upload/provider")
    public ResponseEntity<?> uploadProvider(@RequestParam MultipartFile image,
                                    @RequestParam Long providerId, @RequestParam(required = false) String height,
                                    @RequestParam(required = false) String width){
        return cloudinaryService.uploadProvider(image,providerId,width,height);
    }


    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam Long id) throws IOException {
        if(!imageService.exists(id)){
            return ResponseEntity.notFound().build();
        }
        Image image = imageService.getById(id).get();
         cloudinaryService.delete(image.getImageId());
        imageService.delete(id);
        return ResponseEntity.ok().build();
    }

}
