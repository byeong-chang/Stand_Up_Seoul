package com.project.backend.accounts.repository.entity;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Data
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @NotNull
    @Column(name = "email",nullable = false, length = 50)
    private String email;

    @NotNull
    @Column(name = "password",nullable = false, length = 50)
    private String password;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "birth")
    private LocalDate birth;

    @NotNull
    @Column(name = "phone_number", unique = true, length = 15)
    private String phoneNumber;

    @Column(name = "user_address")
    private String userAddress;

    @Column(name = "review_count", columnDefinition = "INT DEFAULT 0")
    private int reviewCount;

    @NotNull
    @Column(name = "nickname", unique = true, length = 30)
    private String nickname;

    @UpdateTimestamp
    @Column(name = "created_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable= false)
    private LocalDate createdDate;

    @Column(name = "sex", nullable = false, length = 10)
    private String sex;
}
