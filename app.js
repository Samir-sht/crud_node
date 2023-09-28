const { urlencoded } = require("express");
const express = require("express");
const { users } = require("./model/index");
const app = express();
const bcrypt = require("bcrypt");

app.set("view engine", "ejs");

//database connection

require("./model/index");

//parse form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//login
app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user_exist = await users.findAll({
    where: {
      email: email,
    },
  });
  if (user_exist.length > 0) {
    const is_match = bcrypt.compareSync(password, user_exist[0].password);

    if (is_match) {
      res.redirect("/index");
    } else {
      res.redirect("/");
    }
  } else {
    res.send("Invalid Email Or Password!!!");
  }
});

//register
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const user = req.body.user;
  const email = req.body.email;
  const password = req.body.password;

  //   console.log(user, email, password);
  if (!user || !email || !password) {
    return res.send("Please Fill Up the details");
  }

  await users.create({
    username: user,
    email: email,
    password: bcrypt.hashSync(password, 8),
  });

  res.redirect("/");
});

//index
app.get("/index", (req, res) => {
  res.render("index");
});

app.listen("5000", () => {
  console.log("Project is running at port 5000");
});
