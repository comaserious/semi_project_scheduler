package com.javaclass.schedule_practice.model;

import lombok.*;

import java.util.List;

@AllArgsConstructor@NoArgsConstructor@Getter@Setter@ToString
public class ProjectDTO {
    private int projectNo;
    private int patientNo;
    private String pmCode;
    private String injuryCode;
    private String theraCode;
    private String projectStatus;
    private PatientDTO patientDTO;
    private InjuryDTO injuryDTO;
    private List<MediInfoDTO> mediInfoList;
}
