# Greedy


## ABC195D - Shipping Center

> 給定 N 個行李，每個行李重 W[i]，價值 V[i]。有 M 個箱子，每個箱子只能裝一個重量 <= X[i] 的行李，請問能裝進箱子的行李總價值，最多是多少？（N < 1e5, M < 1e5）

### 解法 1

假設我們已經求出「將行李 0..i 裝進 M 個箱子所能達到的最大價值」，那「將行李 0..=i 裝進 M 個箱子」的最優解會是什麼呢？多了行李 i，最優解來自於以下兩種情況：

1. 有空箱，將行李 i 放進某個可以放行李 i 的空箱中，若有多個箱子，選 X 最小的。
2. 沒有空箱，看看是否在所有可以放行李 i 的箱子中，存在某個行李 j 的價值比 V[i] 小，那我們將之換成行李 i。

情況 2 不好實作，且只發生在 V[j] < V[i] 的情況下，所以我們可以事先將行李按價值由大排到小，就不用考慮情況 2，因為在處理行李 i 時，已裝箱的行李的價值都比行李 i 高，沒理由去拿掉他們。

```rust
luggage.sort_by_key(|&(w, v)| (Reverse(v), w));
let mut boxes = BTreeSet::from(boxes.iter());
for &(w, v) in luggage.iter() {
    if let Some((x, box_id)) = boxes.range((w, 0)..).next() {
        boxes.remove(&(x, box_id));
        ans += v;
    }
}
```

時間：O(NlgN + NlogM)
空間：O(M)

### 解法 2

假設我們已經求出「箱子 0..i 所能裝的最大價值總和」，讓我們想想「箱子 0..=i」的情形，多了一個空箱子 i，新的最優解可能來自這兩種情況：

1. 箱子 i 比之前所有箱子都大，那最優解發生在將某個未裝箱、價值最大的行李放進箱子 i。
2. 箱子 i 比之前某個箱子 j 小，那我們可以重排行李，讓行李盡量往小的箱子放，最後再在將某個未裝箱、價值最大的行李放進空出來的箱子中。

情況 2 不好實作，且僅發生在 X[i] < X[j] 的情形下，所以如果我們事先將箱子由小排到大，那只需考慮情形 1。

```rust
boxes.sort();
let mut unpacked = BTree::from(balls.iter());
for &x in boxes.iter() {
    if let Some((w, v)) = unpacked.range(..=(x, inf)).next() {
        unpacked.remove(&(w, v));
        ans += v;
    }
}
```

時間：O(MlgM + MlgN)
空間：O(N)

## ABC214E - Packing Under Range Regulations

> 有 10^9 個箱子與 N 顆球，第 i 顆球只能放進 L[i]..=R[i] 這些箱子中，每個箱子只能放一顆球，問能不能把這 N 顆球都放進箱子？（N < 2e5, L[i] <= R[i] < 1e9）

這題與 ABC195D 差不多，可以視為每個箱子的 X 都是 1，球即為重量與價值都是 1 的行李，但這題的箱子數非常大。

解法 1 會爆空間，救不了。解法 2 我們首先不需要排序了，因為箱子的 X 是相同的。難點在於迭代箱子部份的 O(M)，不過我們可以發現最多就只有 N 的箱子能裝到球，所以我們不需要一個一個迭代箱子，可以從 `unpacked` 中找下一個可能的箱子。

## ABC308F - Vouchers

> 給定 M 個 coupons，(L[i], D[i]) 代表一件商品價格 L[i] 或以上時可以扣除 D[i] 元。給定 N 個要買的商品的價格 P[i]，每個商品最多只能使用一個 coupon，請問最少的花費總和是？（N < 2e5, M < 2e5, P < 1e9, 1 < D < L < 1e9）

假設我們已求出「只使用 coupon 0..i 所花費的最小價格」，那「使用 coupon 0..=i 所花費的最小價格」，即多了 coupon i 的最優解發生在：

1. coupon i 是用在某個還沒折抵商品上，顯然我們要選可以使用 coupon i，且價格最大的商品上。
2. coupon i 是用在某個已經使用 coupon 的商品上：coupon i 可以取代某個 coupon j，讓 coupon j 去用在某個未折抵的商品上。這僅發生在 D[i] < D[j]。

同樣，我們可以事先將 coupon 按 discount 由大到小排序來避免情況 2。

如果我們已求出「只購買商品 0..i 所花費的最小價格」，那「購買商品 0..=i 的花費」，即多了商品 i 的最優解發生在：

1. 存在還沒使用的 coupon，將之用在商品 i 上。
2. 不存在還沒使用的 coupon，那我們看看有沒有某個 coupon c 可以從用在商品 j 上改成用到商品 i 上，這僅發生在 V[i] >= L[c], V[j] >= L[c], P[i] > P[j]。

所以我們將商品按價格由小到大排序來避免情況 2。因為當處理到商品 i 時，有折抵到的商品的價格都比商品 i 高，不需要將他們的 coupon 拿過來給商品 i 用。

## ABC325D - Printing Machine