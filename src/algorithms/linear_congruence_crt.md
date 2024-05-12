# Linear Congruence & Chinese Remainder Theorem

```rust
fn gcd(a: i64, b: i64) -> i64 {
    if b == 0 {
        a
    } else {
        gcd(b, a.rem_euclid(b))
    }
}

fn extgcd(a: i64, b: i64) -> (i64, i64, i64) {
    if b == 0 {
        (1, 0, a) // (x0, y0, g)
    } else {
        let (x1, y1, g) = extgcd(b, a.rem_euclid(b));
        (y1, x1 - y1 * (a / b), g) // (x0, y0, g)
    }
}

fn minv(a: i64, m: i64) -> i64 {
    let (x0, _, _) = extgcd(a, m);
    x0.rem_euclid(m)
}

// ax = b (mod m) has solution
//  x = (a/g)^(-1) * (b/g) (mod m/g)
fn linear_congruence(a: i64, b: i64, m: i64) -> Option<i64> {
    let (inv, _, g) = extgcd(a, m);
    if b % g != 0 {
        None
    } else {
        Some((inv * (b / g)).rem_euclid(m / g))
    }
}

// x = r1 (mod m1)
// x = r2 (mod m2) has solution
// x = m1 q1 + r1 (mod lcm(m1, m2)) where
// q1 = linear_congruence(m1, r2 - r1, m2)
fn crt(coef: &Vec<(i64, i64)>) -> Option<(i64, i64)> {
    let mut m1 = coef[0].0;
    let mut r1 = coef[0].1;
    for i in 1..coef.len() {
        let (m2, r2) = coef[i];
        if let Some((q1, g)) = linear_congruence(m1, r2 - r1, m2) {
            let lcm = m1 / g * m2;
            r1 = (m1 * q1 + r1).rem_euclid(lcm);
            m1 = lcm;
        } else {
            return None;
        }
    }
    Some((m1, r1))
}
```

* <https://atcoder.jp/contests/abc186/submissions/43184083>
* <https://atcoder.jp/contests/abc193/submissions/43191810>


## Linear Congruence

給定 $ax \equiv b \pmod m$ 的 $a, b, m$，求解 $x$。


**如果 $b$ 不是 $g = gcd(a, m)$ 的倍數，則無解。**

我們證他的反向，即有解時，$b$ 一定是 $g$ 的倍數。
有解代表存在 $x_0$ 使得 $a x_0 \equiv b \pmod m$，即存在整數 $y$ 滿足 $a x_0 + my = b$。
因為 $a$ 與 $m$ 都是 $g$ 的倍數，所以 $b$ 一定是 $g$ 的倍數。

**如果 $b$ 是 $g = gcd(a, m)$ 的倍數，則解為 $x \equiv \left(\frac{a}{g}\right)^{-1} \frac{b}{g} \pmod{\frac{m}{g}}$**

因為 $ax \equiv b \pmod m$ 中，$a, m$ 可能不互質，所以 $a$ 在 $m$ 下的反元素不一定存在，我們將等式兩側除上 $g$ 使得 $a/g$ 與 $m/g$ 互質：

$$
\begin{align}
a &x \equiv b \pmod m \\\\
a &x + my = b \\\\
\frac{a}{g} &x + \frac{m}{g} y = \frac{b}{g} \\\\
\frac{a}{g} &x \equiv \frac{b}{g} \pmod {\frac{m}{g}} \\\\
&x \equiv \left(\frac{a}{g}\right)^{-1} \frac{b}{g} \pmod{\frac{m}{g}}
\end{align}
$$


```rust
fn linear_congruence(a: i64, b: i64, m: i64) -> Option<i64> {
    let g = gcd(a, m);
    if b.rem_euclid(g) != 0 {
        None
    } else {
        Some((minv(a / g, m / g) * (b / g)).rem_euclid(m / g))
    }
}
```

## Extgcd

給定 $ax + by = gcd(a, b)$ 中的 $(a, b)$，extgcd 求出一組解 $(x, y)$，其中 $a, b, x, y$ 都可能是負數。

根據 [Bézout's identity](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_identity)，兩數的 gcd 可以寫成兩數的線性組合。於是 Euclidean algorithm 可以寫成：

$$
\begin{align}
g &= a \cdot x_0 + b \cdot y_0  \tag{1} \\\\
g &= b \cdot x_1 + (a \bmod b) \cdot y_1  \tag{2} \\\\
&\dots \\\\
g &= g \cdot 1 + 0 \cdot 0  \tag{3}
\end{align}
$$

因為式 $(3)$ 中的 $(x, y)$ 是已知的，我們想從式 $(3)$ 倒著推，推出式 $(1)$。假設式 $(2)$ 是已知的，我們可以將之寫成式 $(1)$ 的型式：

$$
\begin{align}
g &= b \cdot x_1 + (a \bmod b) \cdot y_1 \\\\
g &= b \cdot x_1 + (a - \lfloor\frac{a}{b}\rfloor \cdot b) \cdot y_1 \\\\
g &= a y_1 + b \cdot \left( x_1 - y_1 \cdot \lfloor\frac{a}{b}\rfloor \right)
\end{align}
$$

即 

$$
\begin{align}
x_0 &= y_1 \\\\
y_0 &= x_1 - y_1 \cdot \lfloor\frac{a}{b}\rfloor
\end{align}
$$

於是 code 可以寫成：

```rust
fn extgcd(a: i64, b: i64) -> (i64, i64, i64) {
    if b == 0 {
        (1, 0, a) // (x0, y0, g)
    } else {
        let (x1, y1, g) = extgcd(b, a.rem_euclid(b));
        (y1, x1 - y1 * (a / b), g) // (x0, y0, g)
    }
}
```

## Mod Inverse

如果 $a, m$ 互質，則 `extgcd(a, m)` 可以求出 $a$ 在 $\pmod m$ 下的反元素，因為 extgcd 可以求出

$$
\begin{align}
ax + my &= gcd(a, m) = 1 \\\\
ax &= -my + 1 \\\\
ax &\equiv 1 \pmod m
\end{align}
$$

的一組解 $(x_0, y_0)$，我們再將 $x_0$ 移至 $\mod m$ 底下即可。

如果 $a, m$ 不互質，則 `extgcd(a, m)` 求出來的是 $\frac a g$ 在 $\pmod {\frac{m}{g}}$ 下的反元素。

## Reference

* <http://www.mathsgreat.com/article/article_031.pdf>
* <https://cp-algorithms.com/algebra/linear-diophantine-equation.html>