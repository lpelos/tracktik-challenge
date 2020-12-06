# TrackTik Challange

A two pages SPA application that communicates with a json-server and renders
dynamic content using TypeScript + ReactDOM + Redux Observable.

Built as a code challange for [TrackTik](https://www.tracktik.com/).

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
