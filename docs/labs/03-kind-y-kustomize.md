# Laboratorio 3: Kind y Kustomize

## Objetivo

Desplegar la aplicación de forma declarativa y entender qué cambia entre la
base, el entorno local y el playground.

## Explicación mínima

Kubernetes intenta mantener el estado descrito en los manifiestos. Kustomize
combina una base común con cambios específicos de cada entorno:

```text
k8s/base
├── Deployments, Services, ConfigMap y Namespace
└── configuración común

k8s/overlays/local
├── imágenes locales
└── imagePullPolicy: Never

k8s/overlays/playground
├── imágenes públicas
├── imagePullPolicy: Always
└── NodePort 30080
```

Kustomize gestiona YAML declarativo. No es GitOps por sí mismo: faltaría un
controlador que observe Git y reconcilie automáticamente el clúster.

## Práctica

Renderiza sin desplegar:

```bash
kubectl kustomize k8s/overlays/local | less
kubectl kustomize k8s/overlays/playground | less
```

Comprueba las diferencias:

```bash
diff \
  <(kubectl kustomize k8s/overlays/local) \
  <(kubectl kustomize k8s/overlays/playground)
```

Despliega el overlay local:

```bash
kind create cluster --name demo-kind
kind load docker-image demo-kind-backend:local --name demo-kind
kind load docker-image demo-kind-frontend:local --name demo-kind
kubectl apply -k k8s/overlays/local
kubectl wait --for=condition=available deployment \
  --all --namespace demo-kind --timeout=120s
```

Consulta el estado:

```bash
kubectl get all --namespace demo-kind
kubectl describe deployment backend --namespace demo-kind
```

## Resultado esperado

Hay dos pods de backend, dos de frontend y uno de reverse proxy. Todos deben
estar `Running` y preparados.

## Comprobación

```bash
kubectl get pods --namespace demo-kind
kubectl get service reverse-proxy-service \
  --namespace demo-kind --output yaml
```

En local, el Service es `ClusterIP`. En el playground es `NodePort`.

## Error frecuente

`ErrImageNeverPull` significa que Kind no tiene la imagen local:

```bash
kind load docker-image demo-kind-backend:local --name demo-kind
kind load docker-image demo-kind-frontend:local --name demo-kind
kubectl rollout restart deployment/backend deployment/frontend \
  --namespace demo-kind
```

Un NodePort no aparece automáticamente en `localhost` con todos los motores de
contenedores. Usa el port-forward documentado.

## Reto opcional

Cambia el número de réplicas del frontend en la base, renderiza ambos overlays
y comprueba que el cambio se propaga.

<details>
<summary>Qué demuestra el reto</summary>

La base evita duplicar configuración. Los overlays deben contener únicamente
las diferencias necesarias para cada destino.

</details>
