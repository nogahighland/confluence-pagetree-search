# Confluence Pagetree Search

![](https://github.com/nogahighland/confluence-pagetree-search/actions/workflows/build.yml/badge.svg?branch=master)


This is a chrome extension that add a feature to search confluence pagetree by names.

The extension can be installed here:
https://chrome.google.com/webstore/detail/confluence-better-pagetre/impgjbnbnocheogednhacjjofkkkbpce/related

## Screenshots

https://user-images.githubusercontent.com/1780339/136763140-d18000d3-b736-468b-b6a7-c4b663e9e71d.mov

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

If you are using [volta](https://volta.sh/) you can get the disirable `node` and `yarn` versions automatically. If you don't, please have a look at package.json's `volta` values.

```json
  "volta": {
    "node": "14.17.6",
    "yarn": "1.22.11"
  },
```

### Installing

If you are using volta, the below line automatically set-ups your environment.

```sh
$ volta setup
```

After you install `yarn`, then install dependencies under `node_modules/` and build the TypeScript & vue resources under `src/` directory.

```sh
$ yarn install
$ yarn run webpack --watch
```

To take screenshot, you can use `STORE=1` environment variable to hide your own space's confidential information.

```sh
$ STORE=1 yarn run webpack --watch
```

After running above command, installable unpacked extension is built under `dist/` directory.
Please install it from chrome://extensions .

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/nogahighland/confluence-better-pagetree/tags).

## Authors

@nogahighland

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## History

version|description
---|---
0.0.1|First release
0.0.2|Fix #1
0.0.3|Fix #3
0.0.4|Fix #4 #5 #7
0.0.5|Fix #10 #11
0.0.6|Delay input handler by throttle => debounce by 200ms => 300ms
0.0.7|Performance tuning #14
0.0.8|Add target="_blank" for other hosts #16
0.0.9|Fix target="_blank" for other hosts #18
0.0.10|Scroll to current page #19
0.0.11|Fix scroll, Fake text for store screenshots #19, #20
2.0.1|Confluence Better Pagetree is now Confluence Tree Search extension.

