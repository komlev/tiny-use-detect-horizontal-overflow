# tiny-use-detect-horizontal-overflow

Small (~1 Kb) react hook for detecting items are 

## Usage

```
npm i tiny-use-detect-horizontal-overflow --save
```

And in your react code

```js
import { useDetectHorizontalOverflow } from "tiny-use-detect-horizontal-overflow";

// ...

useDetectHorizontalOverflow(containerRef, (hiddenElements) => {
  console.log(hiddenElements)
  /*
    It'll print out hidden elements which are overflown by container
    (4) [li#Membeship, li#Register, li#Login, li#Learn]
  */
});
```

## API

Usage:
Let's say you have this JSX component
```jsx
<div className="container" ref={containerRef}>
  <ul className="links_list" ref={listRef}>
    <li>
      <a href="/about">About</a>
    </li>
    {/*...*/}
  </ul>
</div>
```

And in order to use this hook:

```js
useDetectHorizontalOverflow(
  containerRef, // react ref of container
  (entries) => {}, // callback which will be called when number of hidden element is changed
  listRef, // optional react ref for items parent - if items are not direct children of the container
  throttleTimeout // optional timeout throttle timeout for resize callback, default is 16ms
);
```

## License

MIT
