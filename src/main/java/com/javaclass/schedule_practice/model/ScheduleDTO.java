package com.javaclass.schedule_practice.model;

import lombok.*;

import java.util.List;
@NoArgsConstructor@AllArgsConstructor@Getter@Setter@ToString
public class ScheduleDTO {

    private String pmCode;
    private List<ProjectDTO> projects;

}
