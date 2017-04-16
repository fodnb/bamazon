var table = require("console.table");
var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require("console.table");
var connection = mysql.createConnection({
    host: "localhost",
    password: "Buddy#13",
    port: "3306",
    user: "root",
    database: "bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connection at terminal:" + connection.threadId);

})



function switching() {

    var action = ['viewProductsForSale', 'viewLowInventory', 'addToInventory', 'addNewProduct', 'exit'];

    inquirer.prompt([{

        name: "toDo",
        message: "Please choose one",
        type: "rawlist",
        choices: action

    }]).then(function(ans) {
        var productsArray = [];
        connection.query("select * from products", function(error, response, fields) {
                // console.log(response);

                for (var i = 0; i < response.length; i++) {
                    productsArray.push(response[i].product_name);
                }
                // console.log(productsArray);


                switch (ans.toDo) {
                    case "viewProductsForSale":
                        saleValues = [];

                        function viewProducts() {
                            for (var i = 0; i < response.length; i++) {
                                saleValues.push([response[i].item_id, response[i].product_name, "$" + response[i].price, response[i].stock_quantity]);
                            } //ending for loop
                            console.table(["ID", "PRODUCT", "PRICE", "#IN STOCK"], saleValues);
                            switching();
                        } //ends viewProducts
                        viewProducts();

                        break;
                    case "viewLowInventory":
                        lowValues = [];

                        function lowInventory() {
                            console.log("");
                            console.log("");
                            console.log("THESE PRODUCTS ARE LOW ON INVENTORY YOU MAY WANT TO RE-STOCK:");
                            console.log("-------------------------------------------------------------");
                            console.log("");
                            for (var i = 0; i < response.length; i++) {

                                if (response[i].stock_quantity < 10) {
                                    lowValues.push([response[i].product_name, response[i].stock_quantity])
                                }
                            } //ending for loop for viewlowinventory
                            console.table(["Product Name", "Amount In Stock"], lowValues);
                            console.log("-------------------------------------------------------------")
                            console.log("");
                            console.log("");
                            switching();
                        } // ending lowInventory function
                        lowInventory();
                        break;


                    case "addToInventory":
                        function addingInventory() {
                            inquirer.prompt([{
                                name: 'addingInventory',
                                type: "input",
                                message: "what would you like to add inventory to?"
                            }, {
                                name: 'amount',
                                message: 'How many are you adding to your inventory',
                                type: 'input'


                            }]).then(function(ans) {
                                var values = [];
                                var inventory = ans.addingInventory;
                                inventory = inventory.toLowerCase();
                                connection.query('SELECT stock_quantity FROM products WHERE ?', {
                                    product_name: inventory
                                }, function(error, response, field) {
                                    var totalInventory = parseInt(ans.amount) + response[0].stock_quantity
                                    connection.query('Update products SET stock_quantity = ? WHERE Product_name = ?', [totalInventory, ans.addingInventory], function(error, response, field) {
                                        if (error) throw error;

                                        values.push([ans.addingInventory, totalInventory]);
                                        console.log("")
                                        console.table(["Product Name", "Now in Stock"], values);
                                        switching();
                                    }); // ends query
                                }); // ends first  query
                            }); // ends input statement in add to invenotry
                            // switching();
                        } // ends add  inventory function


                        addingInventory();

                        break;

                    case 'addNewProduct':
                        function addProduct() {
                            inquirer.prompt([{
                                name: 'name',
                                message: "Please Enter the products name.",
                                type: 'input'
                            }, {
                                name: 'department',
                                message: 'Please enter a department product belongs to.',
                                type: 'input'
                            }, {
                                name: 'price',
                                message: 'Please provide a price for the product.',
                                type: 'input'
                            }, {
                                name: 'stock',
                                message: 'How many units are you adding to stock.',
                                type: 'input'
                            }]).then(function(ans) {

                                connection.query('INSERT INTO products SET ?', {
                                    product_name: ans.name,
                                    department_name: ans.department,
                                    price: ans.price,
                                    stock_quantity: ans.stock

                                }, function(error, response, field) {
                                    if (error) throw error;
                                    console.table([{
                                        product_name: ans.name,
                                        department_name: ans.department,
                                        price: ans.price,
                                        stock_quantity: ans.stock

                                    }])
                                    switching();
                                })

                            });
                            // switching();
                        } // ends add product


                        addProduct();
                        break;
                    case "exit":
                        connection.end(function(err) {
                            // The connection is terminated now 
                        });
                        break;

                } // ending switch case
            }) //ends query
    }); // ends inquirer prompt for main function

}
switching();
