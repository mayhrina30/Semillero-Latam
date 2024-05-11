package com.semillero.ecosistema.services.implement;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.semillero.ecosistema.entities.Image;
import com.semillero.ecosistema.entities.Provider;
import com.semillero.ecosistema.entities.Publication;
import com.semillero.ecosistema.repositories.IPublicationRepository;
import com.semillero.ecosistema.repositories.ImageRepository;
import com.semillero.ecosistema.repositories.ProviderRepository;
import com.semillero.ecosistema.services.ICloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Service
public class CloudinaryServiceImpl implements ICloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private IPublicationRepository publicationRepository;

    @Autowired
    private ProviderRepository providerRepository;

    @Override
    public ResponseEntity<?> uploadPublication(MultipartFile multipartFile,Long publicationId, String width, String height)  {
        try{
            BufferedImage bufferedImage = ImageIO.read(multipartFile.getInputStream());
            if(bufferedImage == null){
                return new ResponseEntity("Image not valid", HttpStatus.BAD_REQUEST);
            }
            Optional<Publication> publication = publicationRepository.findById(publicationId);
            if(publication.isEmpty()){
                return ResponseEntity.notFound().build();
            }
            File file = convert(multipartFile);
            Map data =  cloudinary.uploader().upload(file,Map.of());
            file.delete();
            String url = data.get("secure_url").toString();
            String id = data.get("public_id").toString();
            Image image = new Image();
            image.setURL(url);
            image.setImageId(id);
            image.setPublicationId(publicationId);
            if (height.equals("null")){
                String heightCloud = data.get("height").toString();
                image.setHeight(heightCloud);
            }else {
                image.setHeight(height);
            }
            if (width.equals("null")){
                String widthCloud = data.get("width").toString();
                image.setWidth(widthCloud);
            }else {
                image.setWidth(width);
            }
            imageRepository.save(image);
            return  ResponseEntity.ok().body(data);
        }catch (IOException e){
            throw new RuntimeException("Image uploading fail");
        }
    }

    @Override
    public ResponseEntity<?> uploadProvider(MultipartFile multipartFile,Long providerId, String width, String height)  {
        try{
            BufferedImage bufferedImage = ImageIO.read(multipartFile.getInputStream());
            if(bufferedImage == null){
                return new ResponseEntity("Image not valid", HttpStatus.BAD_REQUEST);
            }
            Optional<Provider> provider = providerRepository.findById(providerId);
            if(provider.isEmpty()){
                return ResponseEntity.notFound().build();
            }
            File file = convert(multipartFile);
            Map data =  cloudinary.uploader().upload(file,Map.of());
            file.delete();
            String url = data.get("secure_url").toString();
            String id = data.get("public_id").toString();
            Image image = new Image();
            image.setURL(url);
            image.setImageId(id);
            image.setProviderId(providerId);
            if (height.equals("null")){
                String heightCloud = data.get("height").toString();
                image.setHeight(heightCloud);
            }else {
                image.setHeight(height);
            }
            if (width.equals("null")){
                String widthCloud = data.get("width").toString();
                image.setWidth(widthCloud);
            }else {
                image.setWidth(width);
            }
            imageRepository.save(image);
            return  ResponseEntity.ok().body(data);
        }catch (IOException e){
            throw new RuntimeException("Image uploading fail");
        }
    }

    @Override
    public ResponseEntity<?> delete(String id) throws IOException {
        Map result = cloudinary.uploader().destroy(id, ObjectUtils.emptyMap());
        return ResponseEntity.ok().body(result);
    }

    private File convert(MultipartFile multipartFile) throws IOException {
        File file = new File(multipartFile.getOriginalFilename());
        FileOutputStream fo = new FileOutputStream(file);
        fo.write(multipartFile.getBytes());
        fo.close();
        return file;
    }
}
