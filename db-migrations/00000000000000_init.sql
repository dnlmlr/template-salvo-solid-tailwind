PRAGMA foreign_keys=1;

-- User
create table if not exists user (
    id integer primary key autoincrement, 
    username text not null unique, 
    hashed_password text, 
    email text not null, 
    name text not null 
);
