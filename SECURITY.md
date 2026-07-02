# Política de seguridad

## Informar de una vulnerabilidad

No abras una issue pública para comunicar una vulnerabilidad, una credencial
expuesta o información sensible.

Utiliza el formulario privado **Report a vulnerability** de la pestaña
**Security** del repositorio. En un entorno corporativo, sigue además el canal
de notificación y respuesta a incidentes establecido por la organización.

Incluye únicamente la información necesaria para reproducir el problema. No
adjuntes credenciales reales, datos personales ni información de producción.

## Si se ha publicado un secreto

1. Revoca o rota la credencial inmediatamente.
2. Notifica el incidente por el canal corporativo correspondiente.
3. Conserva la información necesaria para investigar alcance y accesos.
4. Coordina cualquier limpieza del historial con responsables del repositorio
   y seguridad.

Borrar el secreto en un commit posterior no lo invalida. Reescribir el
historial tampoco sustituye la rotación y puede destruir evidencias o afectar a
otros clones.

## Alcance

La aplicación es una maqueta formativa. No debe recibir datos reales ni
utilizarse como base directa para cargas de producción.
