onmessage = function(e) {
    const islands = e.data;

    postMessage(Math.random());

    close();
};