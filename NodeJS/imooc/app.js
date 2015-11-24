var express = require('express')
var port = process.env.PORT || 3000
var app = express()

app.set('views', './views')
app.set('view engine', 'jade')
app.listen(port)

console.log('imooc server running at 127.0.0.1:' + port)

app.get('/', function(req, res) {
  res.render('index', {
    title: 'imooc Index'
  })
})


app.get('/movie/:id', function(req, res) {
  res.render('index', {
    title: 'imooc Detail'
  })
})

app.get('/admin/movie', function(req, res) {
  res.render('index', {
    title: 'imooc Admin'
  })
})

app.get('/admin/list', function(req, res) {
  res.render('index', {
    title: 'imooc List'
  })
})
