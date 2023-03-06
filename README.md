# BACKEND-NODE-POSTGRES-COCKTAILS

Este es el back-end del sistema de COCKTAILS.

## Contenido

Back-End controlador de usuraio y notocias.
El proyecto esta realizado en:

-   [Node.js](https://nodejs.org/es/)
-   [express.js](https://expressjs.com/es/)
-   [PostgreSQL](https://www.postgresql.org/)

## Como Clonar

Comando para clonar:

```bash
cd existing_folder
git clone [LINK DEL REPOSITORIO]

```

## Intalación

Ya clonado el proyecto es necesario instalar todas las dependencias con el comando:

```bash
yarn
```

Cuando instalemos las dependencias usaremos el docker-compose.yml para levantar nuestra base de datos:

```bash
docker-compose up
```

Habiendo terminado lo anterior solo tendríamos que usar:

```bash
yarn start
```

Y justo después para correr las seeders:
```bash
yarn sequelize-cli db:seed:all
```


HAPPY HACKING!
