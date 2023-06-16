package com.project.backend.accounts.repository.entity;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Data
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @NotNull
    @Column(name = "email", unique = true, nullable = false, length = 50)
    private String email;

    @NotNull
    @Column(name = "password", length = 50)
    private String password;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "birth")
    private LocalDateTime birth;

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
    private LocalDateTime createdDate;

    public Users(String email, String password, List<GrantedAuthority> authorities) {
    }
}
