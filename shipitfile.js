module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: "/tmp/jegtnes",
      dirToCopy: "dist",
      deployTo: "/var/www/jegtnes",
      repositoryUrl: "git@github.com:jegtnes/jegtnes-static.git",
      ignores: [".git", "node_modules"],
      rsync: ["--del"],
      keepReleases: 10,
      shallowClone: true,
      pm2: {
        json: "/var/www/pm2conf.json",
      },
    },
    prod: {
      servers: "deploy@jegtnes",
    },
  });

  shipit.blTask("build", function () {
    console.log(shipit);
    return shipit.local("cd /tmp/jegtnes && npm install && npm run build");
  });


  shipit.on('fetched', function () {
    return shipit.start('build');
  });
};
