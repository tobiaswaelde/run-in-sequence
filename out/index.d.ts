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
export declare function runInSequence<T>(functions: Array<() => Promise<T>>, progressCallback?: ProgressCallback, delay?: number, index?: number): Promise<Array<T>>;
/**
 * Wait for the given number of milliseconds
 * @param delay The time in `ms` to wait before resolving
 * @returns
 */
export declare function wait(delay: number): Promise<void>;
//# sourceMappingURL=index.d.ts.map