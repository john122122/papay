let memberController = module.exports;

memberController.home = (req, res) => {
    console.log("GET cont.home");
    res.send("You are in Home page");
};

memberController.singup = (req, res) => {
    console.log("POST cont.singup");
    res.send("You are in singup page");
};

memberController.login = (req, res) => {
    console.log("POST cont.login");
    res.send("You are in login page");
};

memberController.logout = (req, res) => {
    console.log("GET cont.logout");
    res.send("You are in logout page");
};