# Infinite Scroller in ReactJS

Hints:
1. useLayoutEffect for having smooth animation when adding new data to page
2. debouncer function to handle the scrolling (reading the window height, scroll and max height is expensive)
3. use function to modify previous state (ex: setNextPage(prevPage => prevPage+1))