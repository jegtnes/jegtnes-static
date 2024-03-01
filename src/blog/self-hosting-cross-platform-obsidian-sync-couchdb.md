---
title: "Self-hosting Obsidian Sync for iOS, Android, Mac, and Windows with CouchDB"
date: 2024-03-01
location: Oslo, Norway
layout: blog-post.njk
excerpt: "How to set up a self-hosted sync solution for the note-taking-app Obsidian that works cross-platform, backed by CouchDB on your own server."
tags: ["subscription-fatigue", "obsidian-meta", "cross-os"]
---

I've recently been interested in [Obsidian](https://obsidian.md) to organise my notes and thoughts more cohesively. I'm a big Markdown proponent, and the ability to easily link several Markdown documents for cross-referencing seems very powerful. However, to give it a fair go, I needed to set it up on all of my devices, which encompass my Macbook, my Windows desktop computer, my Android phone, and my iPad, and yes, that's 4 devices with 4 different operating systems. I should get back into Linux on the desktop to make life _even_ more awkward.

Obsidian has its own sync service, which looks nice, but looks geared to power users; $96/year for 10GB of data is not a bad proposition for an independent service, but for my use cases, I think it'd take several years of constant usage before I even approach 1GB - my notes are 99% text-based. To be clear: I'm entirely not opposed to giving money to software that enhances my life, and If I stick with Obsidian I probably will subscribe at some point, but I'm trying to curtail the sheer amount of subscriptions in my life for the time being. If Obsidian had offered a 1GB tier for ~$25 a year (and keeping in mind that's ~$10 less than I pay Google for Google One's 100GB), I still would have just subscribed to that instead and this post would have never gotten made. However, they don't, and so here we are. 

In theory Obsidian's vaults should be easy to sync, since it's just a bunch of Markdown files in folders. Whack them in Google Drive/OneDrive/your-folder-sync-as-a-service-of-choice-here, and you're done, right? Sure, unless you're awkward like me and run the gamut of four different operating systems. iOS is a bit of a dick about being able to continuously access and background sync entire folders that 'belong' to other apps, so that rules out syncing to my iPad.

Obsidian has iCloud support but that's wonky on Windows and unsupported on Android, so that rules that out.

What I'm taking from this is that Apple _really_ want you to not buy any devices that aren't Apple devices. Anyhow.

