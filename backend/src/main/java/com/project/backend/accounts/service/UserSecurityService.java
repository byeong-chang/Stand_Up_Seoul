package com.project.backend.accounts.service;

import com.project.backend.accounts.repository.UsersRepository;
import com.project.backend.accounts.repository.entity.Users;
import com.project.backend.accounts.role.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserSecurityService implements UserDetailsService {
    private final UsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Users> _users = this.usersRepository.findByEmail(email);
        if (_users.isEmpty()) {
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
        }
        Users users = _users.get();
        List<GrantedAuthority> authorities = new ArrayList<>();
        if ("admin".equals(email)) {
            authorities.add(new SimpleGrantedAuthority(UserRole.ADMIN.getValue()));
        } else {
            authorities.add(new SimpleGrantedAuthority(UserRole.USER.getValue()));
        }
        return (UserDetails) new Users(users.getEmail(), users.getPassword(), authorities);
    }

}
