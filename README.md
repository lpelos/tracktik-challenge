# TrackTik Challange

A two pages SPA application that communicates with a json-server and renders
dynamic content using TypeScript + ReactDOM + Redux Observable.

Built as a code challange for [TrackTik](https://www.tracktik.com/).

## Architecture

Having responsability separation and code testability in mind, the project
includes several types of resources each of which in their own folders:

* **\_\_fixtures__:** static data used by unit tests and [Storybook](#Storybook)
stories.
* **\_\_mocks__:** mocks of third party libs used by unit tests.
* **clients:** services responsible for communicating with external resources,
such as third-party libs and HTTP servers, and for abstracting them so that it
is easier to replace them with something else and so the rest of the app doesn't
have to know their APIs.
* **components:** React components that are not connected to any external
resource (e.g., Redux), most of which are available for visual and interactve
tests on [Storybook](#Storybook).
* **containers:** React components responsible for connecting atomic components
to the Redux store and abstracting application state logic.
* **data-types:** Typescript interfaces that represent the business data.
* **errors:** Classes that extend from Javascript's native `Error` that
represent specific types of application errors.
* **helpers:** Pure functions with logic that is used by several resources or
would otherwise be polluting a component's logic.
* **redux:** Redux store configuration following de
["ducks" pattern](https://redux.js.org/style-guide/style-guide#structure-files-as-feature-folders-or-ducks).
* **respositories:** services injected as dependencies in the Redux Observable's
Epics, each one responsible for gathering one specific type of data (e.g.,
Sites, Users, etc.)
* **screens:** React components responsible connecting other components to React
DOM Router resources and abstracting navigation logic.

All async operations use Observables instead of Javascript's native
Promises.

Most of the app are tested with Jest. Test files are in the same folders as the
resources they test.

## Dependencies

It's recommended to use Docker to avoid problems with differences in environment
configuration. If you don't have Docker installed refer to its official
documentation on how to install
[Docker Engine](https://docs.docker.com/engine/installation) and
[Docker Compose](https://docs.docker.com/compose/install/).

Alternatively, if you prefere not to use Docker for some reason, these are the
OS dependencies the project was built and tested on:

* **Node.js** v14.15.1
* **Yarn**    1.22.5

Refer to the official documentations on how to install
[Node.js](https://nodejs.org/en/download/package-manager) and
[Yarn](https://yarnpkg.com/getting-started/install).

## Configuration

First clone the repository and move to its directory:

```
$ git clone git@github.com:lpelos/tracktik-challange.git
$ cd tracktik-challange
```

Then build the projects's Docker image:

```
$ docker-compose build
```

That's it.

Alternatively, if your are not using docker, you must install the project
dependencies with:

```
$ yarn install
```

## Running the Application

```
$ docker-compose up app
```

Or, if you are not using Docker:

```
$ yarn start
```

The application will become available at http://localhost:3000.

### Local Server Mode

If the TrackTik's server is not available or you just want to work offline
you can use a local json-server by running the application with the following
command instead of the one above:

```
$ docker-compose up app-local
```

The local server will start on the backgrond and the app will redirect its
requests to it automatically.

If you wish to see the local server logs, run the following on a new tab:

```
$ docker-compose up json-server
```

Alternatively, if you are not using docker, you must start the local server
manually with:

```
$ yarn json-server
```

And then, on a new tab, set the server's address environment variable and run
the app with:

```
REACT_APP_TRACKTIK_HOST=http://localhost:3001 yarn start
```

## Storybook

With [Storybook](https://storybook.js.org/docs/react/get-started/introduction)
it is possible to test the project's components visually and interact with them
in an isolated environment.

```
$ docker-compose up storybook
```

Or, if you are not using Docker:

```
$ yarn storybook
```

The storybook's UI will become available at http://localhost:6006.

## Testing

```
$ docker-compose run --rm app yarn test
```

Or, if you are not using Docker:

```
$ yarn test
```

## Production Build

```
$ docker-compose run --rm app yarn build
```

Or, if you are not using Docker:

```
$ yarn build
```
