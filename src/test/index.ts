import cliProgress from 'cli-progress';
import { runInSequence } from '..';

const progressBar = new cliProgress.SingleBar({});

// create a list of async functions
const listOfAsyncFunctions = Array.from(new Array(10)).map(
	(_, i) => (): Promise<number> =>
		new Promise((resolve) => {
			setTimeout(() => {
				resolve(i);
			}, 250);
		})
);

async function run() {
	console.log('Running');

	const results = await runInSequence(listOfAsyncFunctions, ({ index, progress, percent }) =>
		console.log(`Progress: [${index}] ${progress} - ${percent}%`)
	);

	console.log(`Results:`, results);
}

async function runWithProgressBar() {
	console.log(' Running with progress bar');

	progressBar.start(listOfAsyncFunctions.length, 0);
	const results = await runInSequence(listOfAsyncFunctions, ({ index }) =>
		progressBar.update(index)
	);
	progressBar.stop();

	console.log(`Results:`, results);
}

async function main() {
	await run();
	await runWithProgressBar();
}
main();
