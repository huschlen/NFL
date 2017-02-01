package com.ilm.football.service;

import com.ilm.football.dao.ITeamDAO;
import com.ilm.football.entity.Team;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service between the controller and DAO.
 * Called from TeamController.  Calls TeamDAO.
 * 
 * @author	Naoko Huschles
 * @since	2017-1-28
 *
 */

@Service
public class TeamService implements ITeamService {
	@Autowired
	private ITeamDAO teamDAO;
	@Override
	public void setTeamDAO(ITeamDAO dao) {
		this.teamDAO = dao;
	}
	@Override
	public Team getTeamById(int tid) {
		Team obj = teamDAO.getTeamById(tid);
		return obj;
	}	
	@Override
	public List<Team> getAllTeams(){
		return teamDAO.getAllTeams();
	}
	@Override
	public synchronized boolean addTeam(Team team){
		if (teamDAO.teamExists(team.getName(), team.getTid())) {
			return false;
		} else {
			teamDAO.addTeam(team);
			return true;
		}
	}
	@Override
	public void updateTeam(Team team) {
		teamDAO.updateTeam(team);
	}
	@Override
	public void deleteTeam(int tid) {
		teamDAO.deleteTeam(tid);
	}

}
