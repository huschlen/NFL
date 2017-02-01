package com.ilm.football.dao;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Repository;
import com.ilm.football.entity.Team;

/**
 * Database communication.  Called from TeamService.
 * 
 * @author	Naoko Huschle
 * @since	2017-1-28
 *
 */

@Transactional
@Repository
public class TeamDAO implements ITeamDAO {
	@Autowired
	private HibernateTemplate hibernateTemplate;
	@Override
	public Team getTeamById(int tid) {
		return hibernateTemplate.get(Team.class, tid);
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<Team> getAllTeams() {
		String hql = "FROM Team as t ORDER BY t.tid";
		return (List<Team>) hibernateTemplate.find(hql);
	}	
	@Override
	public boolean addTeam(Team team) {
		hibernateTemplate.save(team);
		return false;
	}
	@Override
	public void updateTeam(Team team) {
		Team t = getTeamById(team.getTid());
		t.setName(team.getName());
		t.setLogo(team.getLogo());
		t.setDivision(team.getDivision());
		t.setAverage(team.getAverage());
		t.setRound1Score(team.getRound1Score());
		t.setRound2Score(team.getRound2Score());
		t.setRound3Score(team.getRound3Score());
		t.setGo(team.getGo());
		t.setTid(team.getTid());
		t.setHome(team.getHome());
		hibernateTemplate.update(t);
	}
	@Override
	public void deleteTeam(int tid) {
		hibernateTemplate.delete(getTeamById(tid));
	}
	@SuppressWarnings("unchecked")
	@Override
	public boolean teamExists(String name, int tid) {
		String hql = "FROM Team as t WHERE t.name = ? and t.tid = ?";
		List<Team> teams = (List<Team>) hibernateTemplate.find(hql, name, tid);
		return teams.size() > 0 ? true : false;
	}
}