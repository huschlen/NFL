package com.ilm.football.dao;

import java.util.ArrayList;
import java.util.List;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertNull;
import javax.transaction.Transactional;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.annotation.*;
import com.ilm.football.config.TestDAOConfig;
import com.ilm.football.dao.ITeamDAO;
import com.ilm.football.entity.Team;

/**
 * Integration tests for TeamDAO.
 * 
 * @author	Naoko Huschle
 * @since	2017-1-28
 *
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = TestDAOConfig.class)
@Rollback
@Transactional
public class TeamDAOTest {
	
	@Autowired
	private ITeamDAO teamDAO;
	@Autowired
	private HibernateTemplate  hibernateTemplate;
	@Test
	public void testGetTeamById() {
		Team team = new Team();
		team.setTid(100);
		team.setName("Vikings");
		team.setLocation("Minnesota");
		team.setLogo("http://localhost:8080/nfl-1/app-resources/js/images/MinnesotaVikings.png");
		team.setDivision("NFC");
		team.setAverage(3);
		team.setGo(1);
		team.setHome("away");
		hibernateTemplate.save(team);
		Team teamRetrieved = teamDAO.getTeamById(100);
		assertEquals(team, teamRetrieved);
		assertEquals(team.getName(), teamRetrieved.getName());
		assertEquals(team.getLocation(), teamRetrieved.getLocation());	
	}
	@Test
	public void testGetAllTeams() {
		List<Team> teams = new ArrayList<>();
		Team team1 = new Team();
		team1.setTid(101);
		team1.setName("Vikings");
		team1.setLocation("Minnesota");
		team1.setLogo("http://localhost:8080/nfl-1/app-resources/js/images/MinnesotaVikings.png");
		team1.setDivision("NFC");
		team1.setAverage(3);
		team1.setGo(1);
		team1.setHome("away");
		Team team2 = new Team();
		team2.setTid(102);
		team2.setName("Dolphins");
		team2.setLocation("Miami");
		team2.setLogo("http://localhost:8080/nfl-1/app-resources/js/images/MiamiDolphins.png");
		team2.setDivision("AFC");
		team2.setAverage(25);
		team2.setGo(1);
		team2.setHome("home");
		teams.add(team1);
		teams.add(team2);
		hibernateTemplate.save(team1);
		hibernateTemplate.save(team2);
		List<Team> teamsRetrieved = teamDAO.getAllTeams();
		for(Team team : teams){
			boolean foundTeam = false;
			for(Team returnedTeam : teamsRetrieved){
				if(team.equals(returnedTeam)){
					foundTeam = true;
					continue;
				}
			}
			assertTrue(foundTeam);
		}
	}
	@Test
	public void testAddTeam() {
		Team team = new Team();
		team.setTid(100);
		team.setName("Vikings");
		team.setLocation("Minnesota");
		team.setLogo("http://localhost:8080/nfl-1/app-resources/js/images/MinnesotaVikings.png");
		team.setDivision("NFC");
		team.setAverage(3);
		team.setGo(1);
		team.setHome("away");
		teamDAO.addTeam(team);
		Team teamAdded = hibernateTemplate.get(Team.class, 100);
		assertEquals(team.getName(), teamAdded.getName());
		assertEquals(team.getLocation(), teamAdded.getLocation());
	}
	@Test
	public void testUpdateTeam() {
		Team team = new Team();
		team.setTid(101);
		team.setName("Vikings");
		team.setLocation("Minnesota");
		team.setLogo("http://localhost:8080/nfl-1/app-resources/js/images/MinnesotaVikings.png");
		team.setDivision("NFC");
		team.setAverage(3);
		team.setGo(1);
		team.setHome("away");
		hibernateTemplate.save(team);
		Team existingTeam = hibernateTemplate.get(Team.class, 101);
		existingTeam.setName("Dolphin");
		existingTeam.setLocation("Miami");
		existingTeam.setLogo("http://localhost:8080/nfl-1/app-resources/js/images/MiamiDolphins.png");
		existingTeam.setDivision("AFC");
		existingTeam.setAverage(25);
		existingTeam.setGo(1);
		existingTeam.setHome("home");
		teamDAO.updateTeam(existingTeam);
		Team updatedTeam = hibernateTemplate.get(Team.class, 101);
		assertEquals("Dolphin", updatedTeam.getName());
	}
	@Test
	public void testDeleteTeam() {
		Team team = new Team();
		team.setTid(101);
		team.setName("Vikings");
		team.setLocation("Minnesota");
		team.setLogo("http://localhost:8080/nfl-1/app-resources/js/images/MinnesotaVikings.png");
		team.setDivision("NFC");
		team.setAverage(3);
		team.setGo(1);
		team.setHome("away");
		hibernateTemplate.save(team);
		teamDAO.deleteTeam(101);
		Team deletedTeam = hibernateTemplate.get(Team.class, 101);
		assertNull(deletedTeam);
	}
	@Test
	public void testTeamExists() {
		Team team = new Team();
		team.setTid(101);
		team.setName("Vikings");
		team.setLocation("Minnesota");
		team.setLogo("http://localhost:8080/nfl-1/app-resources/js/images/MinnesotaVikings.png");
		team.setDivision("NFC");
		team.setAverage(3);
		team.setGo(1);
		team.setHome("away");
		hibernateTemplate.save(team);
		boolean teamExists = teamDAO.teamExists(team.getName(), team.getTid());
		assertTrue(teamExists);
	}

}