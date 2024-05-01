# Pet Management API Documentation

## Add a Pet

Add a new pet to the system.

- **URL**: `/api/pets/add`
- **Method**: `POST`
- **Authentication Required**: Yes
- **Request Body**:
  - `petName` (string, required): The name of the pet.
  - `petDescription` (string, required): Description of the pet.
  - `price` (number, required): Price of the pet.
  - `isFree` (boolean, optional): Indicates if the pet is free.
  - `petType` (string, required): Type of the pet (e.g., dog, cat).
  - `petBreed` (string, required): Breed of the pet.
  - `diseases` (string[], optional): Array of diseases the pet may have.
  - `petImages` (file[], required): Array of image files of the pet.

## Get All Pets

Retrieve a list of all pets from the system.

- **URL**: `/api/pets/getDetails/all`
- **Method**: `GET`
- **Authentication Required**: No

## Get Pet by ID

Retrieve details of a specific pet by its ID.

- **URL**: `/api/pets/getDetails/:id`
- **Method**: `GET`
- **Authentication Required**: No
- **URL Parameters**:
  - `id` (string, required): ID of the pet to retrieve.

## Update Pet Details

Update details of an existing pet.

- **URL**: `/api/pets/update/:id`
- **Method**: `PATCH`
- **Authentication Required**: Yes
- **URL Parameters**:
  - `id` (string, required): ID of the pet to update.
- **Request Body**:
  - `petName` (string, required): The updated name of the pet.
  - `petDescription` (string, required): Updated description of the pet.
  - `price` (number, required): Updated price of the pet.
  - `isFree` (boolean, optional): Updated status indicating if the pet is free.
  - `petType` (string, required): Updated type of the pet.
  - `petBreed` (string, required): Updated breed of the pet.
  - `diseases` (string[], optional): Updated array of diseases the pet may have.
  - `petImages` (file[], optional): Updated array of image files of the pet.

## Delete Pet

Delete a pet from the system.

- **URL**: `/api/pets/delete/:id`
- **Method**: `DELETE`
- **Authentication Required**: Yes
- **URL Parameters**:
  - `id` (string, required): ID of the pet to delete.
