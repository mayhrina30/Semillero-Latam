package com.semillero.ecosistema.services.implement;

import com.semillero.ecosistema.DTO.ImageDTO;
import com.semillero.ecosistema.DTO.PublicationDTO;
import com.semillero.ecosistema.entities.Image;
import com.semillero.ecosistema.entities.Publication;
import com.semillero.ecosistema.entities.User;
import com.semillero.ecosistema.mapper.PublicationMapper;
import com.semillero.ecosistema.repositories.IPublicationRepository;
import com.semillero.ecosistema.repositories.IUserRepository;
import com.semillero.ecosistema.services.IPublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PublicationService implements IPublicationService {
    @Autowired
    private IPublicationRepository publicationRepository;
    @Autowired
    public IUserRepository iUserRepository;

    @Autowired
    private PublicationMapper publicationMapper;

    @Override
    public ResponseEntity<?> getPublications() {
        List<Publication> publicationList = publicationRepository.findAll();
        List<PublicationDTO> publicationDTOList = publicationMapper.toListDTO(publicationList);

        publicationDTOList.forEach(publicationDTO -> {
            List<Image> images = publicationRepository.findImageByPublicationId(publicationDTO.getId());
            List<ImageDTO> imagesDTO = publicationMapper.toListImageDTO(images);
            publicationDTO.setImages(imagesDTO);
        });


        return ResponseEntity.ok(publicationDTOList);
    }

    @Override
    public ResponseEntity<?> getPublicationsActives() {
        List<Publication> publicationList = publicationRepository.findAll();
        List<PublicationDTO> publicationDtoList = publicationMapper.toListDTO(publicationList);
        List<PublicationDTO> publis = publicationDtoList.stream()
                .filter(publication -> {
                    if (!publication.getDeleted()) {
                        List<Image> images = publicationRepository.findImageByPublicationId(publication.getId());
                        List<ImageDTO> imagesDTO = publicationMapper.toListImageDTO(images);
                        publication.setImages(imagesDTO);
                        return true;
                    } else {
                        return false;
                    }

                })
                .toList();

        return ResponseEntity.ok(publis);
    }

    @Override
    public ResponseEntity<?> getPublication(Long id) {
        Optional<Publication> res = publicationRepository.findPublicationById(id);
        if (res.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Publication publication = res.get();
        List<Image> images = publicationRepository.findImageByPublicationId(publication.getId());
        List<ImageDTO> imagesDTO = publicationMapper.toListImageDTO(images);
        PublicationDTO publicationDTO = publicationMapper.toDTO(publication);
        publicationDTO.setImages(imagesDTO);
        updateViews(publication.getId()).getBody();
        return ResponseEntity.ok(publicationDTO);


    }

    @Override
    public ResponseEntity<?> createPublication(PublicationDTO publicationDto, String email) throws URISyntaxException {
        Optional<User> user = iUserRepository.findByUserName(email);
        Optional<Publication> res = publicationRepository.findPublicationByTitle(publicationDto.getTitle());
        if (res.isPresent() || user.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Publication publication = publicationMapper.toEntity(publicationDto);
        publication.setCreationDate(LocalDate.now());
        publication.setUserId(user.get().getId());

        Publication publication2 = publicationRepository.save(publication);

        PublicationDTO publicationDTO = publicationMapper.toDTO(publication2);
        return ResponseEntity.created(new URI("/publication")).body(publicationDTO);


    }

    @Override
    public ResponseEntity<?> updatePublication(PublicationDTO publicationDto) {
        Optional<Publication> res = publicationRepository.findPublicationById(publicationDto.getId());
        if (res.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Publication publication1 = publicationMapper.toEntity(publicationDto);
        publication1.setCreationDate(res.get().getCreationDate());

        Publication publication = publicationRepository.save(publication1);
        PublicationDTO publicationDTO = publicationMapper.toDTO(publication);
        return ResponseEntity.ok(publicationDTO);

    }

    @Override
    public ResponseEntity<?> deletedPublication(Long id) {
        Optional<Publication> publicationExist = publicationRepository.findPublicationById(id);
        if (publicationExist.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Publication publication = publicationExist.get();
        publicationRepository.save(Publication.builder()
                .id(id)
                .title(publication.getTitle())
                .description(publication.getDescription())
                .deleted(!publication.getDeleted())
                .creationDate(publication.getCreationDate())
                .numberOfViews(publication.getNumberOfViews())
                .build());

        return ResponseEntity.ok().build();

    }

    @Override
    public ResponseEntity<?> updateViews(Long id) {
        Optional<Publication> publicationExist = publicationRepository.findPublicationById(id);
        if (publicationExist.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Publication publication = publicationExist.get();
        publicationRepository.save(Publication.builder()
                .id(publication.getId())
                .title(publication.getTitle())
                .description(publication.getDescription())
                .deleted(publication.getDeleted())
                .creationDate(publication.getCreationDate())
                .numberOfViews(publication.getNumberOfViews() + 1)
                .build());

        return ResponseEntity.ok().build();
    }
}
