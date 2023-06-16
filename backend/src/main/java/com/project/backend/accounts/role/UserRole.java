package com.project.backend.accounts.role;

import lombok.Getter;
import org.apache.catalina.User;

@Getter
public enum UserRole {
    ADMIN("ROLE_ADMIN"),
    USER("USER_ROLE");

    UserRole(String value) {
        this.value = value;
    }

    private String value;

}
