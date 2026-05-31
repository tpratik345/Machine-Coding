# React Virtualization Without Third-Party Libraries

## Overall Flow

```text
UsersList
    |
    |-- fetches data from API
    |
    V
VirtualScroll
    |
    |-- tracks scroll position
    |
    V
useVirtualScroll
    |
    |-- calculates visible rows
    |-- returns only rows that should render
```

Instead of rendering **50,000 rows**, we only render **10-20 rows currently visible on screen**.

---

# 1. API Layer

## Responsibility

The API layer should only be responsible for fetching data.

### userService.js

```jsx
export const fetchUsers = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  return response.json();
};
```

## Why separate API logic?

Bad:

```jsx
useEffect(() => {
  fetch("url")
    .then(...)
}, []);
```

inside every component.

Good:

```jsx
fetchUsers();
```

Benefits:

- Reusable
- Testable
- Easy to replace API endpoint
- Follows Separation of Concerns

## Data Flow

```text
UsersList
    |
    | calls
    V
fetchUsers()
    |
    | API request
    V
JSONPlaceholder
```

---

# 2. Feature Component (UsersList)

This is the business component.

Its responsibility is:

- Fetch data
- Manage loading state
- Pass data to VirtualScroll

NOT:

- Virtualization calculations
- Scroll calculations

## Step 1: State

```jsx
const [users, setUsers] = useState([]);
```

Stores all fetched users.

## Step 2: Fetch Data

```jsx
useEffect(() => {
  loadUsers();
}, []);
```

Runs once on mount.

```jsx
const loadUsers = async () => {
  const apiUsers = await fetchUsers();

  setUsers(apiUsers);
};
```

## Step 3: Pass Data to VirtualScroll

```jsx
<VirtualScroll
  data={users}
  itemHeight={60}
  containerHeight={600}
  renderItem={renderUser}
/>
```

### What is renderItem?

Instead of hardcoding UI inside VirtualScroll:

Bad:

```jsx
<div>{user.name}</div>
```

we pass rendering responsibility.

```jsx
renderItem={(user) => (
  <div>{user.name}</div>
)}
```

This makes VirtualScroll reusable.

---

# 3. VirtualScroll Component

This component handles:

- Scroll events
- Hook invocation
- Rendering visible rows

## Props

```jsx
const VirtualScroll = ({
  data,
  itemHeight,
  containerHeight,
  overscan,
  renderItem
})
```

### Example

```text
data = 50000 users
itemHeight = 60
containerHeight = 600
```

Visible rows:

```text
600 / 60 = 10 rows
```

Only 10 rows fit inside viewport.

## Scroll State

```jsx
const [scrollTop, setScrollTop] = useState(0);
```

Stores current scroll position.

Example:

```text
scrollTop = 1800
```

## Scroll Handler

```jsx
const handleScroll = (e) => {
  setScrollTop(e.target.scrollTop);
};
```

Every scroll updates position.

## Hook Call

```jsx
const {
  startIndex,
  visibleItems,
  totalHeight,
} = useVirtualScroll(...)
```

VirtualScroll delegates all calculations.

## Outer Container

```jsx
<div
  style={{
    height: containerHeight,
    overflowY: "auto"
  }}
>
```

Creates scrolling area.

## Total Height Container

```jsx
<div
  style={{
    height: totalHeight
  }}
>
```

Suppose:

```text
50000 rows
60px height
```

Total height:

```text
50000 × 60 = 3,000,000px
```

This creates scrollbar for all rows.

Even though only 15–20 rows exist in DOM.

## Render Visible Rows

```jsx
visibleItems.map(...)
```

Only currently visible rows render.

## Absolute Positioning

```jsx
top: actualIndex * itemHeight
```

Example:

```text
Row 200
200 × 60 = 12000px
```

Browser places it correctly.

---

# 4. useVirtualScroll Hook

This is where the actual virtualization happens.

## Inputs

```jsx
{
 items,
 itemHeight,
 containerHeight,
 scrollTop,
 overscan
}
```

Example:

```text
items.length = 50000
itemHeight = 60
containerHeight = 600
scrollTop = 1800
```

## Step 1: Calculate Start Index

```jsx
Math.floor(scrollTop / itemHeight)
```

Example:

```text
1800 / 60 = 30
```

Meaning:

```text
Rows 0-29 are above viewport.
Visible starts from Row 30.
```

### Overscan

Instead of rendering:

```text
30-40
```

we render:

```text
25-45
```

Extra rows prevent flickering during fast scrolling.

Calculation:

```jsx
const startIndex =
  Math.floor(scrollTop / itemHeight)
  - overscan;
```

Example:

```text
30 - 5 = 25
```

## Step 2: Visible Count

```jsx
containerHeight / itemHeight
```

Example:

```text
600 / 60 = 10 rows
```

```jsx
const visibleCount =
  10 + overscan * 2;
```

Example:

```text
10 + 10 = 20
```

## Step 3: End Index

```jsx
startIndex + visibleCount
```

Example:

```text
25 + 20 = 45
```

Visible rows:

```text
25 - 45
```

Only 20 rows.

## Step 4: Slice Data

```jsx
items.slice(startIndex, endIndex)
```

Instead of:

```text
50000 rows
```

we get:

```text
20 rows
```

Huge optimization.

## Step 5: Total Height

```jsx
items.length * itemHeight
```

Example:

```text
50000 * 60 = 3,000,000px
```

Scrollbar still behaves as if all rows exist.

---

# Example Scroll Walkthrough

Assume:

```text
itemHeight = 50
containerHeight = 500
overscan = 5
```

Visible rows:

```text
500 / 50 = 10
```

User scrolls:

```text
scrollTop = 2500
```

Start index:

```text
2500 / 50 = 50
```

Overscan:

```text
50 - 5 = 45
```

Visible count:

```text
10 + 10 = 20
```

End index:

```text
45 + 20 = 65
```

Rendered rows:

```text
45
46
47
...
65
```

Only 20 DOM elements are rendered.

---

# Why This Is Fast

Without virtualization:

```text
50,000 divs
50,000 layouts
50,000 paints
```

Browser becomes slow.

With virtualization:

```text
~20 divs
~20 layouts
~20 paints
```

Memory and rendering cost become nearly constant.

---

# Interview Summary

The `UsersList` component handles business logic and data fetching. The API layer encapsulates network requests. The `VirtualScroll` component manages scrolling and rendering, while the `useVirtualScroll` hook contains the virtualization algorithm.

The hook calculates visible indexes based on `scrollTop`, `itemHeight`, and viewport height, returning only the rows that need to be rendered. Absolute positioning and a large placeholder container preserve normal scrollbar behavior while keeping the DOM size extremely small, allowing smooth rendering even for datasets containing tens of thousands of records.
