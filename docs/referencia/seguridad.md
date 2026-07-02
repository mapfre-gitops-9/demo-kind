# Seguridad y prevención de fugas

## Antes de confirmar cambios

Revisa `git status`, `git diff` y los archivos nuevos. No dependas únicamente
de `.gitignore`: un archivo se puede añadir de forma forzada o haber sido
versionado antes.

No publiques:

- Contraseñas, tokens, claves privadas o certificados.
- `.env`, kubeconfigs o configuraciones con credenciales.
- Nombres, correos, identificadores o datos reales de prueba.
- Dominios internos, inventarios, direccionamiento o arquitectura innecesaria.
- Transcripciones, capturas o logs sin anonimizar.

Utiliza datos sintéticos y alias claramente ficticios.

## Variables, ConfigMaps y Secrets

Las variables de entorno separan configuración y código, pero no convierten un
valor en secreto.

- ConfigMap es para configuración no confidencial.
- Secret reduce exposiciones accidentales, pero sus valores se codifican en
  base64 y se almacenan sin cifrar en etcd por defecto.
- Un entorno real necesita cifrado en reposo, RBAC mínimo y, habitualmente, un
  gestor externo de secretos.

Fuente:
[buenas prácticas para Secrets](https://kubernetes.io/docs/concepts/security/secrets-good-practices/).

## Imágenes y dependencias

- Utiliza runtimes con soporte activo.
- Conserva lockfiles y construye con comandos reproducibles.
- Ejecuta contenedores sin privilegios y con filesystem de solo lectura cuando
  sea viable.
- Escanea dependencias e imágenes, pero revisa también origen y mantenimiento.
- En producción, promociona digests inmutables; `latest` es una simplificación
  explícita del playground.

## Si aparece una credencial

1. Revócala o rótala inmediatamente.
2. Notifica por el canal corporativo de incidentes.
3. Revisa alcance, uso y registros de acceso.
4. Preserva las evidencias necesarias.
5. Limpia el historial solo de forma coordinada.

Un commit que borra el texto no invalida la credencial. Un force-push tampoco
la elimina de clones, caches o logs.

## Controles de este repositorio

- Secret scanning y push protection de GitHub.
- Escaneo de secretos en CI.
- Auditoría de dependencias e imágenes.
- Revisión obligatoria y quality gate.
- Checklist manual de privacidad, porque una herramienta no puede reconocer
  de forma fiable todos los nombres o datos internos.
