package com.pioneer.dips.symptoms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pioneer.dips.symptoms.model.Symptom;

public interface symptomRepository extends JpaRepository<Symptom, Long> {

}
