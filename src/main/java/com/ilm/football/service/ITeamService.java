package com.ilm.football.service;

import java.util.List;
import com.ilm.football.entity.Team;
import com.ilm.football.dao.*;

/**
 * Service between the controller and DAO.
 * Called from TeamController.  Calls TeamDAO.
 * Define interface to create a discoverable bean.
 * 
 * @author	Naoko Huschle
 * @since	2017-1-28
 *
 */

public interface ITeamService {
	void setTeamDAO (ITeamDAO team);
	List<Team> getAllTeams();
    Team getTeamById(int tid);
    boolean addTeam(Team team);
    void updateTeam(Team team);
    void deleteTeam(int tid);
}
