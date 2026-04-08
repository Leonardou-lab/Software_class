// Leonardo André Flores Mendoza - A01787221

// 1. firstNonRepeating
export function firstNonRepeating(str) {
    for (let i = 0; i < str.length; i++) {
        let count = 0;

        for (let j = 0; j < str.length; j++) {
            if (str[i] === str[j]) {
                count++;
            }
        }
        if (count === 1) {
            return str[i];
        }
    }
    return null;
}

// 2. bubbleSort
export function bubbleSort(arr) {

    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {

                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// 3a. invertArray 
export function invertArray(arr) {

    let result = [];

    for (let i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i]);
    }
    return result;
}

// 3b. invertArrayInplace 
export function invertArrayInplace(arr) {

    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
    return arr;
}

// 4. capitalize 
export function capitalize(str) {

    let result = '';
    let capitalizeNext = true;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
            result += str[i];
          capitalizeNext = true;
        } else {
            if (capitalizeNext) {
                result += str[i].toUpperCase();
                capitalizeNext = false;
            } else {
                result += str[i];
            }
        }
    }
    return result;
}

// 5. mcd - máximo común divisor 
export function mcd(a, b) {

    while (a !== b) {
        if (a > b) {
            a = a - b;
        } else {
            b = b - a;
        }
    }
    return a;
}

// 6. hackerSpeak 
export function hackerSpeak(str) {

    let result = '';
    let map = {'a': '4', 'A': '4', 'e': '3', 'E': '3','i': '1', 'I': '1','o': '0', 'O': '0','s': '5', 'S': '5'};
   
    for (let i = 0; i < str.length; i++) {
      if (map[str[i]]) {
            result += map[str[i]];
        } else {
            result += str[i];
        }
    }
    return result;
}

// 7. factorize 
export function factorize(num) {

    let factors = [];

    for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
            factors.push(i);
        }
    }
    return factors;
}

// 8. deduplicate 
export function deduplicate(arr) {

    let result = [];

    for (let i = 0; i < arr.length; i++) {
        let isDuplicate = false;
      for (let j = 0; j < result.length; j++) {
            if (arr[i] === result[j]) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) {
            result.push(arr[i]);
        }
    }
    return result;
}

// 9. findShortestString 
export function findShortestString(arr) {

    let shortest = arr[0].length;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i].length < shortest) {
            shortest = arr[i].length;
        }
    }
    return shortest;
}

// 10. isPalindrome 
export function isPalindrome(str) {

    let left = 0;
    let right = str.length - 1;

    while (left < right) {
      if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

// 11. sortStrings 
export function sortStrings(arr) {

    let result = arr.slice();

    for (let i = 0; i < result.length - 1; i++) {
        for (let j = 0; j < result.length - i - 1; j++) {
          if (result[j] > result[j + 1]) {
                let temp = result[j];
                result[j] = result[j + 1];
                result[j + 1] = temp;
            }
        }
    }
    return result;
}

// 12. stats 
export function stats(arr) {

    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    let avg = sum / arr.length;
    
    // moda
    let frequency = {};

    for (let i = 0; i < arr.length; i++) {
        if (frequency[arr[i]]) {
            frequency[arr[i]]++;
        } else {
          frequency[arr[i]] = 1;
        }
    }
    
    let maxFreq = 0;
    let mode = arr[0];

    for (let num in frequency) {
        if (frequency[num] > maxFreq) {
            maxFreq = frequency[num];
            mode = Number(num);
        }
    }
    
    return [avg, mode];
}

// 13. popularString 
export function popularString(arr) {

    let frequency = {};

    for (let i = 0; i < arr.length; i++) {
      if (frequency[arr[i]]) {
            frequency[arr[i]]++;
        } else {
            frequency[arr[i]] = 1;
        }
    }
    
    let maxFreq = 0;
    let popular = arr[0];

    for (let str in frequency) {
        if (frequency[str] > maxFreq) {
          maxFreq = frequency[str];
            popular = str;
        }
    }
    
    return popular;
}

// 14. isPowerOf2 
export function isPowerOf2(num) {

    if (num <= 0) return false;
    while (num > 1) {
        if (num % 2 !== 0) {
          return false;
        }
        num = num / 2;
    }

    return true;
}

// 15. sortDescending 
export function sortDescending(arr) {

    let result = arr.slice();

    for (let i = 0; i < result.length - 1; i++) {
      for (let j = 0; j < result.length - i - 1; j++) {
            if (result[j] < result[j + 1]) {
                let temp = result[j];
                result[j] = result[j + 1];
                result[j + 1] = temp;
            }
        }
    }
    return result;
}

