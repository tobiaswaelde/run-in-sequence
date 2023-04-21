# runInSequence

<!-- badges -->
[![Quality Gate Status](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_run-in-sequence_AYekOt526HzYw3BQH21R&metric=alert_status&token=sqb_88cea2dfb6c3ae5ac1a9ae3c1aef197ff93760c4)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_run-in-sequence_AYekOt526HzYw3BQH21R)
[![Security Rating](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_run-in-sequence_AYekOt526HzYw3BQH21R&metric=security_rating&token=sqb_88cea2dfb6c3ae5ac1a9ae3c1aef197ff93760c4)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_run-in-sequence_AYekOt526HzYw3BQH21R)
[![Vulnerabilities](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_run-in-sequence_AYekOt526HzYw3BQH21R&metric=vulnerabilities&token=sqb_88cea2dfb6c3ae5ac1a9ae3c1aef197ff93760c4)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_run-in-sequence_AYekOt526HzYw3BQH21R)
[![Bugs](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_run-in-sequence_AYekOt526HzYw3BQH21R&metric=bugs&token=sqb_88cea2dfb6c3ae5ac1a9ae3c1aef197ff93760c4)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_run-in-sequence_AYekOt526HzYw3BQH21R)
[![Lines of Code](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_run-in-sequence_AYekOt526HzYw3BQH21R&metric=ncloc&token=sqb_88cea2dfb6c3ae5ac1a9ae3c1aef197ff93760c4)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_run-in-sequence_AYekOt526HzYw3BQH21R)
[![Duplicated Lines (%)](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_run-in-sequence_AYekOt526HzYw3BQH21R&metric=duplicated_lines_density&token=sqb_88cea2dfb6c3ae5ac1a9ae3c1aef197ff93760c4)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_run-in-sequence_AYekOt526HzYw3BQH21R)
[![Maintainability Rating](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_run-in-sequence_AYekOt526HzYw3BQH21R&metric=sqale_rating&token=sqb_88cea2dfb6c3ae5ac1a9ae3c1aef197ff93760c4)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_run-in-sequence_AYekOt526HzYw3BQH21R)

`runInSequence` is a simple util to run a list of asyc functions in sequence.

- [Installation](#installation)
- [How to use](#how-to-use)
  - [Basic usage](#basic-usage)
  - [With progress](#with-progress)
  - [With progress bar](#with-progress-bar)
  - [Delay](#delay)


## Installation
#### NPM
```
npm install run-in-sequence
```
#### Yarn
```
yarn add run-in-sequence
```

## How to use

For the following examples, given the list of async functions:
```ts
// create a list of async functions
const listOfAsyncFunctions = Array.from(new Array(10)).map(
	(_, i) => (): Promise<number> =>
		new Promise((resolve) => {
			setTimeout(() => {
				resolve(i);
			}, 250);
		})
);
```

### Basic usage
```ts
const results = await runInSequence(listOfAsyncFunctions);
console.log(`Results:`, results);
```

##### Output
```
Results: [
  0, 1, 2, 3, 4,
  5, 6, 7, 8, 9
]
```

### With progress
```ts
const results = await runInSequence(listOfAsyncFunctions, ({ index, progress, percent }) => {
	console.log(`Progress: [${index}] ${progress} - ${percent}%`)
});
console.log(`Results:`, results);
```

#### Output
```
Progress: [1] 0.1 - 10%
Progress: [2] 0.2 - 20%
Progress: [3] 0.3 - 30%
Progress: [4] 0.4 - 40%
Progress: [5] 0.5 - 50%
Progress: [6] 0.6 - 60%
Progress: [7] 0.7 - 70%
Progress: [8] 0.8 - 80%
Progress: [9] 0.9 - 90%
Progress: [10] 1 - 100%
Results: [
  0, 1, 2, 3, 4,
  5, 6, 7, 8, 9
]
```

### With progress bar
```ts
import cliProgress from 'cli-progress';
const progressBar = new cliProgress.SingleBar({});

progressBar.start(listOfAsyncFunctions.length, 0);
const results = await runInSequence(listOfAsyncFunctions, ({ index }) =>
	progressBar.update(index)
);
progressBar.stop();
```

#### Output
```
progress [=======================================] 100% | ETA: 0s | 10/10
Results: [
  0, 1, 2, 3, 4,
  5, 6, 7, 8, 9
]
```

### Delay
You can add a delay between the function calls to prevent e.g. rate limiting in APIs.
```ts
// add 1 second delay between each function
const results = await runInSequence(listOfAsyncFunctions, undefined, 1000);
```