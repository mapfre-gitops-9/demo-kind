# Bitácora del Taller de Contenedores y Orquestación

Este documento recopila la evolución diaria del taller práctico realizado por el equipo. Describe el hilo conductor de las sesiones, las demostraciones técnicas llevadas a cabo, los debates de arquitectura surgidos y las conclusiones de aprendizaje para el equipo.

---

## Sesión 1: Introducción y Fundamentos de Contenedores

### Temas Tratados
*   **Aislamiento vs. Virtualización:** Análisis de las diferencias de arquitectura entre máquinas virtuales y contenedores. Se detalló cómo los contenedores eliminan la sobrecarga de virtualización al compartir el kernel del host Linux (ejecutándose como procesos aislados), frente a las VMs que requieren hipervisor y sistemas operativos completos.
*   **Portabilidad y Entornos Host:** Discusión sobre cómo correr contenedores en sistemas operativos no nativos (macOS/Windows) a través de capas ligeras de emulación (como máquinas virtuales integradas o WSL2).
*   **Gestión Básica con Docker:** Introducción a la CLI de Docker. Explicación de los flujos de descarga y ejecución de imágenes públicas y el ciclo de vida de los contenedores.
*   **Persistencia Inicial:** Comprensión del carácter efímero del sistema de archivos de un contenedor por defecto.

### Comandos de Práctica
*   `docker run` para buscar, descargar y arrancar imágenes.
*   `docker ps` y `docker ps -a` para auditar el estado de los contenedores activos y finalizados.
*   Limpieza manual de recursos y el uso de la bandera `--rm` para destruir el contenedor automáticamente al finalizar su proceso.

---

## Sesión 2: Gestión de Redes y Persistencia con Volúmenes

### Temas Tratados
*   **Persistencia Real (Volúmenes):** Demostración práctica de cómo separar los datos persistentes del ciclo de vida del contenedor. Se compararon los volúmenes gestionados por el motor de contenedores frente al montaje directo de carpetas del sistema anfitrión (*bind mounts*).
*   **Redes e Interconectividad:** Análisis del aislamiento de redes en contenedores. Se exploró la red por defecto (*bridge*) que aísla los contenedores del host, permitiendo comunicación interna entre ellos mediante IPs automáticas, y la red de tipo *host* con sus respectivas limitaciones en entornos de desarrollo.
*   **Entornos de Desarrollo Locales:** Comparativa de alternativas de motores locales de contenedores (Docker Desktop vs. Rancher Desktop). Se analizó el impacto del licenciamiento en empresas de gran escala y cómo Rancher Desktop proporciona un entorno gratuito compatible.

### Conclusiones de Aprendizaje
*   En el desarrollo con contenedores, **la infraestructura y la configuración son lo único permanente** (declarado en ficheros Dockerfile o YAML), mientras que los contenedores en sí deben considerarse totalmente desechables.

---

## Sesión 3: Centralización de Tráfico y Seguridad (Reverse Proxy & CORS)

### Temas Tratados
*   **Mitigación de Errores de CORS:** Análisis de los bloqueos de seguridad del navegador al consumir APIs en puertos o IPs distintas de la aplicación web original. Se resolvió configurando el backend para aceptar peticiones CORS de orígenes cruzados durante la fase de desarrollo.
*   **El Patrón Reverse Proxy:** Introducción de un proxy inverso (Nginx) en la arquitectura. En lugar de exponer múltiples puertos al exterior, el proxy actúa como puerto único de entrada centralizando el tráfico y enrutando peticiones internas (ej. `/` para el frontend y `/api` para el backend).
*   **Arquitectura de Seguridad:** Debate sobre cómo el proxy inverso protege los microservicios internos del contacto directo con el navegador del cliente. Se trazó la analogía con infraestructuras corporativas que emplean Balanceadores de Carga y Firewalls de Aplicaciones Web (WAF) para mitigar vectores de ataque.
*   **Documentación Automatizada con Asistentes de IA:** Prácticas para consultar, generar diagramas y crear manuales del proyecto de forma interactiva y sin coste usando herramientas locales.

---

## Sesión 4: Modernización y Estrategia de Migración (Ansible & OpenShift)

### Temas Tratados
*   **Traspaso de Aplicaciones Legadas:** Sesión dedicada a analizar cómo asumir la gestión de herramientas departamentales complejas con baja documentación. Se debatió el uso de asistentes de IA para analizar y estructurar manuales técnicos a partir de código crudo.
*   **Refactorización de Automatizaciones:** Auditoría de scripts de administración de bases de datos heredados (Bash lineales). Se detectaron vulnerabilidades de mantenimiento como la ausencia de control de errores y rutas absolutas prefijadas (*hardcodeadas*).
*   **Estrategia de Evolución:** Propuesta para reescribir la lógica de despliegue mediante Playbooks de Ansible (idempotencia y control de errores) y empaquetar los procesos en contenedores para ejecutarse como Jobs programados en plataformas corporativas como OpenShift.

---

## Sesión 5: Transición de Docker Compose a Kubernetes (Kind)

### Temas Tratados
*   **Orquestación Declarativa:** Transición del modelo imperativo de Docker Compose (donde describes "cómo levantar" recursos secuencialmente) al modelo declarativo de Kubernetes (donde describes "el estado deseado" y el clúster se encarga de mantenerlo).
*   **Uso de Kind (Kubernetes in Docker):** Configuración de un clúster local de desarrollo multi-nodo utilizando contenedores como nodos.
*   **Manifiestos y Recursos de K8s:** Creación de recursos equivalentes a los servicios de Docker:
    *   `Deployments` para gestionar las réplicas y ciclo de vida de los pods.
    *   `Services` (ClusterIP y NodePort) para enrutar el tráfico y balancear la carga entre pods.
    *   `ConfigMaps` para inyectar configuraciones dinámicas de Nginx sin recompilar la imagen.
*   **Aislamiento con Namespaces:** Discusión sobre el uso de namespaces para aislar proyectos de diferentes desarrolladores en clústeres compartidos.

---

## Sesión 6: Despliegue en Entornos Reales e Integración de Red (Hoy)

### Temas Tratados
*   **El Reto de las Capas de Red:** Diagnóstico del aislamiento de red cuando el clúster corre dentro de una VM de desarrollo (como Rancher Desktop) o en servidores remotos. Se comprendió por qué el puerto `NodePort` local no es accesible directamente desde el navegador del host y cómo solucionarlo abriendo túneles TCP mediante `kubectl port-forward`.
*   **Uso de Kustomize:** Demostración del comando `kubectl apply -k` para compilar y aplicar parches dinámicos (sustitución de tags e imágenes de contenedores) en los despliegues de forma declarativa.
*   **Retos de Red Corporativa:** Debate técnico sobre los requisitos de infraestructura requeridos para el despliegue de OpenShift empresarial, analizando la necesidad de integración de servicios de red críticos (DHCP, servidores DNS dinámicos y balanceadores externos) en centros de datos físicos.
