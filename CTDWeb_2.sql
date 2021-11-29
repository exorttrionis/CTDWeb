create database CTDWeb;
use CTDWeb;

create table CTDProfile (
	id int auto_increment,
    avatar text,
	primary key(id),
    user_id int references auth_user(id)
);
create table task(
	id int auto_increment,
    task_title nvarchar(255),
    task_content text,
    priority int,
    deadline datetime,
    taskStatus int,
    user_create_id int, 
    primary key(id),
	foreign key(user_create_id) references auth_user(id)
);

create table fileList(
	id int auto_increment,
	task_id int, 
    foreign key(task_id) references task(id),
    file_path text,
	primary key(id)
);

