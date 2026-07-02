# Guía de Despliegue en Entornos Interactivos (Killercoda)

Esta guía detalla cómo utilizar los entornos interactivos gratuitos de **Killercoda** para desplegar y probar este proyecto de forma rápida y sencilla sin necesidad de instalar nada en tu ordenador.

---

> [!CAUTION]
> **ADVERTENCIA DE SEGURIDAD CRÍTICA:**
> Los playgrounds de Killercoda son entornos públicos, temporales y compartidos.
> * **NUNCA** introduzcas credenciales corporativas, contraseñas personales, tokens de acceso privados o archivos de configuración internos de la organización.
> * **NUNCA** despliegues datos reales ni utilices bases de datos que contengan información sensible.
> * El entorno está diseñado exclusivamente para propósitos formativos, de divulgación y pruebas rápidas con datos simulados/mock.

---

## Pasos para Desplegar en Killercoda

### 1. Iniciar el Entorno
1. Entra en [Killercoda Kubernetes Playground](https://killercoda.com/playgrounds/scenario/kubernetes).
2. Regístrate gratis (puedes usar una cuenta de GitHub o Gmail personal).
3. Espera un momento a que se inicialice el clúster interactivo de Kubernetes. Se abrirá una terminal a la derecha.

### 2. Clonar el Proyecto
En la consola de Killercoda, clona este repositorio público:
```bash
git clone https://github.com/mapfre-gitops-9/demo-kind.git
cd demo-kind
```

### 3. Desplegar con Kustomize (El comando correcto)
Para arrancar todos los servicios (frontend, backend, reverse proxy), usaremos **Kustomize** (que viene integrado en el propio comando `kubectl`):

```bash
kubectl apply -k k8s/
```

> [!IMPORTANT]
> **¿Por qué `-k` y no `-f`?**
> * El parámetro `-k` le dice a `kubectl` que procese la carpeta usando el motor de **Kustomize** a través del archivo `kustomization.yaml`. Esto compila y aplica configuraciones dinámicas.
> * Si utilizas `kubectl apply -f k8s/`, Kubernetes intentará desplegar el archivo `kustomization.yaml` directamente en el clúster como si fuese un recurso, provocando un error de tipo `no matches for kind "Kustomization"`.

### 4. Verificar el Estado del Despliegue
Comprueba que todos los pods están en estado `Running` (puede tardar unos segundos en descargar las imágenes públicas de GHCR):
```bash
kubectl get pods
```

### 5. Acceder a la Aplicación en el Navegador
Killercoda te permite redirigir y exponer puertos de tu entorno interactivo al exterior:
1. Encima de la terminal de Killercoda, haz clic en el botón de acceso a puertos o en la pestaña **"Traffic Port Accessor"**.
2. Introduce el puerto **`30080`** (que es el puerto `NodePort` donde está expuesto nuestro `reverse-proxy-service`).
3. Haz clic en **Access** y se abrirá una nueva pestaña en tu navegador mostrando el frontend de la aplicación totalmente funcional.
