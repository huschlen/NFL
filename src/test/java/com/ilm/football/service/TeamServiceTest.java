package com.ilm.football.service;

import org.junit.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import com.ilm.football.dao.ITeamDAO;
import com.ilm.football.service.ITeamService;
import com.ilm.football.service.TeamService;
import com.ilm.football.entity.Team;
import static org.mockito.Mockito.*;
import java.util.ArrayList;
import java.util.List;
import org.mockito.*;
/*******
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.autoconfigure.web.servlet.*;
import org.springframework.boot.test.mock.mockito.*;
import org.springframework.web.util.UriComponentsBuilder;
 ********/


 /**
 * Unit tests for TeanService
 * 
 * @author	Naoko Huschle
 * @since	2017-1-28
 *
 */

public class TeamServiceTest {
	
    @Mock
    private ITeamService teamService;
    @Mock
    private ITeamDAO teamDAO;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        teamService = new TeamService();
        teamService.setTeamDAO(teamDAO);
    }
    @Test
    public void testGetTeamById() {
    	Team team = new Team();
    	team.setTid(1);
		team.setName("Vikings");
		team.setLocation("Minnesota");
		team.setDivision("NFC");
		team.setAverage(3);
		team.setGo(1);
		// expected team
		Mockito.when(teamDAO.getTeamById(1)).thenReturn(team);
		// check the value
		assertEquals(team, teamService.getTeamById(1));
		// verify interaction
		verify(teamDAO).getTeamById(1);
    } 
    @Test
    public void testGetAllTeams() {
		List<Team> teams = new ArrayList<>();
		Team team1 = new Team();
		team1.setTid(1);
		team1.setName("Vikings");
		team1.setLocation("Minnesota");
		team1.setDivision("NFC");
		team1.setAverage(3);
		team1.setGo(1);
		Team team2 = new Team();
		team2.setTid(2);
		team2.setName("Dolphins");
		team2.setLocation("Miami");
		team2.setDivision("AFC");
		team2.setAverage(25);
		team2.setGo(1);
		teams.add(team1);
		teams.add(team2);
		// expected toys
		Mockito.when(teamDAO.getAllTeams()).thenReturn(teams);
		// check if we have gotten them all
		assertEquals(2, teamService.getAllTeams().size());
		// make sure that teamDAO method was called
		Mockito.verify(teamDAO).getAllTeams();
    }
    @Test
	public void testAddTeam(){
		// team to add
		Team team1 = new Team();
		team1.setTid(1);
		team1.setName("Vikings");
		team1.setLocation("Minnesota");
		team1.setDivision("NFC");
		team1.setAverage(3);
		team1.setGo(1);
		// add a team
		Mockito.when(teamDAO.addTeam(team1)).thenReturn(true);
		assertTrue(teamService.addTeam(team1));
		Mockito.verify(teamDAO, Mockito.times(1)).addTeam(team1);
    }
   
    @Test
	public void testUpdateTeam() {
		Team team1 = new Team();
		team1.setTid(1);
		team1.setName("Vikings");
		team1.setLocation("Minnesota");
		team1.setDivision("NFC");
		team1.setAverage(3);
		team1.setGo(1);
		Team teamUpdated = new Team();
		teamUpdated.setTid(1);
		teamUpdated.setName("Dolphins");
		teamUpdated.setLocation("Miami");
		teamUpdated.setDivision("AFC");
		teamUpdated.setAverage(25);
		teamUpdated.setGo(1);	
		Mockito.when(teamDAO.addTeam(team1)).thenReturn(true);
		teamService.updateTeam(team1);
		Mockito.when(teamDAO.getTeamById(1)).thenReturn(teamUpdated);	
		assertEquals(teamUpdated, teamService.getTeamById(1));
		verify(teamDAO).updateTeam(team1);
	}
    @Test
	public void testDeleteTeam() {
		// team to delete
		Team team1 = new Team();
		team1.setTid(1);
		team1.setName("Vikings");
		team1.setLocation("Minnesota");
		team1.setDivision("NFC");
		team1.setAverage(3);
		team1.setGo(1);         
		teamService.deleteTeam(team1.getTid());
		Mockito.verify(teamDAO, Mockito.times(1)).deleteTeam(team1.getTid());
	}

}