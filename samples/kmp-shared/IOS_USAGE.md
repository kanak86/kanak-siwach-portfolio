# Using the shared module from SwiftUI (sketch)

```swift
import Shared   // exported framework name

let cart = Cart(items: [], promoPercent: 0)
let updated = CartKt.reduce(cart, action: CartActionAdd(sku: "air-runner", unitPriceCents: 12000))
Text(CartKt.formatUsd(cents: updated.totalCents))
```

Android uses the very same `Cart.reduce(...)`, so a pricing rule is written, reviewed and tested exactly once.
