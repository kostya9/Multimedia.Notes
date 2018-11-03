export const nearest = 
    (arr, val) => arr.reduce((p,n) => Math.abs(p) > Math.abs(n-val) ? n-val : p, Infinity) + val;