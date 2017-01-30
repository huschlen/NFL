package com.ilm.football.config;

import org.springframework.context.annotation.Import;
import org.springframework.security.access.SecurityConfig;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

/**
 * Application initializer.
 * 
 * @author	Naoko Huschle
 * @since	2017-1-28
 *
 */

@Import({SecurityConfig.class})
public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
	@Override
	protected Class<?>[] getRootConfigClasses() {
		//return new Class[] { AppConfig.class, WebSecurityConfig.class };
		return new Class[] { AppConfig.class };
	}
	@Override
	protected Class<?>[] getServletConfigClasses() {
		return null;
	}
	@Override
	protected String[] getServletMappings() {
		return new String[] { "/" };
	}
}