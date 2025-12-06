package com.example.touristregistry.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.touristregistry.entity.Attraction;
import com.example.touristregistry.repository.AttractionRepository;

@Service
public class AttractionService {

    private final AttractionRepository repo;
    // simple in-memory cache for filtered queries
    private final Map<String, List<Attraction>> filterCache = new HashMap<>();

    public AttractionService(AttractionRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public Attraction createAttraction(Attraction attraction) {
        Attraction saved = repo.save(attraction);
        synchronized (filterCache) { filterCache.clear(); }
        return saved;
    }

    @Transactional(readOnly = true)
    public List<Attraction> getAllAttractions() {
        return repo.findAll().stream()
                .sorted((a, b) -> {
                    LocalDateTime d1 = a.getCreatedAt();
                    LocalDateTime d2 = b.getCreatedAt();
                    if (d1 == null && d2 == null) return 0;
                    if (d1 == null) return 1; // nulls last
                    if (d2 == null) return -1;
                    return d2.compareTo(d1); // newest first
                })
                .collect(Collectors.toList());
    }

    public Optional<Attraction> getById(Long id) {
        return repo.findById(id);
    }

    public List<Attraction> filter(String country, String state, String city) {
        String key = (country == null ? "" : country.toLowerCase()) + ":" + (state == null ? "" : state.toLowerCase()) + ":" + (city == null ? "" : city.toLowerCase());
        synchronized (filterCache) {
            if (filterCache.containsKey(key)) return filterCache.get(key);
        }
        List<Attraction> list = getAllAttractions();
        List<Attraction> filtered = list.stream().filter(a -> {
            boolean ok = true;
            if (country != null && !country.isBlank()) ok &= country.equalsIgnoreCase(a.getCountry());
            if (state != null && !state.isBlank()) ok &= state.equalsIgnoreCase(a.getState());
            if (city != null && !city.isBlank()) ok &= city.equalsIgnoreCase(a.getCity());
            return ok;
        }).collect(Collectors.toList());
        // cache an immutable copy to avoid accidental external mutation and
        // to limit issues when entities become detached outside transactions
        List<Attraction> immutable = Collections.unmodifiableList(new ArrayList<>(filtered));
        synchronized (filterCache) { filterCache.put(key, immutable); }
        return filtered;
    }

    public List<String> getDistinctCountries() {
        return repo.findAll().stream()
                .map(Attraction::getCountry)
                .filter(Objects::nonNull)
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

    public List<String> getStatesForCountry(String country) {
        if (country == null) return Collections.emptyList();
        return repo.findAll().stream()
                .filter(a -> country.equalsIgnoreCase(a.getCountry()))
                .map(Attraction::getState)
                .filter(Objects::nonNull)
                .map(String::trim)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

    public List<String> getCitiesForState(String state) {
        if (state == null) return Collections.emptyList();
        return repo.findAll().stream()
                .filter(a -> state.equalsIgnoreCase(a.getState()))
                .map(Attraction::getCity)
                .filter(Objects::nonNull)
                .map(String::trim)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }
}
