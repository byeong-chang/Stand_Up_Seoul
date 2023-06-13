package com.project.backend.accounts.repository.entity;

import com.project.backend.places.repository.entity.Hotplaces;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor(force = true)
@AllArgsConstructor
@Data
@Table(name = "hotplace_like")
public class HotplaceLike {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="hotplace_id")
    private Hotplaces hotplaces;

    @ManyToOne
    @JoinColumn(name="users_id")
    private Users users;

}
