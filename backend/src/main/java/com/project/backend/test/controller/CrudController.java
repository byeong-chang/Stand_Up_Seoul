package com.project.backend.test.controller;

import com.project.backend.test.entity.CrudEntity;
import com.project.backend.test.repository.CrudEntityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class CrudController {

    private final CrudEntityRepository crudEntityRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("update")
    public String updateMember(@RequestParam(value = "name") String name, @RequestParam(value = "age") int age) {
        if(crudEntityRepository.findById(name).isEmpty()) { // 값 존재여부 확인
            return "입력한 " + name + "이 존재하지 않습니다";
        } else {
            crudEntityRepository.save(CrudEntity.builder().name(name).age(age).build());
            return name + "의 나이를 " + age + "로 변경 완료";
        }
    }

    @GetMapping("delete")
    public String deleteMember(@RequestParam(value = "name") String name) {
        if(crudEntityRepository.findById(name).isEmpty()) { // 값 존재여부 확인
            return "입력한 " + name + "이 존재하지 않습니다";
        } else {
            crudEntityRepository.delete(CrudEntity.builder().name(name).build());
            return name + " 삭제 완료";
        }
    }

    @GetMapping("insert")
    public String insertMember(@RequestParam(value = "name") String name, @RequestParam(value = "age") int age) {
        if(crudEntityRepository.findById(name).isPresent()) {
            return "동일한 이름이 이미 있습니다";
        } else {
            CrudEntity entity = CrudEntity.builder().name(name).age(age).build();
            crudEntityRepository.save(entity);
            return "이름 : " + name + " 나이 : " + age + "으로 추가 되었습니다";
        }
    }

    @GetMapping("search")
    public String searchAllMember() {
        return crudEntityRepository.findAll().toString();
    }

    @GetMapping("searchParam")
    public String searchParamMember(@RequestParam(value = "age") int age) {
        List resultList = entityManager.createQuery("select name from sample_member where age > :age")
                .setParameter("age", age)
                .getResultList();
        return resultList.toString();
    }

    @GetMapping("searchParamRepo")
    public String searchParamRepoMember(@RequestParam(value = "name") String name) {
        return crudEntityRepository.searchParamRepo(name).toString();
    }

}