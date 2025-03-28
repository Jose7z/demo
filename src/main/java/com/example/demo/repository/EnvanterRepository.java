package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.Envanter;

public interface EnvanterRepository extends JpaRepository<Envanter, Integer> {
    Envanter findByEtiketno(Integer etiketno);

}