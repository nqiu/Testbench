var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var app = express()

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({extended: true}))
//app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'bower_components')))
app.locals.moment = require('moment')
app.listen(port)

console.log('imooc server running at 127.0.0.1:' + port)

app.get('/', function(req, res) {
  Movie.fetch(function(err, movies) {
    if (err) {
      console.error(err)
    }
    res.render('index', {
      title: 'imooc Index',
      movies: movies
    })
/*
  res.render('index', {
    title: 'imooc Index',
    movies: [{
      title: 'X-man',
      _id: 1,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: 'X-man',
      _id: 2,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: 'X-man',
      _id: 3,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: 'X-man',
      _id: 4,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: 'X-man',
      _id: 5,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
      title: 'X-man',
      _id: 6,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    }]
*/
  })
})


app.get('/movie/:id', function(req, res) {
  var id = req.params.id

  Movie.findById(id, function(err, movie) {
    res.render('detail', {
      title: 'imooc Detail',
      movie: movie
    })
/*
  res.render('detail', {
    title: 'imooc Detail',
    movie: {
      director: 'Fauthor',
      country: 'USA',
      title: 'X-man',
      year: 2014,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
      language: 'English',
      flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
      summary: 'Blad kafldkfalsdkfajdkfljfd sadfkalffdsfk jasdkflafj  ldkfjadlasfjad akdsfjalfjafjaagjalgjakgjalgjafkgjalfjgakfjgalgjfakgjakgafkgja'
    }
*/
  })
})

app.get('/admin/movie', function(req, res) {
  res.render('admin', {
    title: 'imooc Admin',
    movie: {
      title: '',
      director: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  })
})

app.get('/admin/update/:id', function(req, res) {
  var id = req.params.id

  if (id) {
    Movie.findById(id, function(err, movie) {
      res.render('admin', {
        title: 'imooc Admin',
        movie: movie
      })
    })
  }
})

app.post('/admin/movie/new', function(req, res) {
  var id = req.body.movie._id
  var movieObj = req.body.movie
  var _movie

  if (id !== 'undefined') {
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.error(err)
      }

      _movie = _.extend(movie, movieObj)
      _movie.save(function(err, movie) {
        if (err) {
          console.error(err)
        }

        res.redirect('/movie/' + movie._id)
      })
    })
  }
  else {
    _movie = new Movie({
      director: movieObj.director,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    })

    _movie.save(function(err, movie) {
      if (err) {
        console.error(err)
      }

      res.redirect('/movie/' + movie._id)
    })
  }
})

app.get('/admin/list', function(req, res) {
  Movie.fetch(function(err, movies) {
    if (err) {
      console.error(err)
    }

    res.render('list', {
      title: 'imooc List',
      movies: movies
    })
  })
/*
  res.render('list', {
    title: 'imooc List',
    movies: [{
      title: 'X-man',
      _id: 1,
      director: 'Fauthor',
      country: 'USA',
      year: 2014,
      language: 'English',
      flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
    }]
  })
*/
})
