const express = require('express');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1><p>This is a paragraph.</p>');
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));