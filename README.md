# Confluence better page tree

This is a chrome extension that replaces confluence page tree.

The extension can be installed here:
https://chrome.google.com/webstore/detail/confluence-better-pagetre/impgjbnbnocheogednhacjjofkkkbpce/related

## Screenshots


default|filtered|expanded
---|---|---
![Untitled 001](https://user-images.githubusercontent.com/1780339/88995204-089d5200-d325-11ea-97af-574f938c4ce7.jpeg)|![Untitled 003](https://user-images.githubusercontent.com/1780339/88995211-0b984280-d325-11ea-8e74-412e343a51c6.jpeg)|![Untitled 002](https://user-images.githubusercontent.com/1780339/88995209-0affac00-d325-11ea-97bd-e1d7c6350d77.jpeg)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need `yarn` to develop this extension.

```
yarn --version
1.16.0
```

### Installing

After you install `yarn`, then install dependencies under `node_modules/` and build the javascript & vue resource under `src/` directory.

```
yarn install
yarn run webpack --watch
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

