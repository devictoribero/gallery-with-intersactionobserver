Project created to know how to use the IntersectionObserver.

Basically, this API receives 2 parameters.

`const observer = new IntersectionObserver(callback, options)`

The callback is a function which will be called when the conditions are assertive. On the other hand, options is a configuration object which will be used to determine if the nodes, objects or whatever are intersected or not.

# Options
The options object has 3 parameters.

```javascript
const configuration = {
  root: The container where we want to apply to observe,
  rootMargin: Margin around the root.,
  threshhold: Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed
}
```

# Callback
Is a function which receives 2 parameters. The entries of the observer and the observer.
```javascript
function Callback(entries, observer) {
  // ...
}
```

# Usage
Personally, I've only used the `IntersectionObserver` to lazy-load images but, it can be used as well for a `videoplayer` control, such as pause the autoplay when leaving the viewport, saving things on `sessionStorage` or track information about the user behaviour

