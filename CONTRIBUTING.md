# Cómo contribuir

Este repositorio utiliza **GitHub Flow**: ramas de vida corta, Pull Request,
validación automática, revisión y merge a `main`.

No es Git Flow. Git Flow introduce ramas permanentes adicionales como
`develop` y `release`; aquí no son necesarias.

## Flujo de trabajo

1. Actualiza `main` y crea una rama descriptiva:

```bash
git switch main
git pull --ff-only
git switch -c feature/descripcion-breve
```

1. Realiza cambios pequeños y comprueba el diff:

```bash
git status
git diff
```

1. Ejecuta las validaciones relacionadas:

```bash
cd backend
npm ci
npm test
cd ..

kubectl kustomize k8s/overlays/local >/dev/null
kubectl kustomize k8s/overlays/playground >/dev/null
```

1. Crea commits que expliquen la intención:

```bash
git add --patch
git commit -m "docs: aclara el acceso local con Kind"
git push --set-upstream origin feature/descripcion-breve
```

1. Abre una Pull Request. El check `CI / quality-gate` y una aprobación son
   obligatorios.
1. Resuelve las conversaciones y utiliza **Squash and merge**.

## Antes de solicitar revisión

- El cambio tiene un objetivo único y comprensible.
- Las pruebas nuevas cubren el comportamiento añadido.
- La documentación y los comandos coinciden con el código.
- No hay credenciales, nombres, correos, identificadores personales, datos
  reales ni detalles internos.
- Las capturas y salidas de terminal están anonimizadas.
- Las imágenes y dependencias nuevas tienen un origen justificable.
- El contenido generado con IA ha sido comprobado contra código, pruebas o
  documentación primaria.

## Cómo revisar

Una revisión debe centrarse en comportamiento, seguridad, mantenibilidad y
claridad didáctica. Distingue entre:

- **Bloqueante:** error, riesgo o requisito incumplido.
- **Sugerencia:** mejora útil que no impide integrar.
- **Pregunta:** contexto que falta para comprender una decisión.

La revisión pertenece al equipo. No se utiliza para evaluar a una persona.
