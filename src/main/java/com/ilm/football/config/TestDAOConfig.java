package com.ilm.football.config;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.hibernate.SessionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBuilder;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import com.ilm.football.dao.ITeamDAO;
import com.ilm.football.dao.TeamDAO;
import com.ilm.football.entity.Team;

/**
 * Configuration for integration tests.
 * 
 * @author	Naoko Huschle
 * @since	2017-1-28
 *
 */
  
@Configuration
@EnableTransactionManagement
public class TestDAOConfig {  
	@Bean  
	public ITeamDAO teamDao() {  
		return new TeamDAO();  
	}
	@Bean
	public HibernateTemplate hibernateTemplate() {
		return new HibernateTemplate(sessionFactory());
	}
	@Bean
	public SessionFactory sessionFactory() {
		return new LocalSessionFactoryBuilder(getDataSource())
		   .addAnnotatedClasses(Team.class)
		   .buildSessionFactory();
	}
	@Bean
	public DataSource getDataSource() {
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName("com.mysql.jdbc.Driver");
		dataSource.setUrl("jdbc:mysql://localhost:3306/nfl");
		dataSource.setUsername("root");
		dataSource.setPassword("");		 
	    return dataSource;
	}
	@Bean
	public HibernateTransactionManager hibTransMan(){
		return new HibernateTransactionManager(sessionFactory());
	}

}
 