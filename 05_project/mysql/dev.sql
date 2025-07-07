show databases;
# dev db 사용
use dev;
show tables;
insert into customers(id , name , email , phone, address)
values(1, 'Jonhn Doe','john@yedam.ac','010-2222-3333','');
select * from customers;
insert into customers(id , name , email , phone, address)
values(2, 'Jonhn cena','js@yedam.ac','010-1234-4567','');
insert into customers(id , name , email , phone, address)
values(3, 'ssh','ssh@yedam.ac','010-4211-0283','');
commit;
select id, name, email, phone from customers;
select count(*) from customers;


-- product -- category -- image
select * from t_product;
select * from t_category;
select * from t_seller;
select * from t_image;
desc t_image;
insert into t_seller(name , email , phone)
values('seller01' , 'seller01@yedam.ac','010-2222-3333');
insert into t_category(category1 , category2 ,category3)
values('컴퓨터','주요부품','메모리');
insert into t_category(category1 , category2 ,category3)
values('컴퓨터','주요부품','메인보드');
insert into t_category(category1 , category2 ,category3)
values('컴퓨터','주요부품','마우스');
insert into t_category(category1 , category2 ,category3)
values('컴퓨터','주요부품','모니터');
insert into t_product (product_name , product_price , delivery_price , seller_id , category_id)
values('LG마우스' , 15000 , 3500 , 1 , 3);
insert into t_product (product_name , product_price , delivery_price , seller_id , category_id)
values('LOGITECH마우스' , 150000 , 3500 , 1 , 3);

insert into t_image(product_id , type , path)
values(2 , 1 , 'upload/2/thumbnail.jpg');
insert into t_image(product_id , type , path)
values(3 , 1 , 'upload/3/thumbnail2.jpg');
-- delete from t_product
-- where id = 2;
select concat(c.category1, '/' , c.category2 , '/' , c.category3) as category,
p.id,
p.product_name,
p.delivery_price,
i.*
from  t_product p join t_category c
on (p.category_id = c.id )
join t_image i 
on (p.id = i.product_id)
and i.type = 1
where p.product_name = 'LG마우스';

select t1.*,
t2.path,
t3.category1,
t3.category2,
t3.category3
from t_product t1, t_image t2, t_category t3
where t1.id = 4 and t1.id =t2.product_id and t2.type = 1 and t1.category_id = t3.id;

select * from t_user;