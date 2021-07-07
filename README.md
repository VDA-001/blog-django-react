# Django-React-Blog
This is a simple "Blogging platform" with basic CRUD functionalities.

This is designed by using Django as backend, Reactjs as frontend and Postgresql for the Database part.
***
## Features
* Login/Registration
* Simple Design
* Dark Theme
* Create/Read/Update/Delete Post
* Read Categories
* Add/Read comments
* User Profile
***
## Setup
Make sure you have python, pipenv and npm already installed
## 1. Backend Setup
1. Clone this repository : `git clone https://github.com/VDA-001/blog-django-react.git`
2. Change the current directory to the backend directory : `cd blog-django-react/blog_backend`
3. Create a `.env` and add the following line's to it and give them a unique value.
> Note: The default database is dbsqlite3, so giving values to below specified DATABASE_* is optional but is 'required' if you are using postgresql and to use postgresql just uncomment the DATABASE part in `blog-django-react/blog_backend/blog_backend/settings.py` and comment/remove the default one.
```
SECRET_KEY=<Add a secret key which is unique>
DATABASE_PASSWORD=<Your database password>
DATABASE_NAME=<Your database name>
DATABASE_USER=<Your database username>
SUPERUSER_NAME=<Superuser name>
SUPERUSER_EMAIL=<Superuser email-id>
SUPERUSER_USERNAME=<Superuser username>
SUPERUSER_PASSWORD=<Superuser password>
```
> Note: Make sure you are in `blog-django-react/blog_backend`.
4. Create a virtualenv and install all backend dependencies: `pipenv install`.
5. Start the virtualenv: `pipenv shell`.
6. Run `python manage.py makemigrations`.
7. Run `python manage.py migrate`.
> Note: Superuser is automatically created by making migration, you can find the code at `blog-django-react/blog_backend/api/migrations/0001_initial.py`.
8. Run the server: `python manage.py runserver`.
## 2. Frontend Setup
1. Navigate the current working directory to `blog_frontend` : `cd ./blog-django-react/blog_frontend`.
2. Install all frontend dependencies: `npm install`.
>Note: Make sure backend server is running.
3. Run the server: `npm start`.
***
## Screenshots
![screenshot1](./blog_backend/media/images/Screenshot-1.png)
![screenshot2](./blog_backend/media/images/Screenshot-2.png)
![screenshot3](./blog_backend/media/images/Screenshot-3.png)
![screenshot4](./blog_backend/media/images/Screenshot-4.png)
![screenshot5](./blog_backend/media/images/Screenshot-5.png)
![screenshot6](./blog_backend/media/images/Screenshot-6.png)