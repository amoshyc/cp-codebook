# 2D Poset

## The Length of The Longest Chain 

> Given `N` points on 2D plane, what is the length of the longest chain such that `x[i] < x[j]` and `y[i] < y[j]`? [ABC439E](https://atcoder.jp/contests/abc439/submissions/72221181), [ABC369F](https://atcoder.jp/contests/abc369/submissions/58176075)

We want to find the lenght lonegst chain from bottom left to top right. 
The problem can be converted to [LIS](../algorithms/longest_increasing_subsequence.md):

```rust
// (i < j) = (x[i] < x[j] && y[i] < y[j])
xy.sort_by_key(|&(x, y)| (x, Reverse(y)));
let ys = xs.iter().map(|&(x, y)| y).collect();
let dp = longest_increasing_subsequence(&bs, !0);
let ans = dp.iter().max.unwrap();
```

---

From the geometry viewpoint, we are inspecting these 2D points from left to right while finding the chains that are increasing in the y-axis, that is, the longest increasing subsequence of the `y`. 

The problem ask for `<` instead of `<=`, so we choose only one point when there are multiple points in the same vertical line. The easiest way to do it is to inspect those points from top to bottom. This leads to the `(x, Reverse(y))` in the aforementioned code.

---

Left: The longest chain of `x[i] < x[j]` and `y[i] < y[j]`. 
Right: The longest chain of `x[i] <= x[j]` and `y[i] <= y[j]`.
Note the order we inspect the points is labeled as alphabet. 
Left is sorted by `(x, Reverse(y))` while right is by `(x, y)`.

<img src="../assets/2d_poset_1.png" width="350"/>
&nbsp; 
<img src="../assets/2d_poset_2.png" width="350"/>

Sometimes the problem is not straightforward. [ABC439E](https://atcoder.jp/contests/abc439/submissions/72221181) asks the maximum number of line segments that are not overlapping with each other.

## Number of Pairs

> Given `N (N < 2e5)` points on a plane, how many pair `(i, j)` satisfies `X[i] < X[j]` and `Y[i] > Y[j]`.

For each point `(X[i], Y[i])`, find how many other points is at its upper-left.

1. Prepare a BIT to store the number points at each `Y` coordinates.
2. Inspect all the points from left to right. 
3. For point `(X[i], Y[i])`:
    - Query the BIT to find how many previous points is at its upper-left.
    - Add `Y[i]` to the BIT.


May need to do coordinate compression in prior. Be aware the points may be repeated.

[ABC231F](https://atcoder.jp/contests/abc231/submissions/43081686)

