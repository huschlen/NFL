package com.ilm.football.dao;

import java.util.List;
import com.ilm.football.entity.Team;

/**
 * Database communication.  Called from TeamService.
 * Define interface to create a discoverable bean.
 * 
 * @author	Naoko Huschle
 * @since	2017-1-28
 *
 */

public interface ITeamDAO {
    List<Team> getAllTeams();
    Team getTeamById(int tid);
    boolean addTeam(Team team);
    void updateTeam(Team team);
    void deleteTeam(int pid);
    boolean teamExists(String name, int tid);
}
