package com.semillero.ecosistema.services;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ICloudinaryService {

    ResponseEntity<?> uploadPublication(MultipartFile multipartFile,Long publicationId,String width,String height);

    ResponseEntity<?> uploadProvider(MultipartFile multipartFile,Long providerId,String width,String height);
    ResponseEntity<?> delete (String id) throws IOException;

}
