package com.semillero.ecosistema.services.implement;

import com.nimbusds.jose.shaded.gson.Gson;
import com.nimbusds.jose.shaded.gson.JsonObject;
import com.semillero.ecosistema.DTO.Token;
import com.semillero.ecosistema.entities.Country;
import com.semillero.ecosistema.entities.Province;
import com.semillero.ecosistema.entities.User;
import com.semillero.ecosistema.jwt.JwtUtil;
import com.semillero.ecosistema.repositories.CountryRepository;
import com.semillero.ecosistema.repositories.IUserRepository;
import com.semillero.ecosistema.repositories.ProvinceRepository;
import com.semillero.ecosistema.services.ILocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LocationService implements ILocationService {

    private static final String BASE_URL = "http://api.geonames.org/findNearbyJSON";
    @Value("${location.username}")
    private String USERNAME;

    @Autowired
    private ProvinceRepository provinceRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private IUserRepository userRepository;

    private final JwtUtil jwtUtil;

    public LocationService(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }


    @Override
    public ResponseEntity<?> location(Double latitude, Double length, String userName) throws IOException {

        String urlString = BASE_URL + "?lat=" + latitude + "&lng=" + length + "&username=" + USERNAME;

        URL url = new URL(urlString);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");

        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();


        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(response.toString(), JsonObject.class);
        JsonObject respuestaJson = jsonObject.getAsJsonObject();

        String countryName = respuestaJson.get("geonames").getAsJsonArray().get(0).getAsJsonObject().get("countryName").getAsString();
        Optional<Country> country = countryRepository.findByName(countryName);
        if(country.isEmpty()){
            Country country1 = new Country();
            country1.setName(countryName);
            countryRepository.save(country1);
        }


        String provinceName = respuestaJson.get("geonames").getAsJsonArray().get(0).getAsJsonObject().get("adminName1").getAsString();
        Optional<Province> province = provinceRepository.findByName(provinceName);

        Optional<User> user = userRepository.findByUserName(userName);
        if(user.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        if(country.isEmpty()){
            Optional<Country> country1 = countryRepository.findByName(countryName);
            user.get().setCountryId(country1.get().getId());
        }
        if(country.isPresent()){
            user.get().setCountryId(country.get().getId());
        }


        if(province.isEmpty()){
            Province province1 = new Province();
            Optional<Country> country1 = countryRepository.findByName(countryName);
                province1.setCountryId(country1.get().getId());

            province1.setName(provinceName);
           Province province2 = provinceRepository.save(province1);
            user.get().setProvinceId(province2.getId());
        }
        if(province.isPresent()){
            user.get().setProvinceId(province.get().getId());
        }
        userRepository.save(user.get());
        List<String> roles = new ArrayList<>();
        roles.add(user.get().getRole().name());

       String jwt = jwtUtil.generateToken(userName,roles,user.get().getName(),user.get().getLastName(),user.get().getPicture(),true);
        Token tokenMessage = new Token();
        tokenMessage.setMessage(jwt);
        return ResponseEntity.ok().body(tokenMessage);
    }
}
