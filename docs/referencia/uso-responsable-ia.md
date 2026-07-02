# Uso responsable de asistentes de IA

Los asistentes pueden explicar código, proponer pruebas, revisar documentación
y ayudar a investigar errores. Su salida es una hipótesis que debe comprobarse,
no una fuente de verdad.

## Antes de usar una herramienta

- Confirma que está autorizada para el entorno y la clasificación de la
  información.
- No compartas código, documentos, logs, credenciales ni contexto corporativo
  en servicios no homologados.
- Reduce el contexto al mínimo necesario y utiliza ejemplos sintéticos.
- Comprueba las políticas de retención, entrenamiento y acceso aplicables.

## Cómo pedir ayuda sobre este repositorio

Ejemplos de preguntas seguras:

- “Explica el recorrido de una petición usando únicamente estos manifiestos”.
- “Compara readiness y liveness en esta maqueta”.
- “Propón una prueba para una entrada inválida sin usar datos reales”.
- “Señala qué simplificaciones impedirían usar este ejemplo en producción”.

## Cómo verificar una respuesta

1. Contrasta afirmaciones con el código y documentación primaria.
2. Ejecuta las pruebas y reproduce los comandos.
3. Revisa seguridad, privacidad, licencias y mantenimiento.
4. Haz que otra persona revise los cambios relevantes.
5. Documenta las decisiones, no la conversación completa con el asistente.

Evita aceptar refactorizaciones grandes sin entenderlas. Una respuesta
convincente puede contener APIs inexistentes, versiones obsoletas o supuestos
incorrectos sobre el entorno.

## Transparencia

Cuando la asistencia haya influido de forma material en el contenido, deja una
nota proporcionada sobre la herramienta y el tipo de trabajo realizado. La
responsabilidad del cambio continúa siendo humana.

La procedencia concreta de este laboratorio se describe en
[procedencia.md](procedencia.md).
