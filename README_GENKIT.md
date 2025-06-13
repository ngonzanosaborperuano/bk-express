# Comience a usar Genkit JS

como primer paso debes guardar tu apikey en un `.env`
para crearlo ingresa a:

```bash
https://aistudio.google.com/app/apikey
```

## Instalar dependencias de Genkit

1. genkitProporciona capacidades básicas de Genkit.
2. @genkit-ai/googleaiProporciona acceso a los modelos de Google AI Gemini.

```bash
npm install genkit @genkit-ai/googleai
```

# Herramientas para desarrolladores de Genkit

### Interfaz de línea de comandos (CLI)

```bash
npm install -g genkit-cli
```

### Comandos disponibles

```bash
genkit --help
```

### Interfaz de usuario para desarrolladores de Genkit

```bash
genkit start -- npm run dev
genkit start -- npx tsx --watch src/index.ts
genkit start -- node --watch src/index.js
```

Como alternativa, puede agregar la -oopción al comando de inicio para abrir automáticamente la IU del desarrollador en la pestaña predeterminada de su navegador.

```bash
genkit start -o -- <command to run your code>
```

### Para inhabilitar el análisis, puede ejecutar el siguiente comando

```bash
genkit config set analyticsOptOut true
genkit config get analyticsOptOut
```
