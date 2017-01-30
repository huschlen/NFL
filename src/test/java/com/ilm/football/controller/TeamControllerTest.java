package com.ilm.football.controller;

import org.junit.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.ilm.football.controller.TeamController;
import com.ilm.football.service.ITeamService;
import com.ilm.football.entity.Team;
import static org.mockito.Mockito.*;
import org.mockito.*;
import java.util.ArrayList;
import java.util.List;
/*******
import org.junit.runner.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.autoconfigure.web.servlet.*;
import org.springframework.boot.test.mock.mockito.*;
import static org.springframework.util.Assert.*;
 ********/

/**
 * Unit tests for TeamController.
 * 
 * @author	Naoko Huschle
 * @since	2017-1-28
 *
 */

public class TeamControllerTest {
	
	@InjectMocks
	private TeamController teamController;
	@Mock
	private ITeamService teamService;    
	@Mock
	private Team team1;
	@Mock
	private Team team2;
	private UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.newInstance().path("localhost:8080/angular-spring-1");
	
	@Before
	public void setup() {
		MockitoAnnotations.initMocks(this);
	    teamController = new TeamController();
	    teamController.setTeamService(teamService);
	}
	@Test
	public void testGetTeamById() {
		Mockito.when(teamService.getTeamById(1)).thenReturn(this.team1);
		ResponseEntity<Team> response = teamController.getTeamById(1);
		// check that status code was 200
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
		// make sure the response has a body
		Assert.assertTrue(response.hasBody());
		// make sure we have gotten the right team
		Assert.assertEquals(this.team1, response.getBody());
		// make sure that teamService method was called with correct parameter
		Mockito.verify(teamService).getTeamById(1);
	} 
	@Test
	public void testGetAllTeams() {
		List<Team> teams = new ArrayList<>();
		teams.add(this.team1);
		teams.add(this.team2);
		Mockito.when(teamService.getAllTeams()).thenReturn(teams);
		ResponseEntity<List<Team>> response = teamController.getAllTeams();
		// check that status code was 200
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
		// make sure the response has a body
		Assert.assertTrue(response.hasBody());
		// make sure we have gotten the right teams
		Assert.assertEquals(teams, response.getBody());
		// make sure that teamService method was called
		Mockito.verify(teamService).getAllTeams();
	}
	@Test
	public void testTeamService() {
		ResponseEntity<Void> response = teamController.teamService(this.team1, uriComponentsBuilder);
		// check that status code was HttpStatus.CREATED
		Assert.assertEquals(HttpStatus.CREATED, response.getStatusCode());
		// make sure that teamService method was called with correct parameter
		Mockito.verify(teamService).addTeam(this.team1);
	}
	@Test
	public void testUpdateTeam() {
		this.team1.setTid(1);
		this.team1.setName("Vikings");
		this.team1.setLocation("Minnesota");
		this.team1.setDivision("NFC");
		this.team1.setAverage(3);
		this.team1.setGo(1);
		this.team2.setTid(1);
		this.team2.setName("Dolphins");
		this.team2.setLocation("Miami");
		this.team2.setDivision("NFC");
		this.team2.setAverage(25);
		this.team2.setGo(1);	
		Mockito.when(teamService.addTeam(this.team1)).thenReturn(true);
		ResponseEntity<Team> response = teamController.updateTeam(this.team1);
		// check that status code was 200
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
		// make sure the response has a body
		Assert.assertTrue(response.hasBody());
		// make sure that teamService method was called
		verify(teamService).updateTeam(this.team1);   	
	}
	@Test
	public void testDeleteTeam() {
		this.team1.setTid(1);
		Mockito.when(teamService.addTeam(this.team1)).thenReturn(true);
		ResponseEntity<Void> response = teamController.deleteTeam(1);
		// check that the team is deleted
		Assert.assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
		// make sure that teamService method was called
		verify(teamService).deleteTeam(1);  
	}

}