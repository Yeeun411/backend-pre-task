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
    item_index int auto_increment,
    company_name varchar(100),
    role varchar(100),
    start_date date,
    end_date date,
    updated_at timestamp default current_timestamp not null on update current_timestamp,
    primary key (profile_id, item_index),
    foreign key (profile_id) references profile_card(id)
);

CREATE TABLE profile_field (
    profile_id int,
    item_index int,
    field_key varchar(100),
    field_value text,
    field_type enum('text', 'phone', 'email', 'date'),
    updated_at timestamp default current_timestamp not null on update current_timestamp,
    primary key (profile_id, field_key),
    foreign key (profile_id) references profile_card(id)
);

