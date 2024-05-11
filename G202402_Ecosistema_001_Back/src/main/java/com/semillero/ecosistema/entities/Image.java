package com.semillero.ecosistema.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String URL;
    private String imageId;
    private String width;
    private String height;
    @ManyToOne
    @JoinColumn(name = "provider_id", updatable = false, insertable = false)
    private Provider provider;
    @Column(name = "provider_id")
    private Long providerId;

    @ManyToOne
    @JoinColumn(name = "publication_id", updatable = false, insertable = false)
    private Publication publication;
    @Column(name = "publication_id")
    private Long publicationId;
}
