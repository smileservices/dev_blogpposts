## Efficiency gotchas

faster for loops than "for n in range(0,10000)" 
```
import itertools

for _ in itertools.repeat(None, 10000):
    do_something()
```
range in python3 is still a generator
but itertools.repeat(None, n) is 2x faster than range...


