---
title: Integrating prompts into your Shipit deployments
date: 2015-10-27
layout: blog-post.njk
excerpt: If you use Shipit to deploy things and want to be able to take certain actions depending on user input, this might be the thing for you.
---

The best deployment tool I've used for Node.js applications has been [shipit](https://github.com/shipitjs/shipit) combined with [shipit-deploy](https://github.com/shipitjs/shipit-deploy). When I dabbled in Ruby, Capistrano was a very slick tool to manage deployments, and Shipit is very Capistrano-like, which is nice. I know you can use Capistrano to deploy any language/framework, but if you're not using Ruby already, it's an overhead I like to avoid.

For a current basic Node.js prototype I'm building at the moment, the database and schema has been changing fairly rapidly. Since it's a prototype that's not released into the wild yet, I don't care too much about the sanctity of the database, so the simplest way to deal with migrations is to _delete the SQLite database file_. Picking your battles is important when time is at a premium.

To be able to do this in production, I created a custom Shipit task to delete this particular file on the server. However, this seemed like a thing you didn't want to accidentally do once the prototype has been launched and real user data is on the line.

To alleviate this, I thought I'd ask for confirmation before wiping the database. [Capistrano's `ask` makes this disgustingly easy](http://capistranorb.com/documentation/getting-started/user-input/), but at the time of writing, there's no Shipit equivalent. [shipit-captain](https://github.com/timkelty/shipit-captain/) includes this, but it's a bit lacking in documentation, and additionally comes with three kitchen sinks and a lost puppy.

Instead, we can make use of the splendiferous [inquirer.js](https://github.com/SBoudrias/Inquirer.js/) library instead. It took me about half an hour to integrate this into my Shipit configuration, and it was well worth the time. Here's how:

First off, install Inquirer so we can use it.
<code class="language-js">npm install --save-dev inquirer</code>.

Then, in your Shipit configuration file, require inquirer as you would any other Node module:
<code class="language-js">var inquirer = require('inquirer');</code>

Create a new blocking task where you want to act on user input, and make sure it takes a callback, so we can act on the input when appropriate. You want this to be blocking if it has the chance to affect any other part of the deployment workflow, but if it's a completely stand-alone task, it may be safe to not block. (I'm not sure. I haven't tried. I'm not your dad. Do whatever you want)

```js
shipit.blTask('wipeDB', function(callback) {
  // magic goes here
});
```

Inquirer only has one method, <code class="language-js">.prompt</code>. This method takes two parameters: one to many question config objects, and a callback. For the full details, see [Inquirer's documentation](https://github.com/SBoudrias/Inquirer.js/). This demonstration will focus on a boolean yes/no prompt: asking you if you _really_ want to wipe that production database.

As you can see below, we give the prompt a type, a name to refer to later, a default answer (as we're dealing with a production database here, it's probably a good idea to err on the side of caution and set the default to _nope_), and the question to ask the user.

```js
inquirer.prompt({
      type: 'confirm',
      name: 'wipeConfirmation',
      default: false,
      message: 'Here be dragons! Running this will wipe the production database. This is not recoverable. Are you sure?'
    }, function(answer) {
      // Stuff goes here
})
```

So far, so good!
![An image of the command line output. The command run is 'shipit prod wipeDB'. Below that, text is seen saying 'Running wipeDB' task…. Below this, a question is asked: 'Here be dragons! Running this will wipe the production database. This is not recoverable. Are you sure? y/N](/assets/images/content-images/Screen-Shot-2015-10-27-at-16-30-10.png)

The `answer` parameter in the callback will be a single object, with the key we created earlier, <code class="language-">wipeConfirmation</code>. This will let us check for the user's answer and take actions accordingly:

```js
if (answer.wipeConfirmation === true) {
    // wipe DB
    callback();
}
else {
    // do nowt
    callback();
}
```

In my case, this is what the full Shipit function looks like:

```js
var inquirer = require('inquirer');
shipit.blTask('wipeDB', function(callback) {
    var dbPath = path.join(shipit.config.deployTo, 'shared', 'storage', 'db.sqlite3');

    inquirer.prompt({
      type: 'confirm',
      name: 'wipeConfirmation',
      default: false,
      message: 'Here be dragons! Running this will wipe the production database. This is not recoverable. Are you sure?'
    }, function(answer) {
      if (answer.wipeConfirmation === true) {
        console.log('Sure thing. Wiping database…');
        shipit.remote('rm -f ' + dbPath)
        callback();
      }
      else {
        console.log('Aborted command. Your database remains untouched.');
        callback();
      }
    });
  });
```

And it works!

![A screenshot of the previous command being ran twice, first saying yes and then saying no, and the appropriate output being displayed](/assets/images/content-images/Screen-Shot-2015-10-27-at-16-33-51.png)

Go forth and run your deployment tasks safe in the knowledge that your users are _really_ sure they wanted to do it!
