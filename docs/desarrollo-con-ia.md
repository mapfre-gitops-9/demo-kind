# Desarrollo y Exploración del Proyecto asistido por IA

En pro de la transparencia y de la adopción de metodologías de desarrollo modernas, queremos dejar constancia de que este proyecto ha sido diseñado, documentado y refactorizado con la ayuda activa de asistentes de codificación basados en Inteligencia Artificial (como **Antigravity**, **OpenCode** o **GitHub Copilot**).

Animamos a cualquier miembro del equipo a seguir utilizando asistentes de IA para explorar, depurar, añadir mejoras o interactuar con este repositorio en su día a día.

> [!WARNING]
> **Cumplimiento y Entorno Corporativo:**
> OpenCode y su modelo gratuito "Big Pickle" son excelentes alternativas para entornos personales, proyectos de divulgación o experimentación individual. 
> Sin embargo, recuerda que en entornos corporativos **se deben emplear exclusivamente las herramientas de IA homologadas y autorizadas oficialmente** (como VS Code con GitHub Copilot empresarial o los asistentes corporativos aprobados), con el fin de garantizar la protección de la propiedad intelectual y cumplir con las políticas de seguridad de la información de la organización.

---

## TIP: Uso de OpenCode como Chatbot Local del Proyecto

Una forma excelente de entender la arquitectura, los detalles y el código de este repositorio sin tener que leer todos los archivos a mano es utilizar **OpenCode** directamente desde tu terminal en tu entorno personal o de aprendizaje.

La inferencia es totalmente gratuita gracias al modelo integrado **Big Pickle** (OpenCode Zen).

### Pasos rápidos para empezar:

1. **Instala OpenCode** en tu máquina de desarrollo personal.
2. **Clona el repositorio** localmente si no lo has hecho ya:
   ```bash
   git clone git@github.com:mapfre-gitops-9/demo-kind.git
   ```
3. **Accede a la carpeta del proyecto** en tu terminal:
   ```bash
   cd demo-kind
   ```
4. **Ejecuta OpenCode** en ese directorio:
   ```bash
   opencode
   ```
5. **¡Pregunta lo que quieras!** El modelo leerá el contexto del proyecto y te responderá en el chat.

### Preguntas sugeridas para probar:
*   *«Dime de qué va este proyecto y para qué está hecho»* (Verás que te explicará su carácter didáctico).
*   *«¿Por qué el frontend me da un 403 Forbidden al desplegar y cómo se soluciona?»*
*   *«¿Cómo funciona la red si uso macOS con Rancher Desktop y por qué necesito port-forward?»*
*   *«¿Cuáles son los pasos y acuerdos mínimos que tenemos para hacer un merge a la rama main?»*
