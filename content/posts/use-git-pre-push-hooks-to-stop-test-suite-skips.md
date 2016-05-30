---
title: Use Git pre-push hooks to stop test suite skips
date: 2016-03-09
layout: blog-post.hbs
excerpt: "Git pre-push hooks are powerful, and can stop embarassing premature pushes of your half-finished stuff. I'll hook you up with some tips and tricks."
---

When working on larger refactors, I occasionally find it useful to use the test framework's skipping methods; either to only run a single test or to skip a few failing tests you'll get to later. This reduces your build-to-test time, sometimes drastically, and also reduces the noise of the build output. In Mocha, which I'm currently working with, you can use `.skip()` or `.only()` to [skip a single test or skip all but the selected test respectively](http://unitjs.com/guide/mocha.html#only-suite-or-test-case).

However, my scatter-gun commit policy of "make tiny, insignificant, not-thought-through commits all the time 'while things still work' and either rebasing or [explaining in a pull request later](https://zachholman.com/posts/git-commit-history/)" can introduce some awkwardness. if I push a test suite that only runs a single test because I left that `.only()` in there, and it suddenly passes something that's been failing for days and you've been slowly chipping away at, it's not a good look.

To the rescue comes [Git pre-push hooks](http://blog.ittybittyapps.com/blog/2013/09/03/git-pre-push/). These are different from pre-commit hooks in that they let you make as many stupid, profanely-worded, incoherent local commits as you want, but will only stop you if you try to push them. You could do a lot with these, like run your latest code against your test suite or linting. I decided to stop myself from pushing code that contains `.skip()` or `.only()`. Here's how I did it:

`.git/hooks/pre-push`:

<pre><code data-syntax-highlight class="language-clike" style="font-size: .75em">#!/bin/bash

mochaSkip=`git grep -e "\.only" --or -e "\.skip" HEAD`

if [ "$mochaSkip" ]
then
  commit=`git log --pretty=format:'%Cred%h%Creset %s' -G "(.only|.skip)" | head -n1`
  echo "Found Mocha test suite skip. This change was last introduced in:"
  echo $commit
  echo "Not pushing. (override with the --no-verify flag)"
  exit 1
fi
exit 0
</code></pre>

([view this snippet on Github Gists for better syntax highlighting](https://gist.github.com/jegtnes/c456ba31148b17a3cec6))

I'm hardly a wizard with bash scripts and Git hooks, this is largely based off [Peter Goldsmith's examples linked to earlier](http://blog.ittybittyapps.com/blog/2013/09/03/git-pre-push/), adapted to suit my needs. Thanks, Peter!

## Wait, what?
There're a few things in here that aren't immediately obvious if you don't know bash scripts or Git. Here's an attempt at explaining them:

- Backticking lets you execute commands and optionally store the results of them in a variable
- `git grep "something" HEAD` only searches for "something" in the current committed state (the HEAD). If you committed something earlier but then fixed it, this won't yell at you.
- `git grep --or` lets you search for the instance of one _or_ the other terms.
- `git log -G` lets you search the full repository history with a regular expression. We use this here to find out when the latest commit adding either ".only" or ".skip" was.
- `--pretty=format:'%Cred%h%Creset %s` is a bit indecipherable, but it has meaning. `pretty=format` is a way to format your Git log messages in exactly the format you want. If you have a spare week and are way smarter than me, [you can read the official Git docs](https://git-scm.com/docs/pretty-formats). I copy/pasted some things until I got what I want:
  - `%Cred` colours the text following it red.
  - `%h` outputs the short commit hash.
  - `%Creset` turns the red colour off again.
  - `%s` outputs the commit message.
- `exit 1` tells the command to exit with a status code of 1 if we found the test suite skips. In Unix land, generally, exit codes that aren't 0 mean something's gone wrong. If a Git hook exits with a status code of anything but 0, it'll stop whatever you're trying to do. In this case, it'll abort the push and you've saved face!

And that's about it. This will save me a few premature pushes in the future—hopefully you may find it useful, or be able to modify this pre-push test to suit your needs!

Here's a quick gif of the hook in action.

![](/assets/images/2016-03-09-07_43_28.gif)
