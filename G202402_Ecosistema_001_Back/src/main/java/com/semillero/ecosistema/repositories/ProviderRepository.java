package com.semillero.ecosistema.repositories;

import com.semillero.ecosistema.entities.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Long> {

    List<Provider> findAllByStateAndDeletedFalse(State state);

    List<Provider> findByCategoryAndStateAndDeletedFalse(Category category, State state);

    List<Provider> findByNameContainingIgnoreCase(String name);

    @Query(value = "SELECT i FROM Image i WHERE providerId = ?1")
    List<Image> findImageByProviderId(Long providerId);

    @Query("SELECT COUNT(p) FROM Provider p WHERE p.category.id = :categoryId")
    Long countByCategoryId(@Param("categoryId") Long categoryId);

    Long countProvidersByState(State state);

    List<Provider> findByProvinceId(Long provinceId);

    List<Provider> findByCountryId(Long countryId);

    @Query("SELECT p FROM Provider p WHERE p.state = ACCEPTED")
    List<Provider> findProvidersStateAccepted();

}
