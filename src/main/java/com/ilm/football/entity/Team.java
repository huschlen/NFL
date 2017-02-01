package com.ilm.football.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Entity Team.
 * 
 * @author	Naoko Huschle
 * @since	2017-1-28
 *
 */

@Entity
@Table(name="team")
public class Team implements Serializable{
	
	private static final long serialVersionUID = 1L;
	@Id
	//@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="tid")
	private int tid;
	@Column(name="name")
	private String name;
	@Column(name="location")
	private String location;
	@Column(name="logo")
	private String logo;
	@Column(name="division")
	private String division;	
	@Column(name="average")
	private int average;
	@Column(name="round1Score")
	private int round1Score;
	@Column(name="round2Score")
	private int round2Score;
	@Column(name="round3Score")
	private int round3Score;
	@Column(name="go")
	private int go;
	@Column(name="home")
	private String home;
	
	public int getTid() {
		return tid;
	}
	public void setTid(int tid) {
		this.tid = tid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getLogo() {
		return logo;
	}
	public void setLogo(String logo) {
		this.logo = logo;
	}
	public String getDivision() {
		return division;
	}
	public void setDivision(String division) {
		this.division = division;
	}
	public int getAverage() {
		return average;
	}
	public void setAverage(int average) {
		this.average = average;
	}
	public int getRound1Score() {
		return round1Score;
	}
	public void setRound1Score(int round1Score) {
		this.round1Score = round1Score;
	}
	public int getRound2Score() {
		return round2Score;
	}
	public void setRound2Score(int round2Score) {
		this.round2Score = round2Score;
	}
	public int getRound3Score() {
		return round3Score;
	}
	public void setRound3Score(int round3Score) {
		this.round3Score = round3Score;
	}
	public int getGo() {
		return go;
	}
	public void setGo(int go) {
		this.go = go;
	}
	public String getHome() {
		return home;
	}
	public void setHome(String home) {
		this.home = home;
	}
	@Override
	public boolean equals(Object o) {
	    if(o == null) {
	    	return false;
	    }
	    if(!(o instanceof Team)) {
	    	return false;
	    }
	    Team other = (Team) o;
	    return this.tid == other.tid;
	}
	@Override
	public int hashCode(){
	    return (int) tid;
	}

}