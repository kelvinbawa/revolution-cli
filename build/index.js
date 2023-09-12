#!/usr/bin/env node
import figlet from "figlet";
import gradient from "gradient-string";
import { questionInit } from "./questions.js";
figlet("Counter", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    }
    console.log(gradient("cyan", "pink")(data));
    questionInit();
});
