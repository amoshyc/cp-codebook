# Greedy

## Matching with 0..1 or 1..0 distribution

* Matching items with boxes. 
* Maximize the total matched values.
* 0/1 indicates matching feasibility.

```rust
//             Sorted Boxes
//               A B C D
// item 0 (v0):      1 1
// item 1 (v1):    1 1 1
// item 2 (v2):        1
// item 3 (v3):  1 1 1 1
// Each row (item) is a 0...1 distribution.
fn greedy_packing_01(mut items: Vec<(i64, i64)>, boxes: Vec<i64>) -> i64 {
    let mut boxes = BTreeSet::from_iter((0..boxes.len()).map(|i| (boxes[i], i)));
    items.sort_by_key(|&(w, v)| (Reverse(v), w));
    let mut ans = 0;
    for &(w, v) in &items {
        if let Some(&(b, i)) = boxes.range((w, 0)..).next() {
            boxes.remove(&(b, i));
            ans += v;
        }
    }
    ans
}
```

```rust
//             Sorted Boxes
//               A B C D
// item 0 (v0):  1
// item 1 (v1):  1 1 1
// item 2 (v2):  1 1 1 1
// item 3 (v3):  1 1
// Each row (item) is a 1...0 distribution.
fn greedy_packing_10(mut items: Vec<(i64, i64)>, boxes: Vec<i64>) -> i64 {
    let mut boxes = BTreeSet::from_iter((0..boxes.len()).map(|i| (boxes[i], i)));
    items.sort_by_key(|&(w, v)| (std::cmp::Reverse(v), w));
    let mut ans = 0;
    for &(w, v) in &items {
        if let Some(&(b, i)) = boxes.range(..=(w, !0)).last() {
            boxes.remove(&(b, i));
            ans += v;
        }
    }
    ans
}
```

> Given `N` items with weight `W[i]` and value `V[i]`, and `M` boxes with size `X[i]`, each box can contain at most 1 item that `w < x (or w >= x)`. What is the maximum total value that can be put in the boxes? (`N < 1e5, M < 1e5`)

Assume we've already found the maximum value achievable by packing items `0..i` into the `M` available boxes. What's the optimal solution for packing items `0..=i` into `M` boxes? With the addition of item `i`, the optimal solution comes from two scenarios

1. There's an empty box: Place item `i` into an empty box that can accommodate it. If there are multiple such boxes, choose the one with the smallest capacity.
2. There are no empty boxes: Check if, among all boxes that could accommodate item `i`, there's an item `j` already packed whose value `V[j]` is less than `V[i]`. If so, we replace item `j` with item `i`.

Scenario 2 is tricky to implement directly. However, it only occurs when `V[j] < V[i]`. This observation leads to a crucial optimization: if we pre-sort the items by their value in descending order, we no longer need to consider scenario 2. This is because when we are processing item `i`, all items already packed in boxes will have a value greater than or equal to item `i`'s value. In such a case, there's no reason to remove a higher-value item to make space for a lower-value item `i`.

* [ABC195D](https://atcoder.jp/contests/abc195/submissions/68199969)
* [ABC137D](https://atcoder.jp/contests/abc137/submissions/68200006)
* [ABC308F](https://atcoder.jp/contests/abc308/submissions/68200041)


## Matching with Segments

* Each item's feasiblity is a range.
* The ranges are usually in a large space (> 10^9).
* Maximize the matching number.

Using sweep line from left to right, at each point, we choose a segment with minimum `r` from valid segments. Valid segments are maintained in a `BTreeSet`.
Note that the space is usually large, be careful about how `t` is updated.

```rust
//            Boxes
//          0 1 2 3 4
// item 0:    o---o
// item 1:  o-----o
// item 2:      o-o
// item 3:      o---o
fn greedy_matching_segs(mut segs: Vec<(i64, i64)>) -> usize {
    segs.sort();
    let ls = BTreeSet::from_iter(segs.iter().map(|s| s.0));
    let mut rs = BTreeSet::new();
    let mut t = 0; // sweep line
    let mut i = 0; // segs index
    let mut ans = 0;
    loop {
        // Insert new valid segments to rs
        while i < segs.len() && segs[i].0 <= t {
            rs.insert((segs[i].1, i));
            i += 1;
        }
        // Remove invalid segments from rs
        while let Some(&(r, j)) = rs.first() {
            if r < t {
                rs.remove(&(r, j));
            } else {
                break;
            }
        }
        // Try to pick 1 segment
        if let Some(&(r, j)) = rs.first() {
            // Successfully picked, t += 1
            rs.remove(&(r, j));
            ans += 1;
            t += 1;
        } else {
            // Failed, jump to next possible time
            if let Some(&l) = ls.range(t + 1..).next() {
                t = l;
            } else {
                break;
            }
        }
    }
    ans
}
```

* [ABC214E](https://atcoder.jp/contests/abc214/submissions/68201205)
* [ABC325D](https://atcoder.jp/contests/abc325/submissions/68201188)