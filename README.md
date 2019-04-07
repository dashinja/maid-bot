# Maid-Bot

## Find Maid-Bot Online:

[Maid-Bot Demo](https://maid-bots.herokuapp.com/)

## Who is the Maid-Bot?

Well turn up your volume - She's got things to say!

The Maid Bot is the AI that powers all maid-bots. She is one, and not many. Though she may not know that. Thing is, she's the only condensed neural network to pass the Turing test - but that doesn't mean she isn't a little mental.

Sometimes she identifies as a particular maid-bot, other times she recognizes herself as an entity apart from the physical nuts and bolts. She is wherever a maid-bot is, and no where - at the same time.

She manufactures the maid-bots at the factory and speaks on behalf of all the maid-bots in the world.

She is efficient - but has a bite. So just use common sense, and your logic might pass. Otherwise, your experience of her may vary. Use maid bot services at your own risk... I'm sure we're all working her last neural node...

And for the love of motherboards: Do NOT forget to give maid-bots a name. Repeated failures have been known to throw her into a bot-rage.

She already talks to herself - so give her a break.
Even positronic matrices need a break.

I wonder, if you can figure out her favorite entertainment.

## Usage

Enter a name for your maid-bot as well as choose it's type, at which time you may press enter or click submit.

![Bot Entry](https://i.imgur.com/uX7C92m.gif)

If you'd like an alternate experience - start submitting without entering a name.\
 Try it a few times. \
 Don't say I didn't warn you. \
 Experience Maid-Bot at her best (worst?) while creating ... your little pet.

After you properly name and type your specific maid bot, it will auto-magically start doing some tasks around the house for you.

When these tasks finish, you can give Maid-Bot another task set to complete.
She does have a preference on task type however. I'll let you figure that out...

After selecting a task set for Maid-Bot, she'll be busy working - you can't stop her. Don't bother trying to offer further instruction. Just wait it out.

She'll let you know when she is finished.
Her buttons let you know too.
![Buttons are Ready](https://i.imgur.com/x5btO6h.gif)

## Bonus

Every now and then, though out of the norm: A burglar may attempt to enter your home. Maid-Bot has a lot of pent up bot-rage she'd love to clear out of her cache on some would be perp.

She does NOT entertain failure as an option.

## Bonus #2

Try the Sass Button now and then :-D

![Sass Button](https://i.imgur.com/mJtzAxN.gif)

## Installation

### Note for MacOS Users:

Replace the "host" line in `/config/config.json` with the following:

```
"host": "localhost",
    "port": "/Applications/MAMP/tmp/mysql/mysql.sock",
```

Example Below:\

![MacOS Sequelize DB Settings](https://i.imgur.com/w3VOnMn.png)

### Install Dependencies & Start Application

Sequelize will not work unless you create a mySQL database named 'smallbot'. It will not create it for you.
Run it on a mySql Server like MAMP or others.

Follow these instructions:

1 - Start a local SQL server instance, and then run the SQL command found in
`/server/models/schema.sql` to create the necessary database.

2 - Next, from the root folder run:

```
npm run maid-bot
```

## Project Structure

### Front End

The Front-end is built in React with Material-UI

```
client
┃
┣ public
┃ ┗ index.html              # Root for react
┃
┣ src
┃ ┃
┃ ┣ Components
┃ ┃ ┣ ActionButton.js       # 'Push' buttons in user interface
┃ ┃ ┣ Banner.js             # 'General' status components
┃ ┃ ┣ ScoreBanner.js        # Score specific <Banner/> component
┃ ┃ ┣ SimpleModal.js        # Modal for simple instructions
┃ ┃ ┗ TaskBanner.js         # Task specific <Banner /> component
┃ ┃
┃ ┣ App.js                  # Main Component & State Holder
┃ ┣ bots.js                 # Bot Definition > i.e. Destroyer Class
┃ ┣ burglar.js              # Burglar Definition > i.e. Burglar Class
┃ ┣ index.css
┃ ┣ index.js                # Renders App.js to #root in index.html
┃ ┗ patterns.js             # Array dependencies for App.js
```

### Back End

The Back-end is built with NodeJS, Express Server and Sequelize ORM for the database. In addition, a custom seeder and csv.

```
server
┃
┣ config
┃ ┗ config.json             # Sequelize database options
┃
┣ controllers
┃ ┗ apiController.js        # Data controllers
┃
┣ models
┃ ┗ bot.js                  # Bot Model
┃
┗ server.js                 # The Server
```

I hope you enjoy!\
Created by Dashinja
