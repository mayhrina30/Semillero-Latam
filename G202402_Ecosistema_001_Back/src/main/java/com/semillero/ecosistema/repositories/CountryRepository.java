package com.semillero.ecosistema.repositories;

import com.semillero.ecosistema.entities.Country;
import com.semillero.ecosistema.entities.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
  @Query(value = "SELECT p FROM Province p WHERE countryId = ?1")
  List<Province> findProvinceByCountryId(Long countryId);

  Optional<Country> findByName(String name);
}


