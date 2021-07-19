// requires path package to get accurate filepath
const path = require ('path');

// application routing
module.exports = function(app) {
    // get requests
    app.get('/html', function (req, res){
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });

    app.get('/notes', function(req, res) {
        res.sendFile(path.join(__dirname, 'public/notes.html'));
    });
}