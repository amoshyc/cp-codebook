# Mint

```rust
#[derive(Debug, Copy, Clone)]
struct Mint(u64);

impl Mint {
    const MOD: u64 = 998_244_353;
    fn inv(&self) -> Mint {
        let mut a = self.0 as i64;
        let mut b = Mint::MOD as i64;
        let mut p = 1 as i64;
        let mut q = 0 as i64;
        while b != 0 {
            let (c, r) = (a / b, a % b);
            a = b;
            b = r;
            let tmp = p - c * q;
            p = q;
            q = tmp;
        }
        Mint(p.rem_euclid(Mint::MOD as i64) as u64)
    }
    fn pow(&self, mut b: u64) -> Mint {
        let mut base = *self;
        let mut res = Mint(1);
        while b != 0 {
            if b & 1 == 1 {
                res = res * base;
            }
            base = base * base;
            b >>= 1;
        }
        res
    }
}
impl Default for Mint {
    fn default() -> Self {
        Self(0)
    }
}
impl std::ops::Add for Mint {
    type Output = Mint;
    fn add(self, rhs: Mint) -> Mint {
        Mint((self.0 + rhs.0) % Mint::MOD)
    }
}
impl std::ops::Sub for Mint {
    type Output = Mint;
    fn sub(self, rhs: Mint) -> Mint {
        Mint((self.0 + Mint::MOD - rhs.0) % Mint::MOD)
    }
}
impl std::ops::Mul for Mint {
    type Output = Mint;
    fn mul(self, rhs: Mint) -> Mint {
        Mint(self.0 * rhs.0 % Mint::MOD)
    }
}
impl std::ops::Div for Mint {
    type Output = Mint;
    fn div(self, rhs: Mint) -> Mint {
        self * rhs.inv()
    }
}
impl std::ops::AddAssign for Mint {
    fn add_assign(&mut self, rhs: Self) {
        *self = Mint((self.0 + rhs.0) % Mint::MOD);
    }
}
impl std::ops::SubAssign for Mint {
    fn sub_assign(&mut self, rhs: Self) {
        *self = Mint((self.0 + Mint::MOD - rhs.0) % Mint::MOD);
    }
}
impl std::ops::MulAssign for Mint {
    fn mul_assign(&mut self, rhs: Self) {
        *self = Mint((self.0 * rhs.0) % Mint::MOD);
    }
}
impl std::ops::DivAssign for Mint {
    fn div_assign(&mut self, rhs: Self) {
        *self = *self * rhs.inv();
    }
}
impl std::fmt::Display for Mint {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}
```

[https://atcoder.jp/contests/abc265/submissions/37053848](https://atcoder.jp/contests/abc265/submissions/37053848)