package com.pioneer.dips.symptoms.model;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tblsymptom")
public class Symptom {

	@Column(name = "symptom_id")
	private @Id @GeneratedValue 	long symptom_id;
	@Column(name = "symptom_text")
	private String symptom_text;
	@Column(name = "symptom_category_id")
	private long symptom_category_id;
	
	public Symptom() {
		
	}
	
	public Symptom(String sYMPTOM_NAME, long sYMPTOM_CATEGORY_ID) {
		super();
		symptom_text = sYMPTOM_NAME;
		symptom_category_id = sYMPTOM_CATEGORY_ID;
	}
	public long getsymptom_id() {
		return symptom_id;
	}
	public void setsymptom_id(long sYMPTOM_ID) {
		symptom_id = sYMPTOM_ID;
	}
	public String getsymptom_text() {
		return symptom_text;
	}
	public void setsymptom_text(String sYMPTOM_NAME) {
		symptom_text = sYMPTOM_NAME;
	}
	public long getsymptom_category_id() {
		return symptom_category_id;
	}
	public void setsymptom_category_id(long sYMPTOM_CATEGORY_ID) {
		symptom_category_id = sYMPTOM_CATEGORY_ID;
	}
	  @Override
	  public int hashCode() {
	    return Objects.hash(this.symptom_id, this.symptom_text, this.symptom_category_id);
	  }

	  @Override
	  public String toString() {
	    return "SYMPTOM{" + "id=" + this.symptom_id + ", name='" + this.symptom_text + '\'' + ", category_id='" + this.symptom_category_id + '\'' + '}';
	  }
	
	
}
