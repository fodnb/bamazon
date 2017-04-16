
create table products (
item_id int(11) auto_increment not null,
product_name varchar(128) not null,
department_name varchar(128)not null,
price decimal(5,2)not null,
stock_quantity int(11) not null,
primary key(item_id)
);

alter table products add product_sales dec(8,3) after stock_quantity;

insert into products (product_name, department_name, price, stock_quantity)
Values ("gatorade", "drinks", 1.99, 10);
	
select * from products;
insert into products (product_name, department_name, price, stock_quantity)
Values ("Water", "drinks", 1.00, 50);

insert into products (product_name, department_name, price, stock_quantity)
Values ("REDBULL", "drinks", 2.99, 20);

insert into products (product_name, department_name, price, stock_quantity)
Values ("banana", "fruit", .33, 150);

insert into products (product_name, department_name, price, stock_quantity)
Values ("apple", "fruit", .49, 10);

insert into products (product_name, department_name, price, stock_quantity)
Values ("orange", "fruit", .70, 15);

insert into products (product_name, department_name, price, stock_quantity)
Values ("chips", "snacks", .79, 10);

insert into products (product_name, department_name, price, stock_quantity)
Values ("cookies", "snacks", .99, 14);

insert into products (product_name, department_name, price, stock_quantity)
Values ("cupcakes", "snacks", 1.99, 41);


insert into products (product_name, department_name, price, stock_quantity)
Values ("gum", "candy", .25, 100);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
create table departments (
department_id int(11)auto_increment not null,
department_name varchar(128)not null,
over_head_costs decimal(6,2)not null,
total_sales dec(6,2)not null,
primary key(department_id)
);


