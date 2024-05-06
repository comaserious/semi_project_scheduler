package com.javaclass.schedule_practice.model;

import lombok.*;

import java.sql.Time;
@NoArgsConstructor@AllArgsConstructor@Getter@Setter@ToString
public class TimeDTO {
    private int timeCode;
    private Time timeVal;
}
