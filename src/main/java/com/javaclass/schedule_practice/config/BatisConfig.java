package com.javaclass.schedule_practice.config;

import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(basePackages = "com.javaclass.schedule_practice",annotationClass = Mapper.class)
public class BatisConfig {
}
