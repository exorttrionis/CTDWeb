create database CTDWeb;
use CTDWeb;
create table Task (
	id int auto_increment,
    author nvarchar(255),
    title text,
    content longtext,
    deadline datetime,
    id_task nvarchar(255),
    id_check nvarchar(255),
    id_title nvarchar(255),
    id_deadline nvarchar(255),
    task_status int,
    primary key(id)
);
create table task_file(
	id int auto_increment,
    task_id int,
    url text,
    primary key(id),
    foreign key (task_id) references Task(id)
);
create table user_extend(
	user_id int,
	dob datetime,
    username nvarchar(255),
    avatar text,
    foreign key (user_id) references auth_user(id)
)
alter table Task add id_content nvarchar(255);