Scouring the internet left me with two options: 
- Two external apps, [Syncthing](https://syncthing.net/) for Windows, Android, MacOS, and [Möbius](https://apps.apple.com/us/app/m%C3%B6bius-sync/id1539203216) for iOS
- [Obsidian LiveSync](https://github.com/vrtmrz/obsidian-livesync) - an Obsidian community plugin that uses CouchDB to sync

I preferred the look of the latter option, as it seemed simpler to handle this via an Obsidian plugin instead of installing _another_ app across my devices for just this one use case, and I have a <abbr title="Virtual Private Server">VPS</abbr> that has plenty of spare network and computing capacity.

So without further lengthy pre-amble, here's how you might do this.

## Prerequisites, disclaimers, and whathaveyounots
- This assumes you are familiar with a Linux command line, and have rudimentary knowledge of managing a web server. If this doesn't apply to you, you may well still be able to use Obsidian LiveSync, but using [Cloudant](https://github.com/vrtmrz/obsidian-livesync/blob/main/docs/setup_cloudant.md) or [Fly.io](https://github.com/vrtmrz/obsidian-livesync/blob/main/docs/setup_flyio.md) instead if you're sane enough to not want to run your own web server.
- My server runs Ubuntu, if you have enough opinions about Linux distributions that you're not on Ubuntu, I also trust you have the common sense to work out the differences between distributions to also follow this guide
- You will need to expose your server to the public internet, if it isn't already. I use Nginx to do this, since that's what I use to serve my other sites, but [other options are available](https://docs.couchdb.org/en/stable/best-practices/reverse-proxies.html).
- You will need to be able to have your CouchDB endpoint behind SSL for this to work on Obsidian for iOS or Android, and it's a good idea to do so even if you don't. I use [Let's Encrypt](https://letsencrypt.org/) for this, which is easy and free.
- Needless to say, you should back up your vault(s) before you attempt any of this. Obsidian LiveSync also strongly suggest you remove your vaults from any sort of other sync solution, including folder-syncs-as-a-service, before you set this up.

## Installing CouchDB
CouchDB is not available on apt's default package repositories, so you'll need to jump through some hoops to make this happen. [CouchDB's instructions are here](https://docs.couchdb.org/en/stable/install/unix.html).

The installation process will then ask you whether you're wanting to install it in standalone mode or as part of a cluster; it will almost certainly be standalone mode - if you need a cluster to sync your notes you will need help that I am in no way qualified to give you.

Despite choosing this, I was asked for an "Erlang magic cookie value", which I have no idea what is, and why it's relevant for standalone mode. That's okay, I charged forward thinking that if this actually has any implications at any point, that's future Alex's problem, randomly generated a 64 character string that I stored as part of the server's entry in my 1Password, and moved on.

<div class="half-bleed">
    <img src="/assets/images/content-images/erlang-magic-cookie.png" alt='A terminal prompt titled "Configuring couchdb", text reads the following: A CouchD node has an Erlang magic cookie value set at startup. This value must match for all nodes in the cluster. If they do not match, attempts to connect the node to the cluster will be rejected. CouchDB Erlang magic cookie' />
</div>

Following on from this prompt, I then accepted the default server binding address - 127.0.0.1, and set a secure admin password. Do not skip this, that'd be silly.

Finally, I was asked if I wanted to restart some services. Sure, why not. A little restart, as a treat.

Once you're all done your installation should be working and accessible - to test this, run `curl http://localhost:5984` (from your server's SSH session, not your local machine) - this should return a JSON response.

## Configuring CouchDB
Once CouchDB is running, you need to configure it to set the correct settings so that Obsidian will be able to talk to it. The CouchDB settings file that you want to edit is `/opt/couchdb/etc/local.ini` - and [Obsidian LiveSync currently recommends the below settings for CouchDB >=3.3](https://github.com/vrtmrz/obsidian-livesync/blob/main/docs/setup_own_server.md):

```
[couchdb]
single_node=true
max_document_size = 50000000

[chttpd]
require_valid_user = true
max_http_request_size = 4294967296
enable_cors = true

[chttpd_auth]
require_valid_user = true
authentication_redirect = /_utils/session.html

[httpd]
WWW-Authenticate = Basic realm="couchdb"
bind_address = 0.0.0.0

[cors]
origins = app://obsidian.md, capacitor://localhost, http://localhost
credentials = true
headers = accept, authorization, content-type, origin, referer
methods = GET,PUT,POST,HEAD,DELETE
max_age = 3600
```

## Optional - set up a domain or subdomain
I set up a subdomain of jegtnes.com to act as my CouchDB endpoint - I could probably have just used a path of jegtnes.com, but subdomains keep my Nginx configs clearer and it's always good to not have to deal with path routing if you can avoid it. If you want to go with a subdomain or domain, set this up with your DNS provider.

## Configure nginx (or your web server of choice) to reverse proxy CouchDB
If your setup looks like mine - with a subdomain and Nginx as your web server, create a new Nginx config file for it:
`sudo touch /etc/nginx/sites-available/couchdb-subdomain.your-domain.com && sudo ln -s /etc/nginx/sites-available/couchdb-subdomain.your-domain.com /etc/nginx/sites-enabled/couchdb-subdomain.your-domain.com`

This is all you'll need in the site's config file to have Nginx work as a bare-bones reverse proxy server:
```
server {
    server_name couchdb-subdomain.your-domain.com
    listen 80;

    location / {
        proxy_pass http://localhost:5984;
        proxy_redirect off;
        proxy_buffering off;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

(If you don't want a subdomain, and want this to be hosted from the same domain as your personal site or whatever else is on your web server, you'll need to edit your existing config instead, and set a `location /couchdb {}` or similar block up in there with the proxy preferences inside.)

Run `sudo nginx -t` to make sure that your Nginx config files are valid and you didn't typo anything or forgot an errant semicolon. But you'd never do that, right?

If all is well, restart your Nginx server: `sudo service nginx restart`.

### Adding an SSL certificate
You are putting this behind SSL, right? If you're using Let's Encrypt, you'll then need to run `sudo certbot` and follow the instructions to generate a new SSL certificate for couchdb-subdomain.your-domain.com, and if all goes well it should edit the Nginx config for you. Hop on over to your computer's web browser and hit up https://couchdb-subdomain.your-domain.com - if all has gone well you'll see the same JSON you saw earlier when running `curl` on your server. 

## Hooking Obsidian LiveSync up with your CouchDB on a first device
Congrats, you've mostly gotten through the hard bits - now we just need to make Obsidian LiveSync talk to your server. Head to Obsidian LiveSync's options in the Obsidian preferences, select the "wizard" pane, and select the "Discard existing preferences and setup" option. This will then take you to a window where you fill in some details - the URI will be https://couchdb-subdomain.your-domain.com or whatever you configured it to be - the admin credentials will be what you chose earlier when you set up CouchDB, and the _database name_ you can choose yourself - I went for the convention 'obsidian-VAULT-NAME', since you can sync multiple vaults with the same CouchDB setup as long as they have a unique database name.

Once you've done this, press Test Database Connection, and if all is well, press Check Database Configuration. Oddly enough, despite following Obsidian LiveSync's CouchDB preference recommendations, I was told that several config options were wrong or suboptimal, but Obsidian LiveSync helpfully provided buttons to fix these individually.

![A screenshot from the Obsidian LiveSync preference panel, highlighting with a checkmark that some settings are correct, such as "chttpd.require-valid-user" a red exclamation mark that some settings are incorrect, such as "httpd.WWW-Authenticate" is missing, as well as six more similar errors](/assets/images/content-images/obsidian-sync-permissions.png)

Presumably, since it has admin credentials, it uses a CouchDB API of some sort to update the database settings. Seriously, massive kudos to Obsidian LiveSync for implementing this, many other similar solutions of similar stubborn neckbeardedness would have dumped out a raw error log at you and told you to go fuck yourself. This was really nice to see.

<figure>
    <img src="/assets/images/content-images/erlang-go-fuck-yourself.png" alt="A three-panel comic featuring two men in suits having a dialogue. Person 1: 'So, how do I query the database?' Person 2: 'Itʼs not a database. Itʼs a key-value store! 1: 'Ok, itʼs not a database. How do I query it?' 2: 'You write a distributed map reduce function in Erlang!' 1: 'Did you just tell me to go fuck myself?' 2: 'I believe I did, Bob'" />
    <figcaption>credit: <cite><a href="https://twitter.com/jrecursive/status/1414067934381547527">jrecursive</a></cite></figcaption>
</figure>

(I later found that the additional settings it changed were added to `/opt/couchdb/etc/local.d/10-admins.ini`.)

Once all your settings are working, you should be good to go! Have a look at some of the other of Obsidian LiveSync's settings, it's an advanced piece of kit and it's worth making sure it behaves how you want it to.

You can now visit `https://couchdb-subdomain.your-domain.com/_utils`, enter your admin credentials, and confirm that the database has been created and that things are moving into it, if you'd care to.

Once you're done tinkering, head back to the setup wizard screen and copy the setup URI, setting a sensible passphrase - you'll need this next.

![A screenshot from the Obsidian LiveSync preference panel, showing an open modal dialog titled "encrypt your settings" with one field labelled "the passphrase to encrypt the setup URI", and with OK and Cancel as context buttons](/assets/images/content-images/obsidian-sync-encrypt.png)

## Connecting Obsidian LiveSync to your CouchDB database on second and subsequent devices
On each of your other devices that you want to sync, create a new Obsidian vault, install the LiveSync plugin, and go to the setup wizard screen again. Press "Open setup URI" and paste the URI you grabbed at the end of the last step, then enter the passphrase. That should be all you need!

Keep in mind sync settings are by default unique to each device - so make sure you check and configure the other preferences like you did with the first device you set the synced vault up for.

## Setting up several vaults in Obsidian LiveSync with the same CouchDB install
As mentioned above, you can use the same CouchDB install for many separate vaults. Follow the last two steps again - once for the first device and once for the second and subsequent devices - just make sure that you change the database name accordingly so that it's unique for each vault.

## Conclusion
I realise that my unique requirements here are in the top percentile of niche use cases, but if you also happen to share this lovely percentile with me, hi, I think we'd be good friends, and I hope this has been helpful!
