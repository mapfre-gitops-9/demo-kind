# Bitácora resumida del taller

Esta cronología conserva el hilo pedagógico de las sesiones sin atribuciones
personales ni contexto ajeno a la maqueta.

## 1. Imágenes y contenedores

Se introdujeron imágenes, contenedores, procesos aislados, Dockerfiles y el
carácter efímero del filesystem de un contenedor.

Idea principal: la imagen y su configuración son reproducibles; una instancia
concreta debe poder sustituirse.

## 2. Redes y persistencia

Se practicaron redes bridge, publicación de puertos, volúmenes gestionados y
bind mounts. Se distinguió la red del contenedor de la red del equipo.

Idea principal: antes de diagnosticar conectividad hay que identificar desde
qué entorno se origina realmente la petición.

## 3. Proxy inverso y origen web

Se observó que el JavaScript del frontend se ejecuta en el navegador y no
resuelve el DNS interno de los contenedores. Un reverse proxy permitió ofrecer
frontend y API bajo el mismo origen.

Idea principal: CORS no es un sustituto de una arquitectura de entrada clara.

## 4. De Compose a Kubernetes

La misma aplicación se expresó mediante Deployments, Services y un ConfigMap.
Kind proporcionó un clúster desechable para practicar la API de Kubernetes.

Idea principal: tanto Compose como Kubernetes aceptan configuración
declarativa; Kubernetes añade reconciliación y planificación de cargas.

## 5. Kustomize y acceso al servicio

La configuración se separó en una base y overlays. Se compararon NodePort y
port-forward para distintos entornos.

Idea principal: el método de exposición depende de dónde se ejecutan los nodos
y de quién necesita acceder.

## 6. Colaboración y automatización

Se incorporaron ramas cortas, Pull Requests, revisión, CI, publicación
multi-arquitectura, escaneo y documentación asistida.

Idea principal: automatizar ayuda a detectar errores repetibles, pero no
reemplaza el criterio técnico ni la responsabilidad humana.
