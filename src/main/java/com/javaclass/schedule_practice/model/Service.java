package com.javaclass.schedule_practice.model;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

@org.springframework.stereotype.Service
public class Service {
    @Autowired
    private Mapper mapper;
    public ScheduleDTO findSome(Map<String,Object> param) {
        return mapper.findSome(param);

    }
}