package com.semillero.ecosistema.jwt;

import com.semillero.ecosistema.entities.User;
import com.semillero.ecosistema.repositories.IUserRepository;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Slf4j
@Service
public class CustomerDetailsService implements UserDetailsService {
    @Autowired
    private IUserRepository iUserRepository;
    @Getter
    private User userDetail;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userDetail2 = iUserRepository.findByUserName(username);
        if(userDetail2.isPresent()){
            return new org.springframework.security.core.userdetails.User(userDetail2.get().getUserName(),"", new ArrayList<>());
        }else{
            throw new UsernameNotFoundException("Usuario no encontrado");
        }
    }
}
