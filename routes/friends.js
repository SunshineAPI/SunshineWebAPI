"use strict";
var express = require("express");
var router = express.Router();
var parser = require("../modules/parser");
var request = require("request");
var cheerio = require("cheerio");
var auth = require("../modules/auth");
router.get("/all",function(req,res){
    var login = req.headers.authorization;
    var arr;
    if (login) {
        arr = login.split(":");
    }
    if (!login || arr.length !== 2) {
        return res.status(401).json({
            errors: ["Provide login credentials"]
        });
    }

    var pass = arr[1];
    var username = arr[0];

    var options = {
        method: "GET",
        url: "https://oc.tc/friendships",
        headers: {
            "content-type": "x-www-form-urlencoded",
            "User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"
        }
        
    };

    auth.authed_req(options, username, pass, function(error, response, body) {
        if (error) {
            return res.status(error.status).json({
                errors: [error.message]
            });
        }
        var all = new Array();
        var $ = cheerio.load(body);
        var allfriends = $(".friend-icon");
        allfriends.each(function(i,elem){
            all[i] = $(this).children(".thumbnail").attr("href").substring(1,$(this).children(".thumbnail").attr("href").length);
        });
        res.json(all);
    });
});

router.get("/offline",function(req, res) {
     var login = req.headers.authorization;
    var arr;
    if (login) {
        arr = login.split(":");
    }
    if (!login || arr.length !== 2) {
        return res.status(401).json({
            errors: ["Provide login credentials"]
        });
    }

    var pass = arr[1];
    var username = arr[0];

    var options = {
        method: "GET",
        url: "https://oc.tc/friendships",
        headers: {
            "content-type": "x-www-form-urlencoded",
            "User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"
        }
        
    };

    auth.authed_req(options, username, pass, function(error, response, body) {
        if (error) {
            return res.status(error.status).json({
                errors: [error.message]
            });
        }
        var all = new Array();
        var $ = cheerio.load(body);
        var allfriends = $(".span1");
        allfriends.each(function(i,elem){
            all[i] = $(this).children(".thumbnail").attr("href").substring(1,$(this).children(".thumbnail").attr("href").length);
        });
        res.json(all);
    });

});
router.get("/online",function(req, res) {
    var login = req.headers.authorization;
    var arr;
    if (login) {
        arr = login.split(":");
    }
    if (!login || arr.length !== 2) {
        return res.status(401).json({
            errors: ["Provide login credentials"]
        });
    }

    var pass = arr[1];
    var username = arr[0];

    var options = {
        method: "GET",
        url: "https://oc.tc/friendships",
        headers: {
            "content-type": "x-www-form-urlencoded",
            "User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"
        }
        
    };

    auth.authed_req(options, username, pass, function(error, response, body) {
        if (error) {
            return res.status(error.status).json({
                errors: [error.message]
            });
        }
        var all = new Array();
        var $ = cheerio.load(body);
        var allfriends = $(".span2");
        allfriends.each(function(i,elem){
            all[i] = $(this).children(".thumbnail").attr("href").substring(1,$(this).children(".thumbnail").attr("href").length);
        });
        res.json(all);
    });
});



module.exports = router;