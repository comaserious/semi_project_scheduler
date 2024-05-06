package com.javaclass.schedule_practice.controller;

import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.DayOfWeek;
import java.time.LocalDateTime;

@Controller
public class MainController {

    @GetMapping(value = {"/","/main"})
    public String main(){


        return "/main";
    }
}
