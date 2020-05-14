ot# REGEX

```
import re
```

### Important

* re.match - only searches from the start of a string, returns object or None
* re.findall - searches everywhere, returns array
* re.search - searches everywhere, returns object or None

1. Find digit in string
```
re.search(r'(\d+)', 'Posted on: 22 days ago').group(0)
```