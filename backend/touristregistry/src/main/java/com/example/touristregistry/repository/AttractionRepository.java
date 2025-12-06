package com.example.touristregistry.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.touristregistry.entity.Attraction;

@Repository
public interface AttractionRepository extends JpaRepository<Attraction, Long> {
    List<Attraction> findByCountryIgnoreCase(String country);
    List<Attraction> findByStateIgnoreCase(String state);
    List<Attraction> findByCityIgnoreCase(String city);
}
