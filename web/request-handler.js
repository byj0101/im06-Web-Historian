var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs')
var url = require('url')
var httpHelpers = require('./http-helpers.js')
// require more modules/folders here!

var body = '';
exports.handleRequest = function (req, res) {
  if (req.method === 'GET'){
    if(url.parse(req.url).pathname === '/'){
    httpHelpers.serveAssets(res, 'index.html', 200)
    } else {
      res.writeHead(404, httpHelpers.headers);
      res.end();
    } 

  } else if(req.method === 'POST'){
    if (1) {
      req.on('data', (chunk) => {
      body += chunk
    });
      req.on('end', () => {
        try {
        body = body.split('=')[1];
          res.writeHead(302, httpHelpers.headers);
          archive.isUrlInList(body, function(a){
            if(a === false) {
               //list에 url 없는경우 추가
              archive.addUrlToList(body + '\n', function () { })
            } else {
              //list에 url 있는경우
              archive.isUrlArchived(body, function(a){
              
                if(a === true){
                  httpHelpers.serveArchievs(res, body, 200, function(data){
                    console.log('@@@@@@@@@@@@@2');
                    console.log(data);
                    res.end(data);
                  });
                }
                else {
                  archive.downloadUrls(body)
                  res.end();
                }
              })
            } 
          })
          
        } catch(err) {
          console.log(1)
        } 
      })
    }
  }

}

  //   req.on('end', () => {
  //     try {
  //       var data = JSON.parse(body);
  //       results["results"].push(data);
  //       res.writeHead(201, headers);
  //       res.end("posted");
  //     } catch (er) {
  //       res.writeHead(404, headers);
  //       res.end(`error : ${er.message}`)
  //     }
  //   })
  // } else {
  //   res.writeHead(404);
  //   res.end("wrong url");
  // }



// 
//   if (req.method === 'GET' || url.parse(req.url).pathname === '/') {
//     console.log("a")
//     fs.readFile('D:/immersive/im06-2018-03-web-historian/web/public/index.html', 'utf8', function (err, data) {
//       if (!err) {
//         console.log('aa')
//         res.writeHead(200, headers);
//         res.write(data);
//         res.end();
//       } else {
//         console.log('err :' + err)
//       }
//     })
//   }
// }

  

