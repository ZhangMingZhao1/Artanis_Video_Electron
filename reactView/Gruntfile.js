const timer = require("grunt-timer");
// const project = require("./package.json");

module.exports = function(grunt) {
    timer.init(grunt);
    //前端静态容器（xx.xx）路径 
    let base_tianhe = "/root";
  
    let static_tianhe = `${base_tianhe}/ceshi/`;
 
    // let cwd = process.cwd();

    function init_config() {
        let config = {
            'sftp-deploy': {
                remote_tianhe: {
                    auth: {
                        host: '114.67.37.2',
                        port: 19918,
                        authKey: 'dev_114.67.37.2'
                    },
                    progress: true, //是否显示进度条
                    src: './build',
                    dest: static_tianhe
                }
            }
        };

        return config;
    }
    let config = init_config();
    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-sftp-deploy');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.registerTask('lib', ['copy:lib']);
    grunt.registerTask('publish', ['sftp-deploy:remote_tianhe']);
};
