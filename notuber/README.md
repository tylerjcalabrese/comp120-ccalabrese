# The Ride-Hailing Service, part 1
by CR Calabrese, June - 16 - 2021
Comp 120: Web Programming with Prof. Ming Chow

## Parts Implemented
I've put a map on my webpage, centered it on South Station, and placed the
car markers on it.

## Collaborators
None

## Time Spent
About an hour and a half

## Optimization results
### Pre-optimization performance:
Total Requests:     67
Total Transfer:     1.1 MB
Total Resources:    1.7 MB
Total Time:         2.25s
Load Time:          1.39s
DOM Content Loaded: 396ms

style.css size:  437B
style.css time:  37ms

index.html size: 771B
index.html time: 35ms

index.js size:   1.6 kB
index.js time:   37ms

### Post-optimization performance:
Total Requests:     63
Total Transfer:     934 kB
Total Resources:    1.5 MB
Total Time:         2.35s
Load Time:          1.53s
DOM Content Loaded: 379ms

style-mini.css size:  243 B
style-mini.css time:  21 ms

index.html size: 781B
index.html time: 11ms

index-mini.js size:   1.1 kB
index-mini.js time:   25ms

### My thoughts on the optimization
I'm not sure why certain things went up, like the total time and
loading time. Certain things are really predictable, though, like
the size changes for the three files. `index.html` got exactly 10
bytes bigger because I appended 5 characters ("-mini") onto each of the
JS and CSS filenames. The JS and CSS files got significantly smaller
from being minified.

The JS and CSS loading times went down significantly, too, which is
what I thought would happen. I'm not so sure why the `index.html`
loading time went down, or why it went down so much, considering I
cleared my cache before checking the performance the second time.
Perhaps this has to do with moving the JS includes to the bottom
of the document and the CSS include to the top.


