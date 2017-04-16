// need to npm init and add node_modules 
// need to npm install inquirer, mysql
// these are adding mysql/inquirer and a filesystem into my program for use
var mysql = require("mysql");
var inquirer = require("inquirer");
var fs = require("fs");
var table = require("console.table");
// This should get me connected to mysql
var connection = mysql.createConnection({
    host: "localhost",
    password: "Buddy#13",
    user: "root",
    port: "3306",
    database: "bamazon"
})

//this will open up a connection to mysql and confirm my connection.
connection.connect(function(err) {
    if (err) throw err;
    console.log("connection at terminal:" + connection.threadId);
    console.log("***********************************************");
})


// this will be filled with our possible product id's so our customer can pick one from the inquirer prompt
var options = [];
var Values = [];

// I'm pulling all my options from products and then console logging the results.
// next i'm filling my options array with the ids from the results so we have an array of all possible product id's
// next i'm asking the user to pick an id
// i'll use that id to pull up the information for the given product
// i'll ask the customer how many units of the product they would like to buy 
// then I'll check that number against my current available in stock
// if available we'll setup a bill to let the customer know their total & reduce stock by that amount of units
// if not available we'll log "insufficient available"



////////**************** Add the revenue from each transaction to the total_sales column for the related department.
// Make sure your app still updates the inventory listed in the products column.

connection.query("select * from products", function(error, results, fields) {
    // console.log(results);
    if (error) throw error;

    for (var i = 0; i < results.length; i++) {
        // console.log(results[i].product_name + " " + "$" + results[i].price);
        // options.push(results[i].product_name + " " + "$" + results[i].price);
        Values.push([results[i].product_name, "$" + results[i].price]);
    }


    console.table(["Product Name",
        "Price"
    ], Values);

    // console.log(options);
    function switching() {
        console.log("***********************************************");
        console.log("");
        console.log("Please enter product or hit enter twice to exit");
        console.log("");
        inquirer.prompt([{
            name: "selection",
            message: "What would like to purchase?",
            choice: options
        }, {
            name: "amount",
            message: "How many would you like?",
            type: "input"
        }]).then(function(ans) {
            console.log(ans);
            console.log(ans.selection);
            console.log(ans.amount);

            connection.query("select * from products Where ?", {
                product_name: ans.selection

            }, function(error, results, fields) {
                if (error) throw error;
                // console.log(results);
                // console.log(results[0].stock_quantity);
                if (results != "") {
                    // console.log(results);
                    var total = (ans.amount * results[0].price);
                    // console.log("$"+total);
                    // console.log(results[0].stock_quantity);
                    if (ans.amount <= results[0].stock_quantity) {
                        console.log("Your bill for " + ans.amount + " " + results[0].product_name + " = " + "$" + total);
                        var newQuantity = results[0].stock_quantity - ans.amount;
                        // console.log(newQuantity);
                        var salesTotal = total + results[0].product_sales;
                        connection.query("Update products SET stock_quantity = ?, product_sales = ? WHERE product_name = ?", [newQuantity, salesTotal, ans.selection], function(error, results, fields) {
                            if (error) throw error;
                            switching();
                        });




                    } else {
                        console.log("insufficient available");
                    }
                } else {
                    connection.end(function(err) {
                        // The connection is terminated now 
                    });
                }



            });


        }); // end then statement
    }
    switching();


}); //ends connection query

module.exports = connection;

//original way of query from above before adding product_sales;
// connection.query("Update products SET stock_quantity = ? WHERE item_id = ?", [newQuantity, ans.selection], function(error, results, fields){
// 			if(error) throw error;
// 		});
