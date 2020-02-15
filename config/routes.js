const express = require('express')
const bookmarksController = require('../app/controller/bookmarksController')

const router = express.Router()


// router.get('/home', (req, res) => {
//     res.send('welcome')
// })

router.get('/bookmarks', bookmarksController.list)
router.get('/bookmarks/tags', bookmarksController.showw) // localhost:3010/bookmarks/tags?names=node,arr
router.get('/bookmarks/tags/:tag', bookmarksController.showTag) // localhost:3010/bookmarks/tags/node
router.get('/bookmarks/:id', bookmarksController.show)
router.post('/bookmarks', bookmarksController.create)
router.delete('/bookmarks/:id', bookmarksController.destroy)
router.put('/bookmarks/:id', bookmarksController.update)
router.get('/:hash', bookmarksController.showHash)

module.exports = router 