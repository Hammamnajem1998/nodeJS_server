const express = require('express');
const app = express();

app.get('/', (req, res) =>{
    res.send('Holow world');

});
app.listen(3000, () => console.log('listing on port 3000...'));
// 
// app.post();
// app.put();
// app.delete();   