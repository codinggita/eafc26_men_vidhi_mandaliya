# EAFC 26 Player Analytics - Folder Structure

The project conforms to standard MVC (Model-View-Controller) layers.

```text
backend/
├── app.js               # Main Express application initialization and middleware setups
├── server.js            # App listener and MongoDB connections entrypoint
├── package.json         # Metadata and NPM packages manifest
├── .env.example         # Template for environment credentials
├── docs/                # Project API and folder structure documentation
├── postman/             # Postman Collection JSON exports
└── src/
    ├── config/          # Configurations for database, jwt keys, and sort constants
    ├── controllers/     # Request validation parsing and payload dispatcher controllers
    ├── middlewares/     # JWT authorization, timing trackers, loggers, error exception formats
    ├── models/          # Mongoose schema setups for Player and User documents
    ├── routes/          # Express route bindings separating auth, players, stats, and admins
    ├── seed/            # Seed data JSON templates and Python automation script triggers
    ├── services/        # Services layers holding database aggregation routines and operations
    ├── utils/           # Shared utility classes: CustomError, ApiResponse format, query formatting
    └── validators/      # Joi schema validator lists for body and query elements
```
