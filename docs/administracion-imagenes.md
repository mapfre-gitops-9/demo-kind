# Gestión y Publicación de Imágenes en GitHub Container Registry (GHCR)

Esta guía detalla la arquitectura de integración continua (CI) implementada para este proyecto y las tareas de administración necesarias para gestionar las imágenes de contenedor del backend y frontend de forma pública.

## 1. Automatización de Compilación (CI)

El proyecto utiliza **GitHub Actions** para automatizar el ciclo de vida de los contenedores mediante el flujo de trabajo definido en [.github/workflows/build-and-push.yml](file:///Users/pedroamador/testlab/mapfre-gitops-9/demo-kind/.github/workflows/build-and-push.yml).

### Funcionamiento del Workflow:
* **En Pull Requests hacia `main`:** Ejecuta una compilación de prueba para asegurar que los Dockerfiles del `frontend` y del `backend` no tienen errores sintácticos o de dependencias. **No se publica ninguna imagen** en este paso.
* **En Push/Merge en `main`:** Compila las imágenes definitivas y las sube automáticamente a `ghcr.io`. Cada imagen recibe dos etiquetas (tags):
  * `:latest` para la última versión estable.
  * `:${{ github.sha }}` (hash del commit) para permitir trazabilidad y rollback.

> [!NOTE]
> No se requieren secretos manuales. El workflow se autentica utilizando el token de sesión integrado `${{ secrets.GITHUB_TOKEN }}` gracias a los permisos elevados de escritura de paquetes declarados en el job (`packages: write`).

---

## 2. Configuración de la Organización en GitHub

Para que las imágenes compiladas por el workflow se publiquen correctamente y queden accesibles para cualquier persona (o clúster local como Killercoda), la organización de GitHub requiere una configuración específica:

1. Accede a la configuración de paquetes de la organización:
   [Ajustes de Packages en mapfre-gitops-9](https://github.com/organizations/mapfre-gitops-9/settings/packages)
2. En la sección **Package Creation**, asegúrate de que los miembros de la organización tengan permisos para crear y publicar paquetes.
3. Activa la opción **Inherit repository permissions** (Heredar permisos del repositorio). Esto asocia los permisos de acceso de los paquetes con el repositorio del que proceden.

---

## 3. Visibilidad y Vinculación (Puesta en Marcha)

En el primer despliegue del proyecto, GitHub puede publicar los paquetes como privados por defecto. Para asegurar que son de acceso libre (sin requerir `imagePullSecrets` en Kubernetes):

### Paso A: Vincular el Paquete al Repositorio
Si el paquete no aparece enlazado a este repositorio tras la primera compilación:
1. Ve al listado de paquetes de la organización: [Packages de mapfre-gitops-9](https://github.com/orgs/mapfre-gitops-9/packages).
2. Selecciona el paquete correspondiente (`demo-backend` o `demo-frontend`).
3. En la barra lateral derecha, haz clic en **Connect repository** y selecciona `demo-kind`.

### Paso B: Hacer Público el Paquete
1. En la página de detalles del paquete, haz clic en **Package Settings** (abajo a la derecha).
2. Desplázate hasta la sección **Danger Zone**.
3. Haz clic en **Change visibility** y cámbiala a **Public**.
4. Repite el proceso para ambos servicios.
