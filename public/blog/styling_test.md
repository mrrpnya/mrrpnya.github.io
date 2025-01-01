---
title: Styling Test
description: A test post to see how the site styling looks
date: 2024-12-31
tags: ['meta', 'web']
---

## Styling Test

This is a test post to see how the site styling looks. I'm going to try out a few different things to see how they look.

### Headers

# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

### Text

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Lists

#### Unordered

- Item 1
- Item 2
- Item 3
- Item 4
- Item 5

#### Ordered

1. Item 1
2. Item 2
3. Item 3
4. Item 4
5. Item 5

### Links

[Google](https://www.google.com)
[GTA VII](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

### Images

![A cat](https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/272px-Cat_August_2010-4.jpg)

### Code

```python
def hello_world():
    print("Hello, world!")
```

```rust
struct Point {
    x: f64,
    y: f64,
}

impl Point {
    fn new(x: f64, y: f64) -> Point {
        Point { x, y }
    }
}

fn main() {
    let p = Point::new(1.0, 2.0);
    println!("({}, {})", p.x, p.y);
}
```

### Tables

| One | Two | Three |
|-----|-----|-------|
| 1   | 2   | 3     |
| 4   | 5   | 6     |
| 7   | 8   | 9     |

### Blockquotes

> This is a blockquote.
> It can span multiple lines.
> It can also contain **bold** and *italic* text.
> And even links: [Google](https://www.google.com).

### Horizontal Rules

---

### Emphasis

*Italic text*

**Bold text**

***Bold and italic text***

### Footnotes

This is a sentence with a footnote[^1].

[^1]: This is the footnote.

### Math

This is an inline math equation: $e^{i\pi} + 1 = 0$.

This is a block math equation:

$$

\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}

$$

### Checkboxes

- [x] Checked
- [ ] Unchecked

### Videos

<!-- The towwwn inside meeeeee :3 -->

<iframe width="560" height="315" src="https://www.youtube.com/embed/69VV0pH57XE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Audio

<!-- Bach's Prelude and Fugue in A minor -->

<audio controls>
  <source src="https://en.wikipedia.org/wiki/File:BWV_543-prelude.ogg" type="audio/ogg">
  Your browser does not support the audio element.
</audio>

### Tables of Contents

- [Header 1](#header-1)
  - [Header 2](#header-2)
    - [Header 3](#header-3)
      - [Header 4](#header-4)
        - [Header 5](#header-5)
          - [Header 6](#header-6)
    - [Text](#text)
    - [Lists](#lists)
      - [Unordered](#unordered)
      - [Ordered](#ordered)
    - [Links](#links)
    - [Images](#images)
    - [Code](#code)
    - [Tables](#tables)
    - [Blockquotes](#blockquotes)
    - [Horizontal Rules](#horizontal-rules)
    - [Emphasis](#emphasis)
    - [Footnotes](#footnotes)
    - [Math](#math)
    - [Checkboxes](#checkboxes)
    - [Videos](#videos)
    - [Audio](#audio)
    - [Tables of Contents](#tables-of-contents)
    - [Embedded CSS](#embedded-css)
    - [Embedded HTML](#embedded-html)
    - [Embedded SVG](#embedded-svg)
    - [Embedded LaTeX](#embedded-latex)
    - [Interactive Scripting](#interactive-scripting)
    - [Conclusion](#conclusion)

### Embedded CSS

<style>
  markdown-example-red {
    color: red;
  }

  markdown-example-glowing {
    text-shadow: 0 0 5px #ff0000;
  }
</style>

<markdown-example-red>This text is red.</markdown-example-red>

<markdown-example-glowing>This text is glowing.</markdown-example-glowing>

### Embedded HTML

<div style="background-color: lightblue; padding: 10px;">
  This is a div with a light blue background.

    <p>This is a paragraph inside the div.</p>

    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
</div>

### Embedded SVG

<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>

### Embedded LaTeX

$$

\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}

$$

### Interactive Scripting

On click, this button should change color:

<button onclick="this.style.backgroundColor = 'red';">Click me!</button>

On click, this button should run JavaScript and create an alert:

<button onclick="alert('Hello, world!');">Click me!</button>

And this one uses a `<script>` tag to do the same thing:

<button id="alert-button">Click me!</button>

<script>
  document.getElementById('alert-button').onclick = function() {
    alert('Hello, world!');
  };
</script>


### Conclusion

This is the end of the test post. I hope everything looks good! 

- TheFelidae