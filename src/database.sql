create database JWT;
use JWT;
create table USerWT (
id int primary key auto_increment,
email varchar(20) not null unique,
pass varchar(20) not null

);