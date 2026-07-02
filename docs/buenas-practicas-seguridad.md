# Guía de Buenas Prácticas de Seguridad y Prevención de Fugas de Información

En el desarrollo de software y en la administración de plataformas (como Kubernetes u OpenShift), la fuga de credenciales o información corporativa es un **enemigo silencioso**. Ocurre principalmente por la inercia del día a día —el ciclo ininterrumpido de *commit*, *push*, *commit*, *push* (BAU: *Business As Usual*)— donde un descuido de un segundo al guardar un archivo de configuración temporal puede transformarse en un incidente de seguridad grave.

Esta guía tiene como objetivo concienciar a las nuevas generaciones de desarrolladores y administradores sobre cómo proteger la información y qué medidas tomar en el desarrollo diario.

---

## 1. ¿Dónde se esconde el peligro?

Los elementos más comunes que suelen filtrarse por accidente en repositorios públicos son:

*   **Secretos de Infraestructura:** Contraseñas de bases de datos, tokens de API, certificados TLS, claves privadas SSH y credenciales de registros de imágenes.
*   **Archivos de Configuración Local:** Ficheros `.env`, archivos `kubeconfig` con credenciales de acceso a clústeres, o configuraciones de herramientas locales con tokens integrados.
*   **Información de Red Externa:** IPs públicas de servidores de la compañía, nombres de dominio internos (intranet) o esquemas de direccionamiento de producción.
*   **Datos de Prueba Sensibles:** Volcados de bases de datos de producción con datos personales reales (nombres, correos, documentos de identidad). **Los datos de prueba siempre deben ser mockeados o anonimizados.**

---

## 2. Pautas de Prevención en el Flujo Diario

Para evitar que la inercia del trabajo provoque descuidos, adopta estos hábitos en tu equipo:

### A. El `.gitignore` como Primera Línea de Defensa
Antes de escribir la primera línea de código de un proyecto, configura el archivo `.gitignore`. 
*   Asegúrate de excluir patrones comunes como `*.env`, `secrets/`, `*.pem`, `*.key`, `credentials.*` o carpetas temporales de dependencias (`node_modules/`, `vendor/`).

### B. Uso Estricto de Variables de Entorno
*   NUNCA escribas una contraseña o token directamente en el código fuente (práctica conocida como *hardcoding*).
*   Utiliza variables de entorno para inyectar configuraciones dinámicas. En entornos de desarrollo, lee estas variables desde un archivo `.env` local (añadido al `.gitignore`).
*   En Kubernetes u OpenShift, inyecta estas variables utilizando recursos nativos de almacenamiento seguro como **Secrets** y **ConfigMaps**.

### C. Revisa tus Cambios antes de Confirmar (`git diff`)
*   No uses comandos genéricos como `git commit -am "cambios"` de forma automática.
*   Acostúmbrate a ejecutar `git diff` o `git status` antes de hacer un commit para auditar exactamente qué líneas de código estás añadiendo y asegurarte de que no se ha colado ningún texto temporal con claves o IPs reales.

### D. Herramientas de Escaneo Automático
Existen herramientas de código abierto que puedes integrar localmente (o en tu pipeline de CI) para bloquear commits que contengan patrones parecidos a claves privadas o contraseñas:
*   **[Gitleaks](https://github.com/gitleaks/gitleaks):** Analiza el historial de Git buscando secretos.
*   **[TruffleHog](https://github.com/trufflesecurity/trufflehog):** Escanea repositorios en busca de credenciales expuestas de forma activa.
*   **GitHub Secret Scanning:** Los repositorios públicos en GitHub escanean automáticamente los pushes y notifican de inmediato si detectan tokens conocidos (AWS, GitHub, Slack, etc.).

---

## 3. ¿Qué hacer si se filtra un secreto? (Plan de Contingencia)

Si descubres que has subido una contraseña o secreto en un commit y ya has hecho *push* al repositorio público:

> [!IMPORTANT]
> **Hacer un nuevo commit borrando el archivo o la contraseña NO soluciona el problema.**
> Cualquier persona puede acceder al historial de confirmaciones de Git y ver el código tal como estaba en el commit anterior donde la contraseña aún era visible.

### Protocolo de Actuación:
1.  **Rotación Inmediata (Prioridad 1):** Cambia o invalida la credencial expuesta inmediatamente en el servicio afectado (ej. cambia la contraseña de la base de datos, revoca el token de la API). Asume que el secreto ha sido comprometido desde el instante en que se hizo el *push*.
2.  **Limpieza del Historial (Prioridad 2):** Utiliza herramientas como `git-filter-repo` o `BFG Repo-Cleaner` para purgar por completo el archivo o la cadena de texto del historial de Git del repositorio local y fuerza el push (`git push --force`) para sobreescribir el historial remoto.
3.  **Auditoría de Acceso:** Revisa los logs de acceso del sistema afectado durante el periodo en que la clave estuvo expuesta para confirmar que no ha habido accesos no autorizados.
