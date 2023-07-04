//sever creation

//1.http module

const http=require('http'); //check
const fs=require('fs');    //check

const server=http.createServer((req,res)=>{  // req == goes to sever and res == goes to browser(client) 
    console.log('request has been made from browser to server');
    // console.log(req.method);
    // console.log(req.url);
    // res.setHeader('Content-Type','text/plain'); //check
    res.setHeader('Content-Type','text/html');
    // res.write('<h1> Hello, Pepcoders!</h1>');
    // res.write('<h6>Hello, Pepcoders!</h6>');
    // res.end();

// different routes

let path ='./views';
switch(req.url){
    case '/':
        path+='/index.html'
        res.statusCode=200;
        break;
        case '/about':
            path+='/about.html'
            res.statusCode=200;
            break;
            case '/about-me':
            res.statusCode=301; // statusCode = 301 Moved Permanently
            res.setHeader('Location','/about'); //redirect requires setHeader
            res.end();
            break;
            default:
                path+='/404.html'
                res.statusCode=404;
                break;
};

    fs.readFile(path,(err,fileData)=>{  //path= './views/index.html or ./views/index.html'
        if(err){
            console.log(err);
        }
        else{
            //  res.write(fileData); // For multiple lines use  res.write == res.write(FileData)
            res.end(fileData);    //For single lines use  res.end== res.end(FileData)
        }
    })
    
});

//port number , host , callback func
server.listen(3000, 'localhost', () => { //check
    console.log('server is listening on port 3000');
})