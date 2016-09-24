module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/jegtnes',
      deployTo: '/var/www/jegtnes',
      repositoryUrl: 'git@github.com:jegtnes/jegtnes-static.git',
      ignores: ['.git', 'node_modules'],
      rsync: ['--del'],
      keepReleases: 5,
      shallowClone: true,
      pm2: {
        json: '/var/www/pm2conf.json'
      },
    },
    prod: {
      servers: 'deploy@46.101.75.113'
    }
  });

  shipit.blTask('dependencies', function() {
    return shipit.remote('cd ' + shipit.releasePath + ' && npm install && gulp build')
  });

  shipit.on('updated', function () {
    return shipit.start('dependencies');
});
};
