export function _debounce(fn, delay) {
    var delay = delay || 200;
    var timer;
    return function() {
        var th = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            timer = null;
            fn.apply(th, args)
        }, delay);
    }
}

export function _throttle(fn, interval) {
    let prev = 0;
    return function() {
        var th = this;
        var args = arguments;
        var now = new Date()
        if (now - prev >= interval) {
            fn.apply(th, args)
            prev = now;
        }
    }
}