## Magical Arena Game CLI Application

This is a Command Line Interface (CLI) based Fight Game application implemented in TypeScript and Node.js. The application allows users to simulate fights between different players. It is designed to be loosely coupled, making it easy to extend with various storage layers (such as databases) or interface layers (such as web-based interfaces) in the future.


## Table of Contents

- Prerequisites
- Installation
- Usage
- Project Structure
- Interfaces
- In-memory Implementation
- Error Handling
- SnapShots
- Future Enhancements
- License


## Prerequisites

Before you begin, ensure you have the following prerequisites installed on your machine:

- Node.js  
- TypeScript


## Installation

-   Clone the repository : git clone repo_link
-   Navigate to the project directory :

        cd Swiggy_Assignment

-   Install dependencies 

        npm i


## Usage 

-   To build the application

        npm run build

-   To start the application, run :

        npm run start

Follow the on-screen instructions to interact with the CLI and simulate fights between players.


## Project Structure
The project is structured as follows :

-   src
    - config
        - constant.ts
        - main.config.ts
    - error
        - illegal.argument.error.ts
        - illegal.state.error.ts
        - resource.absent.error.ts
    - models
        - player.model.ts
    - repository
        - implementation
            - in.memory.player.repository.impl.ts
        - player.repository.ts
    - service
        - implementation
            - game.state.impl.ts
        - game.state.ts
    - ui
        - cli
            - cli.controller.ts
        - controller.ts
    - main.ts
    -   .gitignore
    -   package.json
    -   tsconfig.json
    -   README.md


-   src/model : Contains the Player model.
-   src/error : Contains error handling.
-   src/service : Includes the GameService and GameState Implementation.
-   src/repository : Include InMemoryService implementations.
-   src/main.ts: Initializes and starts the application.


## Interfaces

-   GameState Entity

![Alt text](image-1.png)
        
-   PlayerRepository Entity

![Alt text](image.png)


## In-memory Implementation

The application currently uses an in-memory implementation of the GameState interface. To switch to a different implementation (e.g., a database), create a new service class that implements the GameState interface.


## Error Handling

All errors and exceptions are properly handled to ensure a smooth user experience. Any unexpected behavior is logged for debugging purposes.



## SnapShots

![Alt text](image-2.png)

![Alt text](image-3.png)

![Alt text](image-4.png)

![Alt text](image-5.png)

![Alt text](image-6.png)

![Alt text](image-7.png)


## Future Enhancements

-   This application is designed to be easily extensible. Future enhancements could include:

-   Implementing different storage layers (e.g., a database).

-   Adding a web-based interface for a more user-friendly experience.


## License

This project is licensed under the MIT License - see the LICENSE file for details.
# Arena
