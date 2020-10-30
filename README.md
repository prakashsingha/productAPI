# Product API Server

This is the product API. It provides RESTful operation for warehouse inventories.

## Overview

- API version: 1.0.0-oas3
- Build date: 2020-10-29T06:22:46.380Z[GMT]

## API Endpoints

Please follow the following URL to get the full structure of the API.

[OAS Documentation](https://app.swaggerhub.com/apis-docs/prakashsingha/inventoryAPI/1.0.0)

## Data Structure

- Database: MongoDB
- Name: productAPI
  - Collections:
    - warehouses
    - products
    - users
    - tokenblacklists

## Assumptions

- Models are validated before adding/updating the collection.

## Configuration

- create a .env file on the root folder.
- Copy the following values to the .env file or change the values as per your need.

  ```
  #Db
  DB_HOST=localhost
  DB_PORT=27017
  DB=productAPI

  #Node
  PORT=4000
  NODE_ENV=development

  #Token
  SECRET=m%Go"@?9j72I-vLnyous^:dAtQ3J7Fl^@YD6bW?B@8m:Q3s[jvy6;/GPR7+2,=Y
  ALGORITHM=HS256
  ISSUER=INVENTORY_APP
  EXPIRY=1h

  #API
  API_VERSION=v1
  ```

- Install the dependencies
  ```
  npm install
  ```

## Running the server

To run the server, run the following command:

```
npm start

```
