module.exports = function(grunt) {
        // Project configuration.
        grunt.initConfig({
                
                cssmin: {
                        add_banner: {
                                options: {
                                  //banner: '/* My minified css file */'
				 keepSpecialComments : 0,
				 report :	'gzip'
                                },
                                files: {
                                  'iphone-app.min.css': ['css/*.css' , '!css/bootstrap*.css' , '!css/font-awesome*.css']
                                }
                        }
                }
        });
        
        
        
        grunt.loadNpmTasks('grunt-contrib-cssmin');
  

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['cssmin']);
};
