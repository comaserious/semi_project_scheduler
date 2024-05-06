package com.javaclass.schedule_practice.controller;

import com.javaclass.schedule_practice.model.ScheduleDTO;
import com.javaclass.schedule_practice.model.Service;
import jakarta.servlet.http.HttpSession;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@org.springframework.stereotype.Controller
public class Controller {
    @Autowired
    private Service service;
    @GetMapping("/schedule")
    public void schedule(Model model){

    }

    @GetMapping(value = "/find")
    public String findSome(@RequestParam String pmCode, Model model, HttpSession session){

        // 현재 날짜 가져오기
        LocalDate today = LocalDate.now();

        // 오늘이 속한 주의 시작 날짜 계산하기 (월요일)
        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));

        // 오늘이 속한 주의 끝 날짜 계산하기 (일요일)
        LocalDate endOfWeek = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

        Map<String,Object> param = new HashMap<>();
        param.put("pmCode",pmCode);
        param.put("startDay",startOfWeek);
        param.put("endDay",endOfWeek);

        ScheduleDTO scheduleDTO = service.findSome(param);

        param.put("schedule",scheduleDTO);
        session.setAttribute("param",param);
        System.out.println(scheduleDTO);


        System.out.println(scheduleDTO.getProjects().get(0).getMediInfoList().get(0).getDay());
        return "/schedule";
    }

    @GetMapping(value = "/setSchedule",produces = "application/json; charset=UTF-8")
    @ResponseBody
    public Map<String,Object> setSchedule(HttpSession session){
        return (Map<String, Object>) session.getAttribute("param");
    }
}


