var validator = require('validator');
var sh = require("shorthash");

const Bookmark = require('../model/bookmark')

module.exports.list = (req, res) => {
    console.log('in listing')
    Bookmark.find()
        .then(bookmark => {
            res.json(bookmark)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.create = (req, res) => {
    const body = req.body
    const url = body.originalUrl
    const validation = validator.isURL(url)
    if(validation) {
        const hashedUrl =  sh.unique(url)
        req.body.hashedUrl = hashedUrl
        const bookmark = new Bookmark(body)
        bookmark.save()
            .then(bookmark => {
                res.json(bookmark)
            })
            .catch(err => {
                res.json(err)
            })
    } else {
        res.json('validation error')
    }
}

module.exports.show = (req, res) => {
    console.log('in show `/bookmarks/:id`')
    const id = req.params.id
    Bookmark.findById(id)
        .then(bookmark => {
            if(bookmark) {
                res.json(bookmark)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.showHash = (req, res) => {
    const hash = req.params.hash
    Bookmark.find({hashedUrl: hash})
        .then(bookmark => {
            if(bookmark) {
                res.json(bookmark)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}


module.exports.destroy = (req, res) => {
    const id = req.params.id
    Bookmark.findByIdAndDelete(id)
        .then(bookmark => {
            if(bookmark) {
                res.json(bookmark)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Bookmark.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        .then(bookmark => {
            if(bookmark) {
                res.json(bookmark)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.showw = (req, res) => {
    // localhost:3010/bookmarks/tags?names=node,arr
    // `/bookmarks/tags`
    const tags = req.query
    // console.log('tags',tags)
    const str = tags.names
    const promise = []
    str.forEach(ele => {
        promise.push(Bookmark.find({tags: ele}))
    });
    Promise.all(promise)
        .then(response => {
            console.log('here',response)
            res.json(response)
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports.showTag = (req, res) => {
    // localhost:3010/bookmarks/tags/node
    // '/bookmarks/tags/:tag'
    const tag = req.params.tag
    Bookmark.find({tags: tag})
        .then(bookmark => {
            if(bookmark.length != 0) {
                res.json(bookmark)
            } else {
                res.json('Tag is not valid')
            }
        })
        .catch(err => {
            res.json(err)
        })
}