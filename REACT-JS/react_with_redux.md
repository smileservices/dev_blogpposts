# How to use react with redux

- example project: DEV_PLAY/redux_play

## The theory:
	- redux is a global state management that can be used over the components local state
	- can plug in components to react to the global state changes

	

## Packages:
	import React, 'react';
	import { createStore } from 'redux'
	import { Provider, useSelector, useDispatch } from 'react-redux';


## Walkthrough

1. Create actions, reducers
	
'''

	const actionAdd = (no) => {
		return {
			type: 'ADD',
			payload: no
		}
	}

	const reducerOperations = (state = {result: 0}, action) => {
		swith (action.type) {
			'ADD':
				return {
					...state,
					result+action.payload
				}
			default:
				return state
		}
	}

'''

	
2. Initialize the store (global state)

'''

	const store = createStore(
		reducerOperations
		//to use REDUX DEVTOOLS
    	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)

'''
		
3. Use the store inside the components

### use useDispatch and useSelector from react-redux
Modifications on the state will determine rerendering on every component

'''
	
	import {useDispatch, useSelector} from "react-redux";
	import {actionAdd} from "path"

	function Counter() {
		const result = useSelector(state=>state.result);
		const dispatch = useDispatch();
		return (
				<div>
					<button onClick={ ()=>dispatch(actionAdd(2)) }>Add 2</button>
					<h1>Result: {result}</h1>
				</div>
			)
	}
'''

### use connect and mapStateToProps/mapDispatchToProps from react-redux
More complicated. Not sure what is the difference between the two methods.

'''

	import {connect} from "react-redux";
	import {actionAdd} from "path"

	function Counter({result, add}) {
		return (
				<div>
					<button onClick={ add(2) }>Add 2</button>
					<h1>Result: {result}</h1>
				</div>
			)
	}

	const mapStateToProps = (state) => {
		return {
			result: state.result
		}
	}

	const mapDispatchToProps = {
		add: (n) => actionAdd(n),
	}

	const highCounter = connect(mapStateToProps, mapDispatchToProps)(Counter)

'''
		

4. Encapsulate the React App inside the react-redux Provider

'''
	
	import {Provider} from 'react-redux'
	import {store} from "location"
	
	import {Counter} from "location" */ var 1
	import {highCounter} from "location" */ var 2

	function App() {
		return (
				<Provider store={store}>
					<Counter />
					<highCounter />
				</Provider>
			)
	}

'''

	
	