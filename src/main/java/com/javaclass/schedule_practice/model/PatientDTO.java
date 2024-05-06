package com.javaclass.schedule_practice.model;

import lombok.*;

@NoArgsConstructor@AllArgsConstructor@Getter@Setter@ToString
public class PatientDTO {
    private int patientNo;
    private String name;
    private int age;
    private String gender;
    private double height;
    private double weight;
    private String phone;
    private String agree;
    private String email;
}
