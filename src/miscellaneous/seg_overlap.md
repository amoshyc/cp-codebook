# Segment/Rect/Cube Overlapping

* The overlapping of segment `l1..=r1` and segment `l2..=r2` is `max(l1, l2)..=min(r1, r2)`. 
* Aware that segment may be **degraded**. 
* If care only the width of overlapping, then it is fine to use `min(r1, r2) - max(l1, l2)`.

Cube: <https://atcoder.jp/contests/abc361/submissions/55258977>