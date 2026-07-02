# Laboratorio 2: construcción de imágenes

## Objetivo

Construir imágenes reproducibles, inspeccionar sus capas y comprobar que los
procesos no se ejecutan como `root`.

## Explicación mínima

Un Dockerfile crea una imagen inmutable. Al ejecutar esa imagen se obtiene un
contenedor. Los cambios hechos dentro de un contenedor no modifican la imagen
original.

Este proyecto:

- Fija las dependencias Node.js con `package-lock.json`.
- Usa `npm ci` para reproducir exactamente ese árbol.
- Copia primero los archivos de dependencias para aprovechar la caché.
- Ejecuta Node.js y Nginx con usuarios no privilegiados.
- Excluye archivos innecesarios mediante `.dockerignore`.

## Práctica

Construye ambas imágenes:

```bash
docker build -t demo-kind-backend:local ./backend
docker build -t demo-kind-frontend:local ./frontend
```

Inspecciona el usuario configurado:

```bash
docker image inspect demo-kind-backend:local \
  --format 'backend: {{json .Config.User}}'
docker image inspect demo-kind-frontend:local \
  --format 'frontend: {{json .Config.User}}'
```

Ejecuta la API de forma aislada:

```bash
docker run --rm --publish 3000:3000 demo-kind-backend:local
```

Desde otro terminal:

```bash
curl "http://localhost:3000/api/saludo?alias=contenedor"
```

## Resultado esperado

- El backend utiliza el usuario `node`.
- El frontend utiliza un UID no privilegiado.
- La API responde en el puerto `3000`.
- `npm audit` no encuentra vulnerabilidades altas o críticas conocidas.

## Comprobación

```bash
docker run --rm --entrypoint id demo-kind-backend:local
docker run --rm --entrypoint id demo-kind-frontend:local
```

Ninguna salida debe mostrar `uid=0`.

## Error frecuente

Si Docker reutiliza una capa antigua después de modificar dependencias,
reconstruye mostrando el progreso:

```bash
docker build --progress=plain -t demo-kind-backend:local ./backend
```

No uses `--no-cache` como primera opción: la caché es parte del funcionamiento
normal de un build eficiente.

## Reto opcional

Modifica un texto del frontend, reconstruye solo esa imagen y compara qué capas
se reutilizan.

<details>
<summary>Solución orientativa</summary>

```bash
docker build --progress=plain -t demo-kind-frontend:local ./frontend
kind load docker-image demo-kind-frontend:local --name demo-kind
kubectl rollout restart deployment/frontend --namespace demo-kind
```

El cambio local no llega a los pods existentes hasta cargar la nueva imagen y
crear pods nuevos.

</details>
