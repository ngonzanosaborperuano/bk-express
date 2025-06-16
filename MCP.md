# Configuración del PostgreSQL MCP Server

## Clona el repositorio

```bash
git clone https://github.com/HenkDz/postgresql-mcp-server.git
```

## Entra en la carpeta:

```bash
cd postgresql-mcp-server
```

## Instala las dependencias

```bash
npm install
```

## Construye el servidor

```bash
npm run build
```

## Configúralo para MCP

`Añade este fragmento:`

```json
{
  "mcpServers": {
    "postgresql-mcp": {
      "command": "node",
      "args": ["/path/to/postgresql-mcp-server/build/index.js"],
      "disabled": false,
      "alwaysAllow": [],
      "operation": "get_info",
      "connectionString": "postgres://usuario:password@host:puerto"
    }
  }
}
```

### /path/to cambia por la que esta en tu ruta

ejemplo:

```text
/Users/niltongonzano/Documents/mcp/postgresql-mcp-server/build/index.js
```

### cambia los datos como usuario, password, host y puerto

## corre el proyecto clonado

```bash
npm run dev
```
