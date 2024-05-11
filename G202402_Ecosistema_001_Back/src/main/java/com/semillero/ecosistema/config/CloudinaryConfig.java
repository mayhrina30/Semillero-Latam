package com.semillero.ecosistema.config;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Value("${cloudinary.name}")
    private String cloudName;

    @Value("${cloudinary.api.key}")
    private String cloudKey;

    @Value("${cloudinary.api.secret}")
    private String cloudSecret;
    @Bean
    public Cloudinary getCloudinary(){
        Map config = new HashMap<>();
        config.put("cloud_name",cloudName);
        config.put("api_key",cloudKey);
        config.put("api_secret",cloudSecret);
        config.put("secure",true);
        return new Cloudinary(config);
    }

}
