## Features

### home page

- display all the resources
- users can like any resource
- display screenshot/embed video uploaded by the user
- diplsay title, rating, number of likes, desciption, owner's username, added date
- users can view resources by catergory
- only show partial title/description if too long

### login

- users can login with email/username and password

### logout

- users can logout

### register

- users can regsiter with email(unique), password(enter twice) , username(unique)

### detail page of a single resource

- users can comment/rate/like on any resources

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

## To do list

### deploy the server

### README.md

### history

### responsive design

- hide nav bar

### edit page

- edit url, description, title, category
- change public/private

### home page

- order reources by date

### new resource

- upload image

# LHL Node Skeleton

## Project Setup

The following steps are only for _one_ of the group members to perform.

1. Create your own copy of this repo using the `Use This Template` button, ideally using the name of your project. The repo should be marked Public
2. Verify that the skeleton code now shows up in your repo on GitHub, you should be automatically redirected
3. Clone your copy of the repo to your dev machine
4. Add your team members as collaborators to the project so that they can push to this repo
5. Let your team members know the repo URL so that they use the same repo (they should _not_ create a copy/fork of this repo since that will add additional workflow complexity to the project)

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

## Warnings & Tips

- Do not edit the `layout.css` file directly, it is auto-generated by `layout.scss`
- Split routes into their own resource-based file names, as demonstrated with `users.js` and `widgets.js`
- Split database schema (table definitions) and seeds (inserts) into separate files, one per table. See `db` folder for pre-populated examples.
- Use the `npm run db:reset` command each time there is a change to the database schema or seeds.
  - It runs through each of the files, in order, and executes them against the database.
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x

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
