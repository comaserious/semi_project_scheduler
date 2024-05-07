package com.javaclass.schedule_practice.model;

import java.util.List;
import java.util.Map;

@org.apache.ibatis.annotations.Mapper
public interface Mapper {
    ScheduleDTO findSome(Map<String,Object> param);

    List<ProjectDTO> allProjects(String pmCode);
}
