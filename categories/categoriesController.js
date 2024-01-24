const express = require("express");
const router = express.Router();
const category = require("./category");
const slugify = require("slugify");

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new.ejs")
});

router.post("/categories/save", (req, res) => {
    var title = req.body.title;
    if (title != undefined) {
        category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/");
        })
    } else {
        res.redirect("/")
    }
});

router.get("/", (req, res) => {
    category.findAll().then(categories => {
        res.render("admin/categories/index.ejs", { categories: categories });
    });
});

router.post("/categories/delete", (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/");
            })
        }
        else {
            res.redirect("/");
        }
    }
    else {
        res.redirect("/");
    }
});

router.get("/admin/categories/edit/:id", (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) {
        res.redirect("/")
    }
    category.findByPk(id).then(category => {
        if (category != undefined) {
            res.render("admin/categories/edit.ejs", { category: category });
        }
        else {
            res.redirect("/");
        }
    }).catch((error) => {
        res.redirect("/")
    })
});

router.post("/categories/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    category.update({ title: title, slug: slugify(title) }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/");
    })
})

module.exports = router;