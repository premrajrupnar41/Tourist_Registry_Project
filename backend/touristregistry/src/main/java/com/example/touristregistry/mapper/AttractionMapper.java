package com.example.touristregistry.mapper;

import java.time.format.DateTimeFormatter;

import com.example.touristregistry.dto.AttractionDTO;
import com.example.touristregistry.entity.Attraction;

public class AttractionMapper {

    public static AttractionDTO toDto(Attraction a) {
        if (a == null) return null;
        AttractionDTO d = new AttractionDTO();
        d.id = a.getId();
        d.name = a.getName();
        d.description = a.getDescription();
        d.latitude = a.getLatitude();
        d.longitude = a.getLongitude();
        d.city = a.getCity();
        d.district = a.getDistrict();
        d.state = a.getState();
        d.country = a.getCountry();
        d.mediaUrl = a.getMediaUrl();
        d.ticketPrice = a.getTicketPrice();
        d.category = a.getCategory();
        d.rating = a.getRating();
        d.timings = a.getTimings();
        if (a.getCreatedAt() != null) {
            d.createdAt = a.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        }
        return d;
    }
}
