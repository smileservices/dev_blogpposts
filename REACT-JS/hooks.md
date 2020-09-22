# ReactJS Hooks

https://www.digitalocean.com/community/tutorials/getting-started-with-react-hooks
https://kentcdodds.com/blog/useeffect-vs-uselayouteffect

## useEffect
If you don't need to interact with the DOM at all or your DOM changes are unobservable (seriously, most of the time you should use this).

```
import React, {useState, useEffect} from "react"
```

// only run on mount. pass an empty array
```
useEffect(() => {
  // only runs once
}, []);
```

// only run if count changes
```
useEffect(
  () => {
    // run here if count changes
  }, [count]);
```

// To run something before a component unmounts, we have to return a function from useEffect():
```
useEffect(() => {
  UsersAPI.subscribeToUserLikes();

  // unsubscribe
  return () => {
    UsersAPI.unsubscribeFromUserLikes();
  };
});
```

// to run something before and after, only once
```
useEffect(()=>{
	//do before

	return ()=>{
		//do after
	}
}, []);
```

## IMPORTANT:

changing the state based on the state's previous value by supplying a function to the setState function:
```
const [state, setState] = useState(0);

useEffect(()=>{
    setState( prevState => prevState+1 )
  }, [])
```

## useLayoutEffect
If you need to mutate the DOM and/or DO need to perform measurements