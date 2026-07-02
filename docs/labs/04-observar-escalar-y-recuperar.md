# Laboratorio 4: observar, escalar y recuperar

## Objetivo

Usar las herramientas básicas de diagnóstico, observar el balanceo y comprobar
la reconciliación automática de un Deployment.

## Explicación mínima

Un Deployment crea y reemplaza pods hasta alcanzar el número de réplicas
deseado. Un Service mantiene un punto de acceso estable y envía tráfico solo a
endpoints preparados.

Las sondas tienen funciones distintas:

- **Readiness:** decide si un pod puede recibir tráfico.
- **Liveness:** decide si el contenedor necesita reiniciarse.

Dos réplicas en un Kind de un nodo sirven para aprender balanceo y
reconciliación, pero no ofrecen alta disponibilidad ante la caída de ese nodo.

## Práctica

Observa pods y logs:

```bash
kubectl get pods --namespace demo-kind --watch
kubectl logs --namespace demo-kind deployment/backend --follow
```

En otro terminal, repite peticiones:

```bash
for attempt in 1 2 3 4 5; do
  curl --silent \
    "http://localhost:8080/api/saludo?alias=observabilidad"
  echo
done
```

Escala temporalmente:

```bash
kubectl scale deployment/backend \
  --namespace demo-kind --replicas=3
kubectl rollout status deployment/backend --namespace demo-kind
```

Elimina un pod y observa cómo se reemplaza:

```bash
pod=$(kubectl get pods --namespace demo-kind \
  --selector app.kubernetes.io/name=backend \
  --output jsonpath='{.items[0].metadata.name}')
kubectl delete pod "$pod" --namespace demo-kind
kubectl get pods --namespace demo-kind --watch
```

Vuelve al estado declarado:

```bash
kubectl apply -k k8s/overlays/local
```

## Resultado esperado

- Las respuestas incluyen una instancia válida.
- El escalado crea una tercera réplica.
- Al eliminar un pod, el Deployment crea otro.
- Volver a aplicar el overlay devuelve el backend a dos réplicas.

## Comprobación

```bash
kubectl get deployment backend --namespace demo-kind
kubectl get endpointslices --namespace demo-kind \
  --selector kubernetes.io/service-name=backend-service
```

## Error frecuente

`kubectl logs deployment/backend` puede seleccionar un único pod. Para revisar
todos los pods, usa el selector:

```bash
kubectl logs --namespace demo-kind \
  --selector app.kubernetes.io/name=backend \
  --prefix --tail=20
```

## Reto opcional

Provoca un rollout fallido y recupéralo:

```bash
kubectl set image deployment/backend \
  backend=demo-kind-backend:no-existe --namespace demo-kind
kubectl rollout status deployment/backend \
  --namespace demo-kind --timeout=30s
kubectl rollout undo deployment/backend --namespace demo-kind
```

<details>
<summary>Qué debes observar</summary>

El Deployment conserva las réplicas anteriores mientras la nueva revisión no
está preparada. `rollout undo` recupera la revisión previa, pero el manifiesto
de Git sigue siendo la referencia que debe volver a aplicarse.

</details>
