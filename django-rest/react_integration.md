# Integration of REACT with django-rest

## Single Page Application Mode

- article:
	https://www.valentinog.com/blog/drf/#Django_REST_with_React_Django_and_React_together

1. JS side setup (inside project root):
	- set up js
	```
		npm init -y
		npm i webpack webpack-cli --save-dev
		npm i @babel/core babel-loader @babel/preset-env @babel/preset-react babel-plugin-transform-class-properties --save-dev
		npm i react react-dom prop-types --save-dev
	```

Configurint build scripts:

### Simple app (one .js file like a single page app)

	package.json
	```
		  "scripts": {
		    "dev": "webpack --mode development ./project/frontend/src/index.js --output ./project/frontend/static/frontend/main.js",
		    "build": "webpack --mode production ./project/frontend/src/index.js --output ./project/frontend/static/frontend/main.js"
		  },
	```

	babel.rc
	```
		{
		    "presets": [
		        "@babel/preset-env", "@babel/preset-react"
		    ],
		    "plugins": [
		        "transform-class-properties"
		    ]
		}
	```

	webpack.config.js
	```
		module.exports = {
		  module: {
		    rules: [
		      {
		        test: /\.js$/,
		        exclude: /node_modules/,
		        use: {
		          loader: "babel-loader"
		        }
		      }
		    ]
		  }
		};
	```

### Separate apps resulting in multiple .js files being built
This is the scenario where you have an app for each section of the website

	package.json
	```
		  "scripts": {
		    "dev": "webpack --mode development",
		    "prod": "webpack --mode production"
		  },
	```

	babel.rc
	```
		{
		  "presets": [
		    [
		      "@babel/preset-env",
		      {
		        "targets": {
		          "node": "10"
		        }
		      }
		    ],
		    "@babel/preset-react"
		  ]
		}
	```
	
	webpack.config.js
	```
		module.exports = {
		    entry: {
		      name_of_resulting_file: './path/to/file/in/src/name.js',
		      homepage: './myApp/frontend/src/Homepage.js',
		      product: './myApp/frontend/src/ProductApp.js',
		      profile: './myApp/frontend/src/ProfileApp.js',
		    },
		    output: {
		        filename: '[name].js',
		        path: __dirname +'/myApp/frontend/static/frontend/'
		    },
		    module: {
		        rules: [
		            {
		                test: /\.js$/,
		                exclude: /node_modules/,
		                use: {
		                    loader: "babel-loader"
		                }
		            }
		        ]
		    }
		};
	```


2. Set up django frontend app
	- make new app - frontend	
	```
	python manage.py startapp frontend
	```

	- make new view inside frntend app to point to the html template that will load the react app file
	- create static and src folders to host compiled .js files
	- make urls.py and views.py

3. Writing the simple react app

homepage.html
```
    <div id="app"></div>
	<script src="{% static 'frontend/homepage.js' %}"></script>
```

src/homepage.js
```
import React, {useState, useEffect, Fragment} from "react";
import ReactDOM from "react-dom";

function App() {
	return (
		<h1>Welcome to the app!</h1>
	)
}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App/>, wrapper) : null;
```

4. Compile
Run build script with dev or prod
```
npm run dev
```
	
## Nano Mode
``` frontend interfaces to be like a teenage gymnast: lightweight and flexible ```
The purpouse of this approach is to minimize both the js bundle sizes and the number of requests. There will be onl 2 .js files neccessary: 
	1. common js package (containing libraries used all around the website)
	2. website url specific app
This is for when you want to have mini-SPAs like dashboard/account/settings/ or /dashboard/orders/
It is basically server-serving self-containing javascript lightweight apps managing resources through REST endpoints

1. Change webpack.config
this makes webpack to ignore the said packages and route them to the values
https://webpack.js.org/configuration/externals/
```
externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
```
2. Pack react and react-dom in webpack.config
```
entry: {
	'''
	'static/js/react-bundle': ['./app/static/js/react.min.js', './app/static/js/react-dom.min.js'],
	'''
}
```
3. Add script to html file



https://www.debugbear.com/blog/bundle-splitting-components-with-webpack-and-react