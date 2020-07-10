![github banner](https://user-images.githubusercontent.com/19797697/87056675-edb55180-c240-11ea-922b-5592902a8abf.png)

<h3 align="center">
  <a href="https://ceo.baemin.dev">https://ceo.baemin.dev</a>
</h3>

<p align="center">
  <a href="https://github.com/woowa-techcamp-2020/market-6/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/woowa-techcamp-2020/market-6?color=12B991" />
  </a>
  <a href="https://github.com/woowa-techcamp-2020/market-6/releases">
    <img src="https://img.shields.io/github/v/release/woowa-techcamp-2020/market-6?include_prereleases&sort=semver&label=version&color=12B991" />
  </a>
</p>

---

## Before getting started

This project implements the **sign up** and **sign in** of [배민상회](https://mart.baemin.com/?gclid=EAIaIQobChMI8ciAjr-86gIVGa6WCh2KbwTwEAAYASAAEgIIY_D_BwE). At first, a registration process seems very easy and simple, but it requires tons of considerations and design. Especially for our frontend developers, understanding the mechanisms behind the jungle makes us being closer to a full-stack developer.

In short, the server side and the client side are separated into each application chunk and they have their own `package.json` where all the dependencies and npm scripts are self-reliance. Then we can consider them independently and they became easily migratable for plugging into other server side or client side systems.

**TypeScript** is our primary programming language which is simply a superset of JavaScript and provides better and enjoyable scripting, debugging and testing throughout the entire workflow powered by its stronger type declarations.

## Maintainers / Contributors

- [namoonoo](https://github.com/naamoonoo)
- [jhaemin](https://github.com/jhaemin)

## Development

You have to manually install modules and build for each of server side and client side. Fortunately, we use the same script names not to confuse ourselves.

```zsh
# Inside `/server` and `/client`
% npm install # or just npm i
% npm run dev # will open the port to host the apps, automatically rebuild on change
% npm run build # will produce production ready codes

# only for server
% npm start # run the app after build
```

## TDD

We chose to start with [TDD](https://en.wikipedia.org/wiki/Test-driven_development), stands for Test-driven development, where firstly write the test cases for every function and API request then implement them passing all those pre-ready tests. In this way, we can build more robust and neat source code. However, sometimes TDD feels cumbersome and we refused to write tests unconsciously, which means at some point we were doing in exactly the reversed way. We didn't expect ourselves to do the perfect job, it's okay.

To checenut more about our tests, take a look at **`__TEST__`** directories that reside somewhere.

## Server Side

### Express

[Express.js](https://expressjs.com/) is one of the most popular, powerful, extensible and lightweight Node.js server frameworks.

Currently we're using the following features of Express.

**Routing**

It is all about server side application. The Express router handles all the requests from the outside world. `get` is used for visiting pages, `post` is usually used for manipulating the data. In this project, we didn't consider much about RESTful things.

**Middlewares**

Similar yet the same thing as router. Middlewares could intervene between the middlewares at any point, at any router. Middlewares intercept the request and can early respond without going next to the next middlewares.

**Static**

Of course Express can serve the static files as usual like compiled CSS, JavaScipt or images and fonts to be loaded and consumed from the client side.

**Veiw Engine**

By default, browser understands and parses HTML. There are a lot of markup languages that compiles to HTML. Express can be mixed with those view engines and does server side rendering when a user requests a page which is not written in plain HTML. We are using both HTML and [**Pug**](https://pugjs.org/api/getting-started.html).

**Session**

Express session is like a global storage alive only during each session. According to the official [documentation](https://github.com/expressjs/session), session data are not stored in cookie directly, but just the session ID. The data are stored in server-side safely.

### Database

We use [nedb](https://github.com/louischatriot/nedb), one of the most popular embedded database for Node.js nw.js and electron. This modules is a JSON-like-file-based datastore that provides mongoDB-like APIs. It's easy to learn, easy to embed right into the existing projects.

### Security

We use [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) to hash user passwords.

## Client Side

### webpack

To build and bundle TypeScript sources, we integrate with the [**webpack**](https://webpack.js.org/) build system.

### Semantic HTML

Semantic HTML is the use of HTML markup to strengthen the meaning of the information in webpages, rather than just display its presentational look. In HTML5, many semantic tags were added like `nav`, `main`, or `aside`. You can also write semantic markup without those tags by merely adding [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) attributes to any tags. But according to the MDN, it is better to prefer semantic HTML element over ARIA if possible.

```html
<!-- Non-semantic elements -->
<div>This tag tells nothing about its content</div>
<span>Also this tag means nothing about its content</span>

<!-- Semantic elements -->
<article>
  <h1>This is head</h1>
  <p>This is paragraph</p>
</article>
```

### CSS

Markup language alone looks horrible and literally ugly. CSS gracefully resolves this problem by applying styles whatever we want. Thanks to the new flex and grid layout system, the design possibilities now became almost infinity.

**var()**

Until this feature came out, we couldn't assign any reusable variables like global colors or sizes. The preprocessors were the king to mitigate this problem. They enable us to define variables, reuse them, and manipulate them with a lot of utility functions. They were good enough to enhance the styling workflow. However, the preprocessed styles are still static assets and cannot act dynamically. The only way to change the property was to explicitly set the values with `@media`.

`var()` makes it possible to create global or scoped variables that work like [Pub-Sub pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern). All the properties listening to a specific value dynamically change.

```css
/* declare */
:root {
  /* Colors */
  --gray: #777;
  --border-gray: #ddd;
  ...
  /* Sizes */
  --input-msg-height: 29px;
  --transition-time: 250ms;
}

/* use case */
.input-wrapper {
  ...
  border: 1px solid var(--border-gray);

  ...
  transition: opacity var(--transition-time) ease,
}

/* You can change the value responsively */
@media only screen and (max-width: 700px) {
  :root {
    --input-msg-height: 20px;
  }
}
```

### Animation(Dynamic UI)

Dynamic UI is a great way to dynamically interact with the end users. Mostly used for pretty look, but It also could upgrade the UX(user experience). In our project, one of the example is giving a positive feedback by showing green check icon when the user's input is valid and vice verse.

<p align="center">
  <img src="./server/src/public/assets/images/input-validator.gif" width="300" />
</p>

To implement dynamic ui, the [transform](https://developer.mozilla.org/en/docs/Web/CSS/transform), [transition](https://developer.mozilla.org/en/docs/Web/CSS/transition), and [animation](https://developer.mozilla.org/en/docs/Web/CSS/animation) are the related css property.

- **Transition** is used for enabling you to define the transition between two states of an element.
- **Transform** property lets you rotate, scale, skew, or translate an element which means actullay changing the element.
- **Animation:** Compared to transform or transition, Animation can specify change by using @keyframes. keyframes detailize the transition and depend on each status using `from` and `to` statement or specifying the each `%`'s status.

```css
@keyframes springZoomOut {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  1% {
    transform: scale(0.305023341375187);
    opacity: 0.007176201964553;
  }

  ... ... 99% {
    transform: scale(1.001268916679594);
    opacity: 1.001812738113706;
  }
  100% {
    transform: scale(1.001145589595984);
    opacity: 1.001636556565692;
  }
}

.check .icon {
  animation: springZoomOut 0.6s linear forwards;
  ...;
}
```

### Responsive Design

All the pages we've created always fit best to every screen size. It's called [responsive design](https://en.wikipedia.org/wiki/Responsive_web_design) and you can achieve this with many technologies like CSS and JavaScipt as all you know well.

**Sign Up Page**

<figure>
  <img src="https://user-images.githubusercontent.com/19797697/87106796-2f71e680-c299-11ea-95d4-746ce09effaa.png" alt="">
  <figcaption align="center">Desktop</figcaption>
</figure>

<figure align="center">
  <img src="https://user-images.githubusercontent.com/19797697/87106913-7233be80-c299-11ea-9cb8-849254c3fc96.png" alt="" width="300">
  <figcaption align="center">Mobile</figcaption>
</figure>

### Flex

`flex` layout is perfect for faster responsive design and development. Flex elements are so **flex**ible that they are automatically divided into suitable portions using percentage.

For example, given the HTML and CSS

```html
<div class="parent">
  <div class="child-1"></div>
  <div class="child-2"></div>
</div>
```

```css
.parent {
  display: flex;
  flex-direction: row;
}

.child-1 {
  flex: 1;
}

.child-2 {
  flex: 2;
}
```

Totally the sum of the flex parent's child elements' flex value is **3**. Then `.child-1` occupies **1/3** and `.child-2` occupies **2/3** of the parent's space.

### @media

This CSS feature constraints styles at specific situations.

```css
.content {
  width: 500px;
  height: 500px;
}

@media only screen and (min-width: 1400px) {
  .content {
    width: 800px;
    height: 800px;
  }
}
```

The `.content`'s size changes when the screen width exceeds **1400px**. You can simplify it by refactoring the codes using `var()` we've just mentioned above.

```css
:root {
  --content-size: 500px;
}

.content {
  width: var(--content-size);
  height: var(--content-size);
}

@media only screen and (min-width: 1400px) {
  :root {
    --content-size: 800px;
  }
}
```

Then we can reduce the duplicate code and unexpected side effects.

## License

MIT License

Copyright (c) 2020 [jhaemin](https://github.com/jhaemin) & [naamoonoo](https://github.com/jhaemin)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
