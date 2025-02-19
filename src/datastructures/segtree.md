# SegTree

Supports only single point update. Since we cannot update an interval, we support only "assignment", no "increment".

```rust
struct Node;
impl SegTrait for Node {
    type S = usize;
    fn default() -> Self::S {
        0
    }
    fn op(a: Self::S, b: Self::S) -> Self::S {
        a + b
    }
}

trait SegTrait {
    type S: Clone + std::fmt::Debug;
    fn default() -> Self::S;
    fn op(a: Self::S, b: Self::S) -> Self::S;
}

struct SegTree<T: SegTrait> {
    nn: usize,
    data: Vec<T::S>,
}

impl<T: SegTrait> SegTree<T> {
    fn new(n: usize) -> Self {
        let nn = n.next_power_of_two();
        let data = vec![T::default(); 2 * nn];
        Self { nn, data }
    }

    fn from_vec(arr: &Vec<T::S>) -> Self {
        let n = arr.len();
        let nn = n.next_power_of_two();
        let mut data = vec![T::default(); 2 * nn];
        data[(nn - 1)..(nn - 1 + n)].clone_from_slice(arr);
        for u in (0..(nn - 1)).rev() {
            data[u] = T::op(data[2 * u + 1].clone(), data[2 * u + 2].clone());
        }
        Self { nn, data }
    }

    fn get(&mut self, a: usize, b: usize, u: usize, l: usize, r: usize) -> T::S {
        if l >= b || r <= a {
            return T::default();
        }
        if l >= a && r <= b {
            return self.data[u].clone();
        }
        let m = (l + r) / 2;
        T::op(
            self.get(a, b, 2 * u + 1, l, m),
            self.get(a, b, 2 * u + 2, m, r),
        )
    }

    fn set(&mut self, i: usize, x: T::S, u: usize, l: usize, r: usize) {
        if l >= i + 1 || r <= i {
            return;
        }
        if l >= i && r <= i + 1 {
            self.data[u] = x;
            return;
        }
        let (m, lch, rch) = ((l + r) / 2, 2 * u + 1, 2 * u + 2);
        self.set(i, x.clone(), lch, l, m);
        self.set(i, x.clone(), rch, m, r);
        self.data[u] = T::op(self.data[lch].clone(), self.data[rch].clone());
    }

    // 0 0 0 1 1 1
    //       ^
    fn first_of<P: Fn(T::S, T::S, T::S) -> bool>(
        &self,
        ok: &P,
        pref: T::S,
        suff: T::S,
        u: usize,
        l: usize,
        r: usize,
    ) -> Option<usize> {
        if !ok(
            self.data[u].clone(),
            T::op(pref.clone(), self.data[u].clone()),
            T::op(self.data[u].clone(), suff.clone()),
        ) {
            return None;
        }
        if r - l == 1 {
            return Some(l);
        }
        let (m, lch, rch) = ((l + r) / 2, 2 * u + 1, 2 * u + 2);
        let new_suff = T::op(self.data[rch].clone(), suff.clone());
        if let Some(i) = self.first_of(ok, pref.clone(), new_suff, lch, l, m) {
            return Some(i);
        }
        let new_pref = T::op(pref.clone(), self.data[lch].clone());
        if let Some(i) = self.first_of(ok, new_pref, suff.clone(), rch, m, r) {
            return Some(i);
        }
        None
    }

    fn show(&self, u: usize, dep: usize) {
        if u >= 2 * self.nn - 1 {
            return;
        }
        println!("{}{:?}", " ".repeat(dep * 2), self.data[u]);
        self.show(2 * u + 1, dep + 1);
        self.show(2 * u + 2, dep + 1);
    }
}
```

- [ABC283F](https://atcoder.jp/contests/abc283/submissions/46191119)
- [ABC382F](https://atcoder.jp/contests/abc392/submissions/62925585): `first_of`

