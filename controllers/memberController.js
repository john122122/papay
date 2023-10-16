let memberController = module.exports;

memberController.singup = (req, res) => {
    try {
      console.log('POST: cont/singup');
      const data = req.body;
      console.log('body:::', req.body);

      res.send('done');
    } catch (err) {
        console.log(`ERROR, cont/singup`);
    }
};

memberController.login = (req, res) => {
    console.log("POST cont.login");
    res.send("You are in login page");
};

memberController.logout = (req, res) => {
    console.log("GET cont.logout");
    res.send("You are in logout page");
};
