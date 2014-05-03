/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function(grunt) {
        // Project configuration.
        grunt.initConfig({
                
                cssmin: {
                        add_banner: {
                                options: {
                                  //banner: '/* My minified css file */'
                                },
                                files: {
                                  'output.min.css': ['css/*.css' , '!css/bootstrap*.css']
                                }
                        }
                }
        });
        
        
        
        grunt.loadNpmTasks('grunt-contrib-cssmin');
  

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['cssmin']);
};
