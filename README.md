# Resource Wall

A full-stack single page app that allow learners to save learning resources in a central place that is publicly available to any users.  

## Table of Content

- [Live Demo](#live-demo)
- [Final Product](#final-product)
- [Dependencies](#dependencies)
- [Getting Started](#getting-started)
- [Credit](#credit)

## Live Demo

## Final Product

### Home page

- Display all the resources
- Users can like any resource
- Display screenshot/embed video uploaded by the user
- Display resource details such as title, desciption, owner's username, added date, rating, number of likes and comments
- Users can view resources by catergory

### Login

- Users can login with email/username and password

### Logout

- Users can logout

### register

- users can regsiter with email (unique), password (enter twice) , username (unique)

### detail page of a single resource

- Display resource details such as title, desciption, owner's username, added date, rating, number of likes and comments, list of comments
- Users can comment/rate/like on any resources
- Users can enter user's page by clicking owner/comment

### My resources

- users can view all their own and all liked resources on one page (filter function)
- users can go to the details page when they click on the resource
- owner can delete resource
- only show partial title/description if too long

### update profile

- users can update their profile (email, username, bio, first name, last name, link for profile picture)

### change password

- users can change their password
- can't change password if the old and new password are the same

### user page

- users can view user's info (profile picture, username, bio, full name)
- view the user's resources

### new resource

- users save an external URL along with a title and description
- users can make resource public/private
- users can categorize resource under a topic

### header

- users can search for already-saved resources created by any user
- display logout button / login link

### handle error

- if there is any errors, it is shown on the top of the page under nav bar

### history

- handle with history.js

## To do list

### deploy the server

### README.md

### responsive design

- hide nav bar

### home page

- order reources by date

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information

- username: `labber`
- password: `labber`
- database: `midterm`

3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`

- Check the db folder to see what gets created and seeded in the SDB

7. Run the server: `npm run local`

- Note: nodemon is used, so you should not have to restart your server

8. Visit `http://localhost:8080/`

- Use the `npm run db:reset` command each time there is a change to the database schema or seeds.
  - It runs through each of the files, in order, and executes them against the database.
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x

## Credit

- Favicons made by [I Wayan Wika](https://www.flaticon.com/authors/i-wayan-wika) from [www.flaticon.com](https://www.flaticon.com/), modified by @scc416

## Others

— What each of you did, individually

1 homepage plus search (Thar)
2 details page - gist (Siu)

- rating, like (also on homepage), comment, go to my page/other user page
  3 make new resources (Both)
- screenshot
- video (dailymotion, Getty Images, codepen, instagram)
- private/public
  4 my resources (Thar)
- filtering
  5 update profile (Both)
  6 login/logout/register (both)

— Show us what you built (demo)

— What you learned and/or what you’ll do differently in final projects

1 divide HTML into smaller ejs files
2 use React
3 learned about merge and we should merge more often
4 commit more often
5 googling skill
6 new async syntax
