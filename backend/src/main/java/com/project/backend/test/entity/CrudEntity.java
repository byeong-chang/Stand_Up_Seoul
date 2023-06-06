package com.project.backend.test.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "sample_member")
public class CrudEntity {

    @Id
    @Column(name = "name")
    private String name;

    @Column(name = "age")
    private int age;
}
