const router = require("express").Router();
const {
    listPosts,
    getPostById,
    createPost,
    addComment,
    addLike,
    addDislike
} = require("../controller/post");
// MIDDLEWARES
const { protect } = require("../middleware/auth");

router.route("/").get(protect,listPosts);
router.route("/:id").get(protect,getPostById);
router.route("/create").post(protect,createPost);
router.route("/addcomment/:id").post(protect,addComment);
router.route("/like/:id").post(protect,addLike);
router.route("/dislike/:id").post(protect,addDislike);



module.exports = router;