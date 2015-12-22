(function(){
//noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols
	"use strict";


	//  Page objects
	
	//==============================
	//
	//
	//
	function Page(pageName, title, url){
		this.pageName = pageName;
		if (url) {
			this.url = url
		} else {
			this.url = this.pageName + "/";
		}
		this.href = "#" + this.pageName;
		this.title = title;
		this.pageCategories = {
			splashPages: splashPages
		,   errorPages : errorPages
		,   otherPages : otherPages

		}
	}
	
	//extends page for use with the splash pages.
	
	function SplashDesign(splashName, version){

		this.splashName = splashName;
		this.vsion = version;
		this.title = "Design " + this.splashName + "v" + this.vsion;
		this.url = "design" + this.splashName + "/";
		this.template = "splash_d" + this.splashName + "_v" + this.vsion;
		this.page = {};
		Page.call(this, this.splashName, this.title, this.url);

	}
	function OtherPage(pageName, title, header, subheadline){
		Page.call(this, pageName, title);
		this.header = header;
		this.subheadliine = subheadline;
		this.page = {};
		//this.title = title;
		//this.pageName = pageName;
		//this.prototype = Page;
		//Page.call(this, this.pageName, this.title);
	}


	function Btn(action, cls, id, type, text){
		this.action = action;
		this.class = cls;
		this.id = id;
		this.type = type;
		this.text = text;
	}

	//  node requires
	
	//==============================
	//
	//
	//
	var express = require('express')
		, hbs = require('express-hbs')
		, app = express()
		, path = require('path')
		, Server = require('./server')
	
	//  view paths
	
	//==============================
	//
	//
	//
		, viewsD = __dirname + '/views/'
		, partialsD = viewsD + 'partials/'
		, layoutsD = viewsD + 'layouts/'
		, finishedD = '/public/finished/'
	
	//  view file paths		
	
	//==============================
	//
	//
	//
		, publicD =  path.join(__dirname, 'public')
		, defaultF = layoutsD + 'default.hbs'
		, funerrorF = layoutsD + 'funerror.hbs'
		, truckF = layoutsD + 'truck.hbs'
		, gameF = layoutsD + 'podder.hbs'
		, fnfF = layoutsD + '404.hbs'
		, errorF = layoutsD + 'error.hbs'
		, testF = partialsD + 'test.hbs'
	
	//  view data
	
	//  ==============================
	//
	//
	//
	
		, d2v1 = new SplashDesign("2", "1")
		, d2Av1 = new SplashDesign("2a", "1")
		, d7v1 = new SplashDesign("7", "1")
		, funerror = new OtherPage("funerror", "Fun Errors", "Oopsie Doopsies!", "We can't find what you're looking for.")
		, truck = new OtherPage("truck", "Truck", "", "")
		, game = new OtherPage("podder", "Game", "Oh you thought this was some kind of game?", "You were right.")
		, error = new OtherPage("error", "Error Page", "Oh No!", "We must be out delivering groceries." )
		, fnf = new OtherPage("404", "404", "Oh No!","We can't find what you're looking for." )
		, test = new OtherPage("Testing", "featuring Require.js!", "","" )
		, genericButton = new Btn("none", "subsection_button", "test", "button", "Action Button")
		, generic_subsection = {
			id : "generic"
			,   headline: "Additional Sub-Headline <strong>Text</strong>"
			,   figure: {
				src : ""
				,   alt : "figure alt"
				,   caption : "figure caption"
			}
			,   text: "<p> Copy explaining the program. Lorem ipsum dolor sit amet, consectetur adipderp elite, sed do derp a derp incidid unt ut, derpa swaga derp et dolore magna carta jay z.</p>"
			,   button: [genericButton]
		}
		, splashes = []
		, splashPages = []
		, errorPages = []
		, otherPages = []
		, portN = 5000;

	d7v1.page = {
		id : "splash_d7_v1"
		,   headline : "Headline <strong>Text</strong>"
		,   top_banner : {
			src : "images/splash_d7_v1.png"
			,   figcaption : "This is assuming the banner relates to the article and is not an ad."
		}
		,   subsections : [generic_subsection, generic_subsection, generic_subsection, generic_subsection]
	};
	d2v1.page =  {
		id : "splash_d2_v1"
		,   headline : "Headline <strong>Text</strong>"
		,   mainText: "<p>Copy explaining the program. Lorem ipsum dolor sit amet, consectetur adipderp elite, sed do derp a derp incidid unt ut, derpa swaga derp et dolore magna carta jay z.</p>"
		,   mainImg : {
			src : "images/splash_d2_v1.png"
			,   caption : "This is assuming the banner relates to the article and is not an ad."
		}
		,   subsections : [generic_subsection]
	};
	d2Av1.page = {
		id : "splash_d2A_v1"
		,   headline : "Headline <strong>Text</strong>"
		,   mainText: "<p>Copy explaining the program. Lorem ipsum dolor sit amet, consectetur adipderp elite, sed do derp a derp incidid unt ut, derpa swaga derp et dolore magna carta jay z.</p>"
		,   mainImg : {
			src : "images/splash_d2A_v1.png"
			,   caption : "This is assuming the banner relates to the article and is not an ad."
		}
		,   subsections : [generic_subsection]
	};
	fnf.page = {
		img : {
			src : "/images/peapodTruck.jpg",
			alt : "A peapod truck!"
		},
		button : [{
			href : "/",
			text : "Peapod Home"
		}, {
			href : "/help",
			text : "Help"
		}, {
			href : "/contact",
			text : "Contact Us"
		}]
	};

	funerror.page = {
		//header : "Oopsie Doopsies!",
		//subheadline : "We can't find what you're looking for.",
		img : {
			src : "/images/peapodTruck.jpg",
			alt : "A peapod truck!"
		},
		exit : "Try clicking this big button.",
		button : {
			href : "/",
			text : "Yep, this one!"
		}
	};

	error.page = {
		//header : "Oh No!",
		//subheadline : "We must be out delivering groceries.",
		img : {
			src : "/images/peapodTruck.jpg",
			alt : "A peapod truck!"
		},
		exit : "Please come back in a bit.<br /><span>or</span>",
		reason : "Our service is currently down due to maintenance.",
		button : {
			href : "/",
			text : "Refresh This Page"
		}
	};


	splashPages.push(d7v1, d2v1, d2Av1);
	errorPages.push(funerror, fnf, error);
	otherPages.push( game, truck);
	splashes.push(d7v1, d2v1, d2Av1);
	var pageCategories = {
		splashPages: splashPages
	,   errorPages : errorPages
	,   otherPages : otherPages

	}
	
	//==============================
	//  express setup
	//
	//
	//
	    app.use(express.static(publicD)).use(express.bodyParser()).use(express.logger('dev')).use(express.methodOverride()).use(require('browserify')({
	            require: [ 'jquery-browserify' ]
	        }));
		app.set('view engine', 'hbs').set('port', process.env.PORT || portN).set('cache', false).set('views', viewsD);
		app.engine('hbs', hbs.express3({
	        partialsDir: partialsD,
	        //defaultLayout: defaultF,
		    layoutsDir: layoutsD
	    }));
		hbs.registerHelper("everyOther", function (index, amount, scope) {
		if ( (++index ) % amount ){
			return scope.inverse(this);
		} else {
			return scope.fn(this);
		}
	});

	function list ( obj ) {
		for (var i in obj){
			console.log(obj[i]);
		}
	}


	
	//Todo: set up dynamic routes.
	app.get('/funerror/',function (req, res) {
		console.log("funerror \n" + list(funerror));
		res.render(funerrorF, funerror);
		
	});
	app.get('/truck/',function (req, res) {
		console.log("truck \n");
		res.render(truckF, truck);
		
	});
	app.get('/game/',function (req, res) {
		 console.log("game \n" + game.page.header);	
		res.render(gameF, game);
	});
	app.get('/404/',function (req, res) {
		 console.log("game \n" + fnf.page.header);	
		res.render(fnfF, fnf);
	});
	app.get('/error/',function (req, res) {
		 console.log("game \n" + error.page.header);	
		res.render(errorF, error);
	});
	app.get('/finished/',function (req, res) {
		var errorF = finishedD + "error.html";
		res.send(errorF);
	});
	app.get('/design2/', function (req, res) {
		console.log(splashes);
	    res.render(partialsD + d2v1.page.id, splashPages[1]);
		
	});
	app.get('/design2a/', function (req, res) {
		console.log(partialsD + d2Av1.page.id);
	    res.render(partialsD + d2Av1.page.id, splashPages[2]);
	});   
	app.get('/design7/', function (req, res) {
		console.log(d7v1.url);
	    res.render(partialsD + d7v1.template, splashPages[0]);
	});
	app.get('/test/', function (req, res) {
		console.log(Object.keys(pageCategories));
	    res.render(testF, pageCategories);
	});
	app.get('/', function (req, res) {
	    res.render(defaultF, pageCategories);
	});
	new Server(app);

})();