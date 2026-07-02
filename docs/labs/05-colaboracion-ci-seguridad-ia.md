# Laboratorio 5: colaboración, CI, seguridad e IA

## Objetivo

Recorrer el ciclo de un cambio profesional: rama, pruebas, revisión, checks,
publicación de imágenes y uso responsable de asistentes.

## Explicación mínima

Este repositorio utiliza GitHub Flow:

```text
rama corta -> Pull Request -> CI -> revisión -> squash -> main
```

El pipeline realiza integración continua y publica imágenes después de integrar
en `main`. No despliega la aplicación y no implementa GitOps.

## Práctica

Crea una rama:

```bash
git switch main
git pull --ff-only
git switch -c docs/aclarar-concepto
```

Antes de confirmar un cambio:

```bash
git status
git diff

cd backend
npm ci
npm test
cd ..

kubectl kustomize k8s/overlays/local >/dev/null
kubectl kustomize k8s/overlays/playground >/dev/null
```

Revisa también:

- No hay credenciales ni datos reales.
- No hay nombres, correos, rutas locales o capturas sin anonimizar.
- Los comandos documentados coinciden con el código.
- Las afirmaciones generadas con IA se han contrastado.

Consulta [CONTRIBUTING.md](../../CONTRIBUTING.md) para completar la Pull
Request.

## Resultado esperado

La Pull Request muestra `CI / quality-gate` en verde y recibe al menos una
aprobación. Un merge a `main` publica imágenes para `amd64` y `arm64` en GHCR,
con tag de commit, SBOM y provenance.

## Comprobación

En GitHub, abre el detalle del quality gate e identifica:

- Pruebas de la API.
- Lint y enlaces de documentación.
- Validación de manifiestos.
- Build y escaneo de imágenes.
- Prueba de humo en Kind.
- Escaneo de secretos.

## Error frecuente

Un check verde no demuestra por sí solo que el cambio sea correcto. La CI
comprueba reglas conocidas; la revisión humana valida intención, riesgos y
claridad.

Tampoco copies código corporativo o información sensible en una herramienta de
IA no autorizada. Utiliza únicamente servicios homologados para la
clasificación de la información tratada.

## Reto opcional

Haz que una prueba falle de forma inocua, ejecuta `npm test`, estudia el mensaje
y restaura el cambio antes de crear el commit.

<details>
<summary>Qué demuestra el reto</summary>

Una buena prueba explica qué comportamiento se ha roto y permite corregirlo
antes de que el cambio llegue a revisión.

</details>

## Cierre

Revisa:

- [Seguridad](../referencia/seguridad.md).
- [Uso responsable de IA](../referencia/uso-responsable-ia.md).
- [Procedencia del material](../referencia/procedencia.md).
