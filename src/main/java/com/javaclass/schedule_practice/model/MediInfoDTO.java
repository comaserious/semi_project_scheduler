package com.javaclass.schedule_practice.model;

import lombok.*;

import java.sql.Date;
@NoArgsConstructor@AllArgsConstructor@Getter@Setter@ToString
public class MediInfoDTO {
    private int mediCode;
    private Date mediDate;
    private int projectNo;
    private int timeCode;
    private String mediStatus;
    private TimeDTO timeDTO;
    private int day;
}
