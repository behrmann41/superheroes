var express = require('express')
var router = express.Router()
var db = require('monk')('localhost/superheroes')
var Heroes = db.get('heroes')

router.get('/', function (req, res, next){
  Heroes.find({}, function (err, heroes){
    res.render('superheroes/home', {  title: 'List of Heroes', allHeroes: heroes})
  })
})

router.get('/new', function (req, res, next){
  res.render('superheroes/new', { title: 'Add a Hero'})
})

router.post('/new', function (req, res, next){
  Heroes.insert({ name: req.body.name,
                  power: req.body.power,
                  nemesis: req.body.nemesis
                })
  res.redirect('/superheroes')
})

router.get('/:id', function (req, res, next){
  Heroes.findOne({_id: req.params.id } , function (err, hero){
    res.render('superheroes/show', { title: 'Superhero Info', superhero: hero})
  })
})

router.get('/:id/edit', function (req, res, next){
  Heroes.findOne({_id: req.params.id }, function (err, hero){
    res.render('superheroes/edit', {  title: 'Update Hero', superhero: hero})
  })
})

router.post('/:id/edit', function (req, res, next){
  Heroes.updateById(req.params.id, {  name: req.body.name,
                                      power: req.body.power,
                                      nemesis: req.body.nemesis
                                    }, function (err, hero){
  res.redirect('superheroes/' + req.params.id)
  })
})

router.post('/:id/delete', function (req, res, next){
  Heroes.remove({_id: req.params.id}, function (err, hero){
    res.redirect('/superheroes')
  })
})

module.exports = router;