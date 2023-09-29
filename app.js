const { urlencoded } = require("express");
const express = require("express");
const { users } = require("./model/index");
const { infos } = require("./model/index");
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

//add post
app.post("/create", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const number = req.body.number;

  //   console.log(user, email, password);
  if (!name || !email || !number) {
    return res.send("Please Fill Up the details");
  }

  console.log(name, email, number);

  await infos.create({
    name: name,
    email: email,
    phone_number: number,
  });

  res.redirect("/index");
});

//index
app.get("/index", async (req, res) => {
  const info = await infos.findAll();

  res.render("index", { info: info });
});

//delete
app.get("/delete/:id", async (req, res) => {
  const ids = req.params.id;

  await infos.destroy({
    where: {
      id: ids,
    },
  });

  res.redirect("/index");
});

//edit
app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;

  const info = await infos.findAll({
    where: {
      id: id,
    },
  });
  res.render("index", { info: info });
});

app.listen("5000", () => {
  console.log("Project is running at port 5000");
});
