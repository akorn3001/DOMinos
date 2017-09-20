# DOMinos

DOMinos is a lightweight JavaScript library modeled after jQuery, allowing for straightforward DOM manipulation and traversal. The library lets the user easily select elements from the DOM, create and remove elements, as well as send AJAX requests.

### How to Use the DOMinos Library
To use DOMinos in your project, download this library and copy it into the root of your project. You will then need to import the `DOMinos.js` file inside `<script>` tags in the `head` of your HTML file like so:

```javascript
<head>
  ...
  <script type="text/javascript" src="DOMinos.js"></script>
  ...
</head>
```

If your HTML file is not in the same directory as `DOMinos.js` you will have to make sure you have the correct path pointing to `DOMinos.js` in your `script` tag. For example:
```javascript
...src="./lib/DOMinos.js"</script>
```

## $dom
The core function of DOMinos which makes everything possible is the ever-flexible `$dom()`. Given different kinds of input, `$dom()` will respond accordingly:
- If given a string representing a CSS selector, a class, or an id, the function will return a `DOMNodeCollection` object with an array of `NodeList` items corresponding to all elements matching the given selector.
```javascript
$dom('ul') // => DOMNodeCollection {nodes: NodeList(3)}
$dom('.class-name') // => DOMNodeCollection {nodes: NodeList(2)}
$dom('#id-name') // => DOMNodeCollection {nodes: NodeList(1)}
```
- If given a single `HTMLElement` as its argument the element will be put into an array so that it may be wrapped in a `DOMNodeCollection` object.
- If passed in a callback function, the function will be added to a callback queue where it will either be queued or invoked depending on whether the document has loaded.
```javascript
$dom(() => alert('*ALERT*ALERT*')) // Will be queued until the document is loaded, then all queued functions will be invoked.
```

## `DOMNodeCollection`
`DOMNodeCollection` is a wrapper class which takes as its input an array of HTML elements. Passing a selector to the `$dom()` function wraps the selector in a `DOMNodeCollection` object, providing it several useful methods for DOM traversal and manipulation.

### Manipulation Methods:
#### `html(el)`
Used as both a setter and getter method. If passed a string, this will set the `innerHTML` of each node in the array to the passed value. If not passed a value, `html()` will return the `innerHTML` of the first node in the list.


#### `append(el)`
As the name suggests, appends the argument to the `innerHTML` of each node in the `DOMNodeCollection`. The method can take a string as an argument, as well as an HTML element or another `DOMNodeCollection` object.

```javascript
$dom('ul.class').append('<li>List item</li>') // Appends new li element to a ul element with the specified class.
$dom('span').append('New text for spans') // Appends 'New text for spans' to any span element in the DOMNodeCollection.
$nodes.append($otherNodes) // Appends $otherNodes to each element in $nodes.
```

#### `empty()`
Removes the `innerHTML` of the element in the `DOMNodeCollection` by calling `html()` with an argument of an empty string.

#### `attr(attrName, value)`
Uses JavaScript's `setAttribute` to add a new attribute to each node in the `DOMNodeCollection` with the name set to `attrName` and a corresponding value set to the passed `value`.

```javascript
$dom('div').attr('attrName', 'value') // Adds `attrName` attribute with value of 'value' to each div element in the DOMNodeCollection.
```

#### `addClass(className)`
Adds class passed in through `className` to every element in the `DOMNodeCollection`.
```javascript
$dom('li').addClass('incomplete') // Adds 'incomplete' class to every li element in the DOMNodeCollection.
```

#### `removeClass(className)`
Removes class passed in through `className` from every element in the `DOMNodeCollection`.
```javascript
$dom('li').removeClass('incomplete') // Removes 'incomplete' class from every li element in the DOMNodeCollection.
```

#### `toggleClass(className)`
Toggles class of `className` on and off from every element in the `DOMNodeCollection`.

#### `on(action, callback)`
Takes a string as the `action` argument and adds an event listener with that name set to the passed-in callback function.

```javascript
$dom('button').on('click', () => alert('You Clicked')) // Adds click event listener to every button in the DOMNodeCollection to alert that the button was clicked.
```

#### `off(action)`
Takes a string as the `action` argument and removes the event listener matching that name from each element in the `DOMNodeCollection`

```javascript
$dom('button').remove('click') // Removes click event handler from every button in the DOMNodeCollection.
```
### Traversal Methods:
#### `parent()`
Returns a `DOMNodeCollection` with all of the parent elements matching the passed-in element.

```javascript
$dom('li').parent() // Returns a DOMNodeCollection of all the parents of li elements.
```

#### `children()`
Returns a `DOMNodeCollection` with all the direct children elements of the passed-in element.

```javascript
$dom('ul').children() // Returns a DOMNodeCollection of all the direct children of all ul elements.
```

#### `find(selector)`
Returns `DOMNodeCollection` of all descendants matching the passed-in selector.

```javascript
$dom('div').find('.incomplete') // Returns all descendants of all div elements with the matching class of 'incomplete'.
```

#### `remove()`
Goes through each node in the `DOMNodeCollection` and removes each matching node from the parent.
```javascript
$dom('li').remove() // Removes li elements from their parents.
```

## AJAX Requests
The `ajax()` function is defined on `$dom` itself. It has a set of default parameters which you will merge into when you specify your own:

```javascript
$dom.ajax = options => {
  const req = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {}
  };

  ...

}
```

In the JavaScript file of your project in which you define the functions you're going to use, you can specify the paramters of your AJAX request:

```javascript
function fetchGif() {
  $gif = $dom.ajax({
    url: "http://api.giphy.com/v1/gifs/search?q=cats&api_key=dc6zaTOxFJmzC",
    type: "GET",
    success: function(response) {
      let num = Math.floor(Math.random() * 25);
      let url = response.data[num].images.fixed_width.url;
      $dom('#gifs').append(`<li><img src="${url}" /></li>`);
    }
  });
}
```

All that's left to do is to call whatever functions you intend to use at the bottom of your JavaScript file:
```javascript
$dom(() => {
  toggleComplete();
  $dom('form').on('submit', addToDo);
  $dom('#fetch-gif').on('click', fetchGif);
  $dom('#clear-gifs').on('click', clearGifs);
  $dom('#clear-todos').on('click', clearTodos);
});
```
