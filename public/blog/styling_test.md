---
title: Styling Test
description: A test post to see how the site styling looks
date: 2025-01-01
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

### Superscript and Subscript

This is a superscript: x<sup>2</sup>.

This is a subscript: H<sub>2</sub>O.

### Marker

This is a highlight: ==highlighted text==.

### Math

This is an inline math equation: $e^{i\pi} + 1 = 0$.

This is a block math equation:

$$

\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}

$$

### Checkboxes

- [x] Checked
- [ ] Unchecked

### Alerts

> [!warning]
> This is a warning alert.

> [!info]
> This is an info alert.

> [!danger]
> This is a danger alert.

> [!success]
> This is a success alert.

> [!important]
> This is an important alert.

> [!caution]
> This is a caution alert.

> [!note]
> This is a note alert.

> [!tip]
> This is a tip alert.

> [!question]
> This is a question alert.

> [!quote]
> This is a quote alert.

> [!deprecated]
> This is a deprecated alert.

> [!example]
> This is an example alert.

> [!todo]
> This is a todo alert.

> [!done]
> This is a done alert.

### Iframes

<!-- The towwwn inside meeeeee :3 -->

The colorations are supposed to automagically change based on what you're linking to.

YouTube:

<iframe width="560" height="315" src="https://www.youtube.com/embed/69VV0pH57XE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Spotify:

<iframe src="https://open.spotify.com/embed/track/0R4EcD2e5m9wsMmWVVbBOc" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>

Maps:

<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0000000000005!2d-122.0841926846827!3d37.42199997981999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e3f0b0b0f7d%3A0x7d9b1f7f7f7f7f7f!2sGoogleplex!5e0!3m2!1sen!2sus!4v1630483660004!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>

### Audio

Bach's Prelude and Fugue in A minor:

<audio controls>
  <source src="/files/BWV_543-prelude.ogg" type="audio/ogg">
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
    - [Superscript and Subscript](#superscript-and-subscript)
    - [Marker](#marker)
    - [Math](#math)
    - [Checkboxes](#checkboxes)
    - [Alerts](#alerts)
    - [Iframes](#iframes)
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

Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}
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

[^1]: This is the footnote.