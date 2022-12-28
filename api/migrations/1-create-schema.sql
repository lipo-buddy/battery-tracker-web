-- Create a schema to hold all the API tables.
create schema if not exists api;

-- Add extension to generate UUIDs
create extension if not exists "uuid-ossp";