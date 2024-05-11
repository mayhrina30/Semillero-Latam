package com.semillero.ecosistema.DTO;

import com.semillero.ecosistema.entities.Role;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private String name;
    private String lastName;
    private Boolean deleted;
    private Role role;
    private String phone;
    private String userName;
    private String picture;
    private List<PublicationDTO> publications;
    private List<ProviderDTO> provider;
}
