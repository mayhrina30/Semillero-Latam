package com.semillero.ecosistema.DTO;

import com.semillero.ecosistema.entities.State;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StateDto {
    private State state;
    private String feedback;
}
