package com.semillero.ecosistema.repositories;

import com.semillero.ecosistema.entities.Image;
import com.semillero.ecosistema.entities.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface IPublicationRepository extends JpaRepository<Publication, Long> {
    Optional<Publication> findPublicationById(Long id);
    Optional<Publication> findPublicationByTitle (String title);

    @Query(value = "SELECT p FROM Image p WHERE publicationId = ?1")
    List<Image> findImageByPublicationId(Long publicationId);

}
