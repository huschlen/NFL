package com.ilm.football.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.util.UriComponentsBuilder;
import com.ilm.football.service.ITeamService;
import com.ilm.football.entity.Team;

/**
 * Maps http requests.
 * 
 * @author	Naoko Huschle
 * @since	2017-1-28
 *
 */

@Controller
public class TeamController {
	@Autowired
	private ITeamService teamService;
	
	public void setTeamService(ITeamService service) {
		this.teamService = service;
	}
	@RequestMapping(value="/", method = RequestMethod.GET)
	public String home() {
		return "home";
 	}
	@RequestMapping(value="/logout", method = RequestMethod.GET)
	public String logoutPage () {
	    return "redirect:/login?logout";
	}
	@RequestMapping(value="/teams/{id}", method = RequestMethod.GET)
	public ResponseEntity<Team> getTeamById(@PathVariable("id") Integer id) {
		Team team = teamService.getTeamById(id);
		return new ResponseEntity<Team>(team, HttpStatus.OK);
	}
	@RequestMapping(value= "/teams", method = RequestMethod.GET)
	public ResponseEntity<List<Team>> getAllTeams() {
		List<Team> list = teamService.getAllTeams();
		return new ResponseEntity<List<Team>>(list, HttpStatus.OK);
	}
	@RequestMapping(value= "/teams", method = RequestMethod.POST)
	public ResponseEntity<Void> teamService(@RequestBody Team team, UriComponentsBuilder builder) {
		boolean flag = teamService.addTeam(team);
		if (flag == false) {
			new ResponseEntity<Void>(HttpStatus.CONFLICT);
		}
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(builder.path("/teams/{id}").buildAndExpand(team.getTid()).toUri());
		return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}	
	@RequestMapping(value="/teams/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Team> updateTeam(@RequestBody Team team) {
		teamService.updateTeam(team);
		return new ResponseEntity<Team>(team, HttpStatus.OK);
	}
	@RequestMapping(value="/teams/", method = RequestMethod.PUT)
	public ResponseEntity<Void> reset() {
		teamService.reset();
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	@RequestMapping(value="/teams/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteTeam(@PathVariable("id") Integer id) {
		teamService.deleteTeam(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

}