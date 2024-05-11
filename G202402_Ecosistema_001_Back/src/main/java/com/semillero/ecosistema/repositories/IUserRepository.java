package com.semillero.ecosistema.repositories;

import com.semillero.ecosistema.entities.Provider;
import com.semillero.ecosistema.entities.Publication;
import com.semillero.ecosistema.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUserName(String userName);

     @Query(value = "SELECT p FROM Provider p WHERE user = ?1")
    List<Provider> findProviderByuserId(User user);

    @Query(value = "SELECT p FROM Publication p WHERE user = ?1")
    List<Publication> findPublicationByuserId(User user);

    @Query(value = "SELECT user_name FROM user",nativeQuery = true)
    String[] findEmails();

}
