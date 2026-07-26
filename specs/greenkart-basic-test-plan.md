# GreenKart Basic Test Plan

## Application Overview

Basic functional test plan for the GreenKart grocery shopping site, covering product discovery, cart operations, and checkout flow.

## Test Scenarios

### 1. Core shopping flow

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify landing page and product listing

**File:** `tests/greenkart/landing-page.spec.ts`

**Steps:**
  1. Open the GreenKart homepage
    - expect: The page loads successfully and the title shows GreenKart - veg and fruits kart.
  2. Verify the main header and navigation elements
    - expect: The GREENKART branding, search box, cart icon, and product tiles are visible.
  3. Check that product cards are displayed with price and ADD TO CART controls
    - expect: Multiple products are visible, each with a price and an add-to-cart action.

#### 1.2. Search and add a product to cart

**File:** `tests/greenkart/search-and-cart.spec.ts`

**Steps:**
  1. Use the search box to search for a known product name
    - expect: Relevant product results are shown or the page updates accordingly.
  2. Increase the quantity and click ADD TO CART
    - expect: The selected product is added to the cart and the cart count updates.
  3. Open the cart view
    - expect: The added product appears in the cart with the correct quantity and price summary.

#### 1.3. Remove an item from the cart

**File:** `tests/greenkart/cart-removal.spec.ts`

**Steps:**
  1. Add one product to the cart
    - expect: The product appears in the cart.
  2. Remove the product from the cart
    - expect: The cart updates and shows the empty-cart state when no items remain.

#### 1.4. Proceed through checkout

**File:** `tests/greenkart/checkout.spec.ts`

**Steps:**
  1. Add one or more products to the cart
    - expect: The cart contains the expected items and totals.
  2. Click PROCEED TO CHECKOUT
    - expect: The checkout flow is initiated and the user is taken to the next step in the purchase process.
  3. Verify checkout-related elements are shown
    - expect: The checkout screen displays order details and required actions for completion.
