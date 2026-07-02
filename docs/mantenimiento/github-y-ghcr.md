# Mantenimiento de GitHub y GHCR

Este documento está dirigido a quienes administran el repositorio. No es
necesario para completar los laboratorios.

## Pipeline

El workflow `CI` se ejecuta en Pull Requests y pushes a `main`.

- Los jobs de documentación, backend, manifiestos, seguridad y runtime
  alimentan `CI / quality-gate`.
- Una Pull Request no puede integrarse si ese check falla.
- En un push a `main`, la publicación comienza después del quality gate.
- El pipeline publica backend y frontend para `linux/amd64` y `linux/arm64`.
- Cada imagen recibe `latest` y un tag con el SHA completo del commit.
- SBOM y provenance se adjuntan como attestations OCI.

No existe un job de despliegue. Publicar una imagen no modifica ningún clúster.

## Protección de `main`

La configuración esperada es:

- Una aprobación.
- Descartar aprobaciones al introducir cambios nuevos.
- Resolver conversaciones antes del merge.
- Requerir una rama actualizada y `CI / quality-gate`.
- Aplicar la regla también a administradores.
- Impedir force-push y borrado.
- Permitir únicamente squash merge.
- Eliminar la rama después del merge.

## Seguridad del repositorio

Deben permanecer activos:

- Dependabot alerts y security updates.
- Secret scanning.
- Push protection.
- Private vulnerability reporting.

El escaneo automático complementa el checklist de privacidad; no reconoce todo
tipo de dato personal o información interna.

## Paquetes

Los paquetes `demo-backend` y `demo-frontend` deben:

- Estar vinculados a este repositorio.
- Ser públicos para que el playground no necesite credenciales.
- Heredar permisos del repositorio cuando la política de la organización lo
  permita.

Verificación sin autenticación:

```bash
docker buildx imagetools inspect \
  ghcr.io/mapfre-gitops-9/demo-backend:latest
docker buildx imagetools inspect \
  ghcr.io/mapfre-gitops-9/demo-frontend:latest
```

## Actualizaciones

Dependabot agrupa actualizaciones de npm, imágenes base y GitHub Actions. Las
acciones se fijan por SHA completo; el comentario asociado conserva la versión
legible para facilitar la revisión.

Antes de aceptar una actualización:

1. Lee sus notas y cambios incompatibles.
2. Comprueba el origen del nuevo SHA o digest.
3. Espera al quality gate.
4. Revisa el resultado multi-arquitectura y las attestations publicadas.
