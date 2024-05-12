# 2 Sets

Dynamic K Largest Items using 2 Sets.

```rust
let mut cnt = 0;
let mut larger = std::collection::BTreeeSet::new();
let mut smaller = std::collection::BTreeeSet::new();

for i, new_x in arr.iter().enumerate() {
    smaller.insert(new_x, i);

    // Balance the size, expect larger.len() to be k
    while larger.len() < k && smaller.len() > 0 {
        let (x, id) = smaller.pop_last(); // largest in smaller
        larger.insert((x, id));
        cnt += x;
    }
    while larger.len() > k && larger.len() > 0 {
        let (x, id) = larger.pop_first(); // smallest in largest
        smaller.insert((x, id));
        cnt -= x;
    }

    // Ensure the order by exchanging
    // smallest(larger) should >= largest(smaller)
    while larger.len() > 0 && smaller.len() > 0 {
        let (x1, id1) = *larger.iter().next().unwrap(); // smallest
        let (x2, id2) = *smaller.iter().last().unwrap(); // largest
        if x1 < x2 {
            larger.remove(&(x1, id1));
            larger.insert((x2, id2));
            smaller.remove(&(x2, id2));
            smaller.insert((x1, id1));
            cnt += x2;
            cnt -= x1;
        } else {
            break;
        }
    }
}
```

* <https://atcoder.jp/contests/abc312/submissions/44105261>
* <https://atcoder.jp/contests/abc314/submissions/44556667>
