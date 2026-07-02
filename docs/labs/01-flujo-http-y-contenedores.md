# Laboratorio 1: flujo HTTP y contenedores

## Objetivo

Identificar dónde se ejecuta cada componente y seguir una petición desde el
navegador hasta una réplica del backend.

## Explicación mínima

El HTML se descarga desde el frontend, pero el JavaScript se ejecuta en el
navegador. Por eso un nombre DNS interno como `backend-service` funciona dentro
del clúster, pero no en el navegador.

El reverse proxy resuelve el problema con un único origen:

```text
navegador -> reverse-proxy-service -> frontend-service
                                 \--> backend-service
```

El frontend llama a una ruta relativa, `/api/saludo`. Nginx decide el destino.
No se necesita abrir CORS porque frontend y API comparten origen para el
navegador.

## Práctica

Parte de uno de los despliegues descritos en el
[README](../../README.md#elige-tu-recorrido).

Consulta los objetos:

```bash
kubectl get deployments,pods,services --namespace demo-kind
kubectl get endpointslices --namespace demo-kind
```

Realiza una petición a la portada y otra a la API:

```bash
curl --include http://localhost:8080/
curl --include \
  "http://localhost:8080/api/saludo?alias=equipo-demo"
```

Observa los logs del proxy y del backend:

```bash
kubectl logs --namespace demo-kind deployment/reverse-proxy --tail=20
kubectl logs --namespace demo-kind deployment/backend --tail=20
```

## Resultado esperado

- `/` devuelve HTML desde el frontend.
- `/api/saludo` devuelve JSON desde el backend.
- La respuesta no contiene `Access-Control-Allow-Origin`.
- Los Services muestran varios endpoints para frontend y backend.

## Comprobación

```bash
curl --silent \
  "http://localhost:8080/api/saludo?alias=equipo-demo"
```

Debe aparecer `mensaje` e `instancia`.

## Error frecuente

`backend-service` no se resuelve desde el equipo local. Es correcto: ese nombre
pertenece al DNS del clúster. Accede a través del proxy o crea un port-forward
temporal al Service que quieras diagnosticar.

## Reto opcional

Accede directamente al backend para comparar ambos recorridos:

```bash
kubectl port-forward \
  --namespace demo-kind service/backend-service 3000:3000
curl http://localhost:3000/healthz
```

<details>
<summary>Qué debes concluir</summary>

El acceso directo es útil para diagnóstico, pero evita el proxy y no representa
el recorrido normal del usuario. En producción, los servicios internos no
deberían publicarse sin una necesidad explícita.

</details>
