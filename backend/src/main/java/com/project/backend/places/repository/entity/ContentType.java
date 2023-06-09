package com.project.backend.places.repository.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "content_type")
@Getter
public class ContentType {
    @Id
    private int id;
    @Column(name = "content_type_nm", length = 10)
    private String contentTypeName;
}
