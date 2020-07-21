# Automating Django Deployments

## User Story
1. user starts "deployment.py" script
2.a app prompts to choose if the server is already configured or not
2.b user chooses project repo, public address, host
3. save results to log file

## implementation steps
1. create deployment files (for nginx, gunicorn_start)
2. log into host server
2.a run fresh server configuration 
2.b test to make sure python, nginx, git exist
3. make user with project name
4. clone repo into ~/app
5. run scripts
6. copy deployment files to host server
7. test nginx configuration, add systemd service
8. restart nginx
9. test deployment


### techstack
- fabric https://www.fabfile.org/
