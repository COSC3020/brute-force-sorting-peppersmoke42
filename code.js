function swap(arr, i, j)
{
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function isSorted(arr)
{
    for (let i = 0; i < arr.length - 1; i++)
        if (arr[i] > arr[i + 1])
            return false;
    return true;
}

// Heap's algorithm generates a new, unique permutation
//
// Base case -> only one element remains in the array : this is a permutation
//   Check our list of uniques
//     if this permutation isn't found, return it
//     otherwise return null
//
// Recursive case -> more than one element
//   Recursively call our function for all unaltered elements
//   if a valid permutation is found, return it
//   
//   for all indices i:
//      recursively calls itself, with one less element
//      if a valid permutation is found, it is returned
//      otherwise swap the ith element with the nth element
//          this creates a new permutation of the first n elements
//
//   while Heap's algorithm typically utilizes an even odd conditional to prevent
// repeating permutations, this behavior breaks does not recognize repeated
// permutations due to duplicate values. As such I've modified it to utilize
// a set of unique permutations to avoid counting duplicates. This could 
// probably be optimized, as this set uses a lot of memory
//
// Arguments:
// arr - the incoming array
// n - how much of the array are we permuting
// uniquePermutations - a set of arrays representing every unique permutation made so far
function generatePermutation(arr, n, uniquePermutations) {
    if (n === 1) {
        
        const key = arr.join()
        if (!uniquePermutations.has(key)) {
            uniquePermutations.add(key);
            return arr;
        }
        return null;
    }

    for (let i = 0; i < n; i++) {
        const result = generatePermutation(arr, n - 1, uniquePermutations);
        if (result != null)
            return result;

        swap(arr, i, n - 1);
        
        /*
        if (n % 2 == 0)
            swap(arr, i, n - 1);
        else
            swap(arr, 0, n - 1);
        */
    }
    return null;
}


// If the array has less than two values, it's sorted on the first permutation
//     return 1 in this case
//
// Otherwise keep looping until the break condition:
//     generate a new permutation, and store it
//     increase a counter variable
//     if the new permutation is sorted:
//         break the loop
//
// return the counter variable after the loops execution
function permutationSort(arr) 
{
    if (arr.length < 2)
        return 1;
    let count = 0;
    let permutation;
    const uniquePermutations = new Set();
    while (true) {
        permutation = generatePermutation(arr, arr.length, uniquePermutations);
        count++;
        if(permutation != null && isSorted(permutation))
            break;
    }
    return count;
}