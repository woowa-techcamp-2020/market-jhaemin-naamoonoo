![github banner](https://user-images.githubusercontent.com/19797697/87056675-edb55180-c240-11ea-922b-5592902a8abf.png)

<h3 align="center">
  <a href="https://ceo.baemin.dev">https://ceo.baemin.dev</a>
</h3>

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
> npm install # or just npm i
> npm run dev # will open the port to host the apps, automatically rebuild on change
> npm run build # will produce production ready codes

# only for server
> npm start # run the app after build
```

## TDD

We chose to start with [TDD](https://en.wikipedia.org/wiki/Test-driven_development), stands for Test-driven development, where firstly write the test cases for every function and API request then implement them passing all those pre-ready tests. In this way, we can build more robust and neat source code. However, sometimes TDD feels cumbersome and we refused to write tests unconsciously, which means at some point we were doing in exactly the reversed way. We didn't expect ourselves to do the perfect job, it's okay.

To checkout more about our tests, take a look at **`__TEST__`** directories that reside somewhere.

## Server Side

### Express

[Express.js](https://expressjs.com/) is one of the most popular, powerful, extensible and lightweight Node.js server frameworks.

Currently we're using the following features of Express.

**Routing**

It is all about server side application. The Express router handles all the requests from the outside world. `get` is used for visiting pages, `post` is usually used for manipulating the data. In this project, we didn't consider much about RESTful things.

**Middlewares**

Similar yet the same thing as router. Middlewares could intervene between the middlewares at any point, at any router. Middlewares intercept the request and can early response without going next to the next middlewares.

**Static**

Of course Express serves the static files like compiled CSS, JavaScipt or images and fonts to be loaded and consumed from the client side.

**Veiw Engine**

By default, browser understands and parses HTML. There are a lot of markup languages that compiles to HTML. Express can be mixed with those view engines and does server side rendering when a user requests a page which is not written in plain HTML. We are using both HTML and [**Pug**](https://pugjs.org/api/getting-started.html).

**Session**

Express session is like a global storage alive only during each session. According the [documentation](https://github.com/expressjs/session) session data are not stored in cookie directly, but just the session ID. The data are stored in server-side safely.

### Database

We use [nedb](https://github.com/louischatriot/nedb), one of the most popular embedded database for Node.js nw.js and electron. This modules is a JSON-like-file-based datastore that provides mongoDB-like APIs. It's easy to learn, easy to embed right into the existing projects.

### Security

We use [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) to hash user passwords.

## Client Side

### webpack

To build and bundle TypeScript sources, we integrate with the [**webpack**](https://webpack.js.org/) build system.

### Semantic Markup

### CSS

Markup language alone looks horrible and literally ugly.

**var()**

**Transition**

**Animation**
