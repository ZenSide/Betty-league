module.exports = function(grunt) {

  grunt.initConfig({
    includeSource: {
      options: {
        basePath: '',
        baseUrl: '',
        templates: {
          html: {
            js: '<script src="{filePath}"></script>',
            css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
          }
          //haml: {
          //  js: '%script{src: "{filePath}"}/',
          //  css: '%link{href: "{filePath}", rel: "stylesheet"}/'
          //},
          //jade: { // Or pug
          //  js: 'script(src="{filePath}", type="text/javascript")',
          //  css: 'link(href="{filePath}", rel="stylesheet", type="text/css")'
          //},
          //scss: {
          //  scss: '@import "{filePath}";',
          //  css: '@import "{filePath}";',
          //},
          //less: {
          //  less: '@import "{filePath}";',
          //  css: '@import "{filePath}";',
          //},
          //ts: {
          //  ts: '/// <reference path="{filePath}" />'
          //}
        }
      },
      myTarget: {
        files: {
          'index.html': 'index.tpl.html'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-include-source');

  grunt.registerTask('default', ["includeSource"]);
};

