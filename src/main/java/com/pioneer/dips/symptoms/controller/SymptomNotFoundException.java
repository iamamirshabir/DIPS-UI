package com.pioneer.dips.symptoms.controller;

public class SymptomNotFoundException extends RuntimeException {

	public SymptomNotFoundException(Long id){
		super("Could not find symptom" + id);
	}
}
