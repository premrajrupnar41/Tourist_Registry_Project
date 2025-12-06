package com.example.touristregistry.controller;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.touristregistry.dto.AttractionDTO;
import com.example.touristregistry.entity.Attraction;
import com.example.touristregistry.mapper.AttractionMapper;
import com.example.touristregistry.service.AttractionService;

@RestController
@RequestMapping("/api/attractions")
@CrossOrigin(origins = "*")
public class AttractionController {

    private final AttractionService service;

    public AttractionController(AttractionService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<AttractionDTO> create(@RequestBody Attraction payload) {
        Attraction saved = service.createAttraction(payload);
        return ResponseEntity.created(URI.create("/api/attractions/" + saved.getId()))
                .body(AttractionMapper.toDto(saved));
    }

    @GetMapping
    public List<AttractionDTO> getAll() {
        return service.getAllAttractions().stream().map(AttractionMapper::toDto).collect(Collectors.toList());
    }

    @GetMapping("/filter")
    public List<AttractionDTO> filter(@RequestParam(required = false) String country,
                                      @RequestParam(required = false) String state,
                                      @RequestParam(required = false) String city) {
        return service.filter(country, state, city).stream().map(AttractionMapper::toDto).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttractionDTO> getOne(@PathVariable Long id) {
        return service.getById(id)
                .map(a -> ResponseEntity.ok(AttractionMapper.toDto(a)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/meta/countries")
    public List<String> countries() { return service.getDistinctCountries(); }

    @GetMapping("/meta/states")
    public List<String> states(@RequestParam String country) { return service.getStatesForCountry(country); }

    @GetMapping("/meta/cities")
    public List<String> cities(@RequestParam String state) { return service.getCitiesForState(state); }
}
