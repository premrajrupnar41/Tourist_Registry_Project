package com.example.touristregistry.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class HomeController {

    @GetMapping("/")
    @ResponseBody
    public String home() {
        return "<html><head><title>Tourist Registry</title></head><body>"
                + "<h1>Tourist Registry API</h1>"
                + "<p>Available endpoints:</p>"
                + "<ul>"
                + "<li><a href=\"/api/attractions\">/api/attractions</a> (GET/POST)</li>"
                + "<li><a href=\"/h2-console/\">H2 Console</a></li>"
                + "</ul>"
                + "</body></html>";
    }

    @GetMapping("/h2-console")
    public RedirectView h2console() {
        return new RedirectView("/h2-console/");
    }
}
