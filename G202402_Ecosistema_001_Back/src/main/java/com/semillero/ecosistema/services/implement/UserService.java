package com.semillero.ecosistema.services.implement;

import com.nimbusds.jose.shaded.gson.Gson;
import com.semillero.ecosistema.DTO.*;
import com.semillero.ecosistema.entities.*;
import com.semillero.ecosistema.jwt.JwtUtil;
import com.semillero.ecosistema.mapper.ProviderMapper;
import com.semillero.ecosistema.mapper.PublicationMapper;
import com.semillero.ecosistema.mapper.UserMapper;
import com.semillero.ecosistema.repositories.*;
import com.semillero.ecosistema.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private ProviderRepository providerRepository;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private ProviderMapper providerMapper;
    @Autowired
    private PublicationMapper publicationMapper;
    @Autowired
    private IPublicationRepository publicationRepository;

    private final JwtUtil jwtUtil;

    public UserService(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }


    @Override
    public ResponseEntity<?> deleteUser(Long id) {
        User user = userRepository.findById(id).orElse(null);
        assert user != null;
            userRepository.delete(user);
            return ResponseEntity.ok().build();

    }

    @Override
    public ResponseEntity<?> getUser(String email) {
        Optional<User> user = userRepository.findByUserName(email);
        if(user.isPresent()){
            User user1 = user.get();
            List<Provider> providerList = userRepository.findProviderByuserId(user1);
            List<Publication> publicationList = userRepository.findPublicationByuserId(user1);

            List<ProviderDTO> providerDTOS = userMapper.toDtoProvider(providerList);
            providerDTOS.forEach(providerDTO -> {
                List<Image> images = providerRepository.findImageByProviderId(providerDTO.getId());
                List<ImageDTO> imageDTOS = providerMapper.imageListToDto(images);
                providerDTO.setImages(imageDTOS);
            });

            List<PublicationDTO> publicationDTOS = userMapper.toDTOPublication(publicationList);
            publicationDTOS.forEach(publicationDTO -> {
                List<Image> images = publicationRepository.findImageByPublicationId(publicationDTO.getId());
                List<ImageDTO> imageDTOS = publicationMapper.toListImageDTO(images);
                publicationDTO.setImages(imageDTOS);
            });

            UserDTO userDTO = userMapper.toDto(user1);
            userDTO.setProvider(providerDTOS);
            userDTO.setPublications(publicationDTOS);
            return ResponseEntity.status(HttpStatus.OK).body(userDTO);
        }
        return ResponseEntity.badRequest().build();
    }

    @Override
    public ResponseEntity<?> saveUser(String token) {
        String urlString = "https://www.googleapis.com/oauth2/v3/userinfo";

        try {
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setRequestProperty("Authorization", "Bearer " + token);

            connection.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            Gson gson = new Gson();
            TokenResponseDTO data = gson.fromJson(String.valueOf(response), TokenResponseDTO.class);


            User user = new User();
            user.setUserName(data.getEmail());
            user.setName(data.getGiven_name());
            user.setLastName(data.getFamily_name());
            user.setRole(Role.USER);
            user.setDeleted(false);
            user.setPicture(data.getPicture());
            userRepository.save(user);
            List<String> roles = new ArrayList<>();
            roles.add(user.getRole().name());
            String jwtToken = jwtUtil.generateToken(user.getUserName(), roles,user.getName(),user.getLastName(),user.getPicture(),false);
            Token tokenMessage = new Token();
            tokenMessage.setMessage(jwtToken);
            return ResponseEntity.status(HttpStatus.CREATED).body(tokenMessage);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
    @Override
    public ResponseEntity<?> loginUser(String email) {
        Optional<User> user = userRepository.findByUserName(email);
        boolean location = false;
        if(user.isPresent() && !user.get().getDeleted()) {
            List<String> roles = new ArrayList<>();
            roles.add(user.get().getRole().name());
            if(user.get().getCountryId() != null || user.get().getProvinceId() != null){
                location = true;
            }
            String jwt = jwtUtil.generateToken(user.get().getUserName(), roles,user.get().getName(),user.get().getLastName(),user.get().getPicture(),location);
            Token tokenMessage = new Token();
            tokenMessage.setMessage(jwt);
            return ResponseEntity.ok().body(tokenMessage);
        }
        return ResponseEntity.badRequest().build();
    }

    @Override
    public String[] findAllUsersEmail() {
        String[] users = userRepository.findEmails();
        return users;
    }

}
