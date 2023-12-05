CREATE DATABASE jober_pre_task CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE jober_pre_task;

DROP TABLE IF EXISTS profile_card;
DROP TABLE IF EXISTS career_field;
DROP TABLE IF EXISTS profile_field;

CREATE TABLE profile_card (
    id int auto_increment primary key,
    name varchar(100) not null,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    updated_at timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    deleted_at timestamp null
);


CREATE TABLE career_field (
    profile_id int,
    item_index int auto_increment primary key,
    company_name varchar(100),
    role varchar(100),
    start_date date,
    end_date date,
    updated_at timestamp default current_timestamp not null on update current_timestamp,
    foreign key (profile_id) references profile_card(id)
);

CREATE TABLE profile_field (
    profile_id int,
    item_index int auto_increment primary key,
    field_key varchar(100),
    field_value varchar(100),
    field_type varchar(100) default 'text',
    field_label varchar(100),
    updated_at timestamp default current_timestamp not null on update current_timestamp,
    foreign key (profile_id) references profile_card(id)
);

