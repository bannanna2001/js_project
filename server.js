let http = require('http');
let static = require('node-static');
let file = new static.Server('.', {
    cache: 0,
    headers: {}
});

function accept(req, res) {
    //file.serve(req, res);

    if (req.url.startsWith('/api')) {
        setTimeout(() => {
            file.serve(req, res);
        }, 250);
    } else {
        file.serve(req, res);
    }
}

http.createServer(accept).listen(3000);
console.log('Server running');