$TodoAppServer
========

Look how easy it is to use:

    git clone project
	Open cmd within server folder
	 - run 'npm install'
	 - place .env file within root path
	 - run 'npm start'

Features
--------

- You can create user, validate him and login
- You can create todo tasks and get them

Endpoints
--------
	#POST /api/user/register
	Body: { firstName: '', lastName: '', email: '', password: '' }
	
	#POST /api/user/login
	Body: email=test@test.com&password=pass123
	Headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	Return access-token and refresh-token in headers
	
	#GET /api/user/signin
	Headers: { 'Registration-Token': '' }
	
	#GET /api/user/logout
	Headers: { 'Access-Token': '', 'Refresh-Token': '' }
	
	#POST /api/task
	Body: { title: '', description: '' }
	Headers: { 'Access-Token': '', 'Refresh-Token': '' }
	
	#GET /api/task
	Headers: { 'Access-Token': '', 'Refresh-Token': '' }
	
Support
-------

If you are having issues, please let me know.
We have a mailing list located at: nedimhozic@gmail.com