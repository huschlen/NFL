1.Download gradle and set the environment path.
2.Download MySQL and run the script in the file “CREATE_TABLE”.
3.Import this gradle project into Eclipse.
4.Configure database user/password in AppConfig.java and TestDAOConfig.java.
5.Using command prompt go to the root directory of the java project.
6.Run "gradle clean build" and it will create WAR file in the directory project root directory/build/lib.
7.Deploy the WAR file in Tomcat and run the URL “http://localhost:8080/nfl-1”.