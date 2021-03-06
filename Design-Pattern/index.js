// 观察者模式
function createObserver() {
    let eventQueue = {};
    function listen(name, fn) {
        if (!fn) return;
        if (!eventQueue[name]) {
            eventQueue[name] = [fn];
        } else if (eventQueue[name] && !eventQueue[name].some(item => item === fn)) {
            eventQueue[name].push(fn);
        } else {
            console.log('This function has been subscribed!');
        }
        return function unlisten() {
            if (!eventQueue[name]) return;

            const index = eventQueue[name].indexOf(fn);
            eventQueue[name].splice(index, 1);

            if (eventQueue[name].length === 0) {
                delete eventQueue[name];
            }
        }
    }
    function trigger(name, action) {
        if (eventQueue[name]) {
            eventQueue[name].forEach((item) => {
                item(action);
            })
        } else {
            console.log('No related subscriptions!');
        }
    }
    function remove(name) {
        if (eventQueue[name]) {
            delete eventQueue[name];
        } else {
            console.log('No related subscriptions!');
        }
    }
    function print() {
        console.log(eventQueue);
    }
    return {
        listen: listen,
        trigger: trigger,
        remove: remove,
        print: print
    }
}