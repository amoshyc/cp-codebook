# 2D Poset

> Given `N (N < 2e5)` points on a plane, how many pair `(i, j)` satisfies `X[i] < X[j]` and `Y[i] > Y[j]`.

For each point `(X[i], Y[i])`, find how many other points is at its upper-left.

1. Prepare a BIT to store the number points at each `Y` coordinates.
2. Inspect all the points from left to right. 
3. For point `(X[i], Y[i])`:
    - Query the BIT to find how many previous points is at its upper-left.
    - Add `Y[i]` to the BIT.

![](../assets/2d-poset-diagram.png =x300)

May need to do coordinate compression in prior. Be aware the points may be repeated.

<https://atcoder.jp/contests/abc231/submissions/43081686>