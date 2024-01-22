# Melp Restaurant API 🍔🍕🍣

Welcome to the Restaurant API documentation! This API allows you to manage restaurant data, perform CRUD operations, and even calculate statistics based on location. 🎉

## Getting Started 🚀

To start a project using this API, make sure you have the following prerequisites installed:

1. PostgreSQL (psql) 🐘
2. PostGIS Extension 🗺️

You can install the PostGIS extension as follows (Linux/Ubuntu):

```bash
sudo apt-get update
sudo apt-get install postgis postgresql-16-postgis-3
```

macOS:

```bash
brew install postgis
```

Once you have the prerequisites installed, you can clone this repository and install the dependencies:

```bash
npm install
```

To start the server, run the following command:

```bash
npm run start
```

To execute the migrations, run the following command:

```bash
npm run migrate
```

To execute the seeders, run the following command:

```bash
npm run seed
```

## Endpoints 🌐

1. **GET Restaurant by ID**

   -  Get restaurant details by providing its unique ID.
   -  **Endpoint:** `/api/restaurants/:id`
   -  **Method:** GET

2. **GET All Restaurants**

   -  Get a list of all restaurants.
   -  **Endpoint:** `/api/restaurants`
   -  **Method:** GET

3. **Get Statistics**

   -  Calculate restaurant statistics based on location (latitude, longitude, and radius).
   -  **Endpoint:** `/api/restaurants/statistics`
   -  **Method:** GET
   -  **Query Parameters:**
      -  `latitude` (required) - Latitude coordinate.
      -  `longitude` (required) - Longitude coordinate.
      -  `radius` (required) - Radius in meters.
   -  **Example Response:**
      The response includes the following statistical data:
      -  Total number of restaurants within the specified area.
      -  Average rating of the restaurants.
      -  Standard deviation of the ratings.

   ```json
   {
      "count": 3,
      "avg": 2.3333333333333335,
      "std": 1.5275252316519465
   }
   ```

4. **Create Restaurant**

   -  Create a new restaurant entry.
   -  **Endpoint:** `/api/restaurants`
   -  **Method:** POST
   -  **Request Body:**
      The request body must include the following required fields:
      -  `name` (string, required) - The name of the restaurant.
      -  `rating` (integer, required) - The rating of the restaurant (between 0 and 4).
      -  `latitude` (float, required) - The latitude coordinate of the restaurant's location.
      -  `longitude` (float, required) - The longitude coordinate of the restaurant's location.
      ```json
      {
         "rating": 1,
         "name": "Restaurant D",
         "site": "www.restaurant-d.com",
         "email": "info@restaurant-d.com",
         "phone": "555-4321",
         "street": "101 Pine St",
         "city": "Newtown",
         "state": "Newstate",
         "lat": 21.008455037397916,
         "lng": -101.8662578866248
      }
      ```

5. **Patch Restaurant**

   -  Update specific fields of an existing restaurant.
   -  **Endpoint:** `/api/restaurants/:id`
   -  **Method:** PATCH
   -  **Request Body:** (Fields to update)

6. **Delete Restaurant**
   -  Delete a restaurant by its ID.
   -  **Endpoint:** `/api/restaurants/:id`
   -  **Method:** DELETE
