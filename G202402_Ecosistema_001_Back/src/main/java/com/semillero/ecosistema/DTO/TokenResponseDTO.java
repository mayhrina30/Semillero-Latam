package com.semillero.ecosistema.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TokenResponseDTO {

    private String email;
    private boolean email_verified;
    private String family_name;
    private String given_name;
    private String locale;
    private String name;
    private String picture;
    private String sub;

}