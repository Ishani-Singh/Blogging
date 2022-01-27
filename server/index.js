const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//Routes//

//create a blog

app.post("/blog", async(req,res) => {
    try {
      const {description} = req.body;
      const newBlogs = await pool.query(
          "INSERT INTO blogs (description) VALUES($1) RETURNING *", 
          [description]
       );

         res.json(newBlogs.rows[0]);
       } catch (err) {
       console.error(err.message); 
    }
});

//get all blogs

app.get("/blog", async(req, res) => {
  try {
     const allblogs = await pool.query("SELECT * FROM blogs");
     res.json(allblogs.rows);
  } catch (err) {
    console.error(err.message); 
  }
});

//get a blog

app.get("/blog/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const blogs = await pool.query("SELECT * FROM blogs WHERE blog_id = $1",[id]);
        res.json(blogs.rows[0]);
    } catch (err) {
        console.error(err.message); 
    }
});




//update a blog

app.put("/blog/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateblog = await pool.query("UPDATE blogs SET description = $1 WHERE blog_id = $2",
        [description, id]
        );


        res.json("Blog was Updated!");
    } catch (err) {
        console.error(err.message);
    }
});

//delete a blog

app.delete("/blog/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteblog = await pool.query("DELETE FROM blogs WHERE blog_id = $1", [
            id
        ]);
        res.json("Blog was Deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("server has started at port 5000");
});