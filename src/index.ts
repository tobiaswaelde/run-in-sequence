/**
 * The callback params
 */
export type ProgressCallbackParams = {
	/** The number of the last runnung function, starting from `1` */
	index: number;
	/** The progress from `0` to `1` */
	progress: number;
	/** The progress in percent from `0` to `100` */
	percent: number;
};

/**
 * Callback function that gives info about the current progress.
 */
export type ProgressCallback = (params: ProgressCallbackParams) => void;

/**
 * Run the given list of async functions in sequence and returns the results of them
 * @param {Array<() => Promise<T>} functions The list of async functions
 * @param {ProgressCallback} progressCallback The callback reporting the progress
 * @param {number} delay The time in `ms` to wait before executing the next function
 * @param {number} index The index of the function to execute, used for recursion
 * @returns {Array<T>} The results of the functions
 */
export async function runInSequence<T>(
	functions: Array<() => Promise<T>>,
	progressCallback?: ProgressCallback,
	delay?: number,
	index: number = 0
): Promise<Array<T>> {
	const results: T[] = [];

	// check if all functions have been executed
	if (index >= functions.length) {
		return results;
	}

	// execute async function & add result to result set
	const asyncFunction = functions[index];
	const result = await asyncFunction();
	results.push(result);

	// increase index for recursion & progress reporting
	index++;

	// progress callback
	if (progressCallback !== undefined) {
		const progress = index / functions.length;
		const percent = progress * 100;
		progressCallback({ index, progress, percent });
	}

	// add delay between functions
	if (delay !== undefined) {
		await wait(delay);
	}

	// recursively call next function
	const res = await runInSequence(functions, progressCallback, delay, index);
	results.push(...res);
	return results;
}

/**
 * Wait for the given number of milliseconds
 * @param delay The time in `ms` to wait before resolving
 * @returns
 */
export async function wait(delay: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, delay));
}
