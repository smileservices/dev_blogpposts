# Redux

https://medium.com/javascript-in-plain-english/the-only-introduction-to-redux-and-react-redux-youll-ever-need-8ce5da9e53c6

## what to import

only for vanilla

	import { createStore } from 'redux'
	
using react you need react-redux package:

	import { Provider, useSelector, useDispatch } from 'react-redux';



## reducers
a function that receives (state, action) as args. action need to contain a type field
!! Redux requires our action objects to contain a type field
must return the state

action obj can have any other number of fields

	'''
	function reducer(state, action) {
		if (action.type == 'add shit') {
			state.shit += 1;
			console.log(action.field_1)
		}
		return state
	}
	'''

can use the combineReducers function for getting multiple reducers together
	
	'''
		import { combineReducers } from 'redux';
		const reducers = combineReducers({
		  reducer1: reducer1func,
		  reducer2: reducer2func
		});
	'''

## change state
	'''
	let store = createStore(reducer);
	store.dispatch({type: 'add shit', field_1: someval})
	'''
We use store.getState() to get our app state from the store


## change listening (subscribers)
Functions that are called once the state changes
store.subscribe(someFunc)