"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = exports.runInSequence = void 0;
/**
 * Run the given list of async functions in sequence and returns the results of them
 * @param {Array<() => Promise<T>} functions The list of async functions
 * @param {ProgressCallback} progressCallback The callback reporting the progress
 * @param {number} delay The time in `ms` to wait before executing the next function
 * @param {number} index The index of the function to execute, used for recursion
 * @returns {Array<T>} The results of the functions
 */
function runInSequence(functions, progressCallback, delay, index = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = [];
        // check if all functions have been executed
        if (index >= functions.length) {
            return results;
        }
        // execute async function & add result to result set
        const asyncFunction = functions[index];
        const result = yield asyncFunction();
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
            yield wait(delay);
        }
        // recursively call next function
        const res = yield runInSequence(functions, progressCallback, delay, index);
        results.push(...res);
        return results;
    });
}
exports.runInSequence = runInSequence;
/**
 * Wait for the given number of milliseconds
 * @param delay The time in `ms` to wait before resolving
 * @returns
 */
function wait(delay) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => setTimeout(resolve, delay));
    });
}
exports.wait = wait;
//# sourceMappingURL=index.js.map