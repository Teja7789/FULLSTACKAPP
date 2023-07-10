FULL STACK APP

step 1: nodestatucodeToviews = res.statusCode=200; and res.statusCode=404;

step 2: nodeSeverRedirect Routes = direct to another page in node using

step 3: nodeAddedDegger = npm start and debugger to console the data  
package.json 
Debug 
"scripts": {
    "test": "npm start",
    "start": "node --inspect sever.js"
  },
step 4: expressSetup = npm i express npm i nodemon npm i lodash and  changed "start": "node --inspect sever.js"   to  "start": "node --inspect app.js"  

step 5: Express Intro code 
const express = require('express') // import
const app = express() //invoke

//port number , host , callback func
app.listen(3000);

//routes
// app.get('/', function (req, res) {
//     //   res.send('Hello World')
//     // res.write("Hello");
//     // res.end();
// debugger; // not work bcz express
//     res.send('<h1>Hello</h1>');
//     });
//automatically set routues like 404 etc,
// app.get('/', (req, res)  => {
//     // automatically sets  res.setHeader('Content-Type','text/html');
//     res.send('<h1>Hello</h1>')
// });

// app.get('/about', (req, res)  => {
//   res.send('<h1>About</h1>')
// });

// views html  files 
app.get('/', (req, res)  => {
// first way
    res.sendFile('/Users/SIVANANDINI/Desktop/FullstackApp/views/index.html')
});

app.get('/about', (req, res)  => {
    // second way
  res.sendFile('./views/about.html',{root:__dirname})
});



//redirect pages
app.get('/carrier', (req, res)  => {
    // from carrier to about page redirecting
  res.redirect('./about');  //check status code (302)== moved permantely
}); 

//404 -- only used at last keyword use not send- auotomatically  shows
app.use((req, res)  => {
 //use keyword for 404  and .statusCode(404) - this chaining is used
  res.status(404).sendFile('./views/404.html',{root:__dirname})
});