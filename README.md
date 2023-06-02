# Grades-sharing-Application


## Context
The web application wanted by the customer was a grade sharing application, where administrators could build classes and courses and modify user’s roles, teachers will grade students and students will be able to see their notes.
## Requirements

- A Public page explaining the goal of the app  
- A Landing Page when authenticated explaining the app context. They want to integrate on this page a Motivational quote of the day changing every time to motivate their users !  
- An administration only page allowing to assign users a role (student/teacher/administration). This page should also allow the admin user to create a course  
- A teacher only page allowing to add a grade to a student for an existing course  
- A student only page allowing them to consult their grades  
- A web API needs to be created to allow them to automate their tasks.  


## To be improved

The SSO isn’t activated due to a lack of time and some complications occurring at the configuration of the keycloak server. This will be implemented via the python-keycloak package that allows the backend to communicate with the keycloak (more details here). Even if there is no SSO, we have Django authentication to protect unauthorized users from accessing data.  

The security of the application, frontend and backend, isn’t the best and should be improved.  



The code isn’t still optimal, there are some functions that are used multiple times and aren’t centralized in one javascript file. The Django views and serializers are more or less default and not personalized to the use case.  

We need to find a way to let users automate their tasks with the REST API. Currently, the backend is in the DC zone and is only accessible from the frontend and isn’t redundant so we decided, by lack of time and for security aspects, to postpone the implementation of the REST API.  

In order to preserve the ability to re-deploy efficiently and quickly, the database needs to be saved regularly with a cron task.  

For future development, a testing zone with a CI/CD pipeline and security tools to productively develop and test new features would be great considering the hot reload of ReactJS, and it protects the production part to be affected.  
