package com.project.backend.accounts.entity;

import com.sun.istack.NotNull;
import lombok.*;


import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor(force = true)
@AllArgsConstructor
@Data
@Table(name = "marketAdmin")
public class MarketAdmin {

    @Id
    @Column(name = "email", length = 50)
    private String email;

    @NotNull
    @Column(name = "password", length = 50)
    private String password;

    @NotNull
    @Column(name = "phone_number", length = 15)
    private String phoneNumber;

    @NotNull
    @Column(name = "market_name", length = 50)
    private String marketName;

    @NotNull
    @Column(name = "market_phone_number", length = 15)
    private String marketPhoneNumber;

    @NotNull
    @Column(name = "market_address", columnDefinition = "TEXT")
    private String marketAddress;

}
