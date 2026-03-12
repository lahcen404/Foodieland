# Cuisine Frontend

Frontend Angular de l'application Cuisine.

## Development

```bash
npm install
npm start
```

L'application Angular est servie par defaut sur `http://localhost:4200`.

## Docker

Depuis la racine du projet :

```bash
docker compose up --build
```

Services exposes :

- Frontend : `http://localhost:4201`
- API Laravel : `http://localhost:8080`
- PgAdmin : `http://localhost:5051`
