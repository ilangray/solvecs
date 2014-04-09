"use strict"
LIVERELOAD_PORT = 35729

###

Files to copy for dist:
    1) index.html
    2) lib/*
    3) scripts/*
    4) stylesheets/*

###

module.exports = (grunt) ->
    # load all dependencies
    require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks

    # configure grunt
    grunt.initConfig
        watch:
            compass:
                files: ["sass/*.{scss,sass}"]
                tasks: ["compass"]

        livereload:
            options:
                livereload: LIVERELOAD_PORT
            files: [
                "*.html"
                "{.tmp}/stylesheets/{,*/}*.css"
                "{.tmp}/scripts/{,*/}*.js"
            ]

        compass:
            options:
                sassDir: "sass"
                cssDir: "stylesheets"
                relativeAssets: true
            dist: {}
            server:
                options:
                    debugInfo: true

    grunt.registerTask "default", ['watch']