Cheatsheets:
https://www.freecodecamp.org/news/the-react-cheatsheet-for-2020/
https://devhints.io/react

# Create new app

- npm init react-app my-app


* add Redux:
- npm install redux



# What to import

'''
	import React, {useState} from 'react';
	import ReactDOM from "react-dom";
'''


# How to work with state

'''
	### initialize local state
	function someComponent() {
		const [someVar, changeSomeVarFunction] = useState(defaultValue);
		return (
			<h1>some component</h1>
		)
	### change local state
		changeSomeVarFunction(newStateData)
	}
'''

# Do stuff when component is mounted
'''
	import React, { useState, useEffect } from 'react';
	
	function Example() {
	  const [count, setCount] = useState(0);

	  // Similar to componentDidMount and componentDidUpdate:
	  useEffect(() => {
	    // Update the document title using the browser API
	    document.title = `You clicked ${count} times`;
	  });

	  return (
	    <div>
	      <p>You clicked {count} times</p>
	      <button onClick={() => setCount(count + 1)}>
	        Click me
	      </button>
	    </div>
	  );
	}
'''
By default, React runs the effects after every render — including the first render.