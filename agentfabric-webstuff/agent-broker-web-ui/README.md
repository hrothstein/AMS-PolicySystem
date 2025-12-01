# Agent Broker Web UI

A beautiful, modern web interface for the Credit Card Intelligence Agent Broker, built with MuleSoft.

## 🚀 Features

- **Clean, Modern UI**: Responsive design with beautiful gradients and animations
- **Real-time Communication**: Direct integration with your agent broker at `https://agent-network-ingress-gw-npo8yu.dyx6np.usa-e2.cloudhub.io/credit-card-broker/`
- **Simple Input**: Only requires text input - everything else is handled automatically
- **Error Handling**: Graceful error handling with user-friendly messages
- **Example Queries**: Pre-built example queries to get started quickly

## 📁 Project Structure

```
agent-broker-web-ui/
├── src/
│   ├── main/
│   │   ├── mule/
│   │   │   ├── agent-broker-web-ui.xml  # Main Mule flows
│   │   │   └── global.xml               # Global configurations
│   │   └── resources/
│   │       ├── config.properties        # Configuration file
│   │       ├── web/
│   │       │   ├── index.html          # Web interface
│   │       │   ├── styles.css          # Styling
│   │       │   └── app.js              # Frontend logic
│   │       └── log4j2.xml
│   └── test/
├── pom.xml
└── README.md
```

## 🔧 Configuration

The application is configured via `src/main/resources/config.properties`:

```properties
# HTTP Listener Configuration
http.host=0.0.0.0
http.port=8081

# Agent Broker Configuration
agent.broker.host=agent-network-ingress-gw-npo8yu.dyx6np.usa-e2.cloudhub.io
agent.broker.port=443
agent.broker.path=/credit-card-broker/

# File Configuration
file.working.dir=${mule.home}/apps/${app.name}/
```

## 🏃 Running Locally

### Option 1: Using MuleSoft MCP Tool

```bash
# From your workspace
mcp_mulesoft_run_local_mule_application --projectPath /Users/hrothstein/cursorrepos/agentfabric-webstuff/agent-broker-web-ui
```

### Option 2: Using Maven

```bash
cd /Users/hrothstein/cursorrepos/agentfabric-webstuff/agent-broker-web-ui
mvn clean package
mvn mule:run
```

Once running, open your browser to:
```
http://localhost:8081
```

## 🌐 Endpoints

The application exposes the following endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Serves the web interface |
| `/*.css` | GET | Serves CSS files |
| `/*.js` | GET | Serves JavaScript files |
| `/api/query` | POST | Proxies requests to the agent broker |

## 🚀 Deploying to CloudHub 2.0

### Using MuleSoft MCP Tool

```bash
mcp_mulesoft_deploy_mule_application \
  --projectPath /Users/hrothstein/cursorrepos/agentfabric-webstuff/agent-broker-web-ui \
  --environmentName Sandbox \
  --appName agent-broker-web-ui \
  --runtimeVersion 4.10.0
```

### Using Anypoint Studio or Platform

1. Build the project: `mvn clean package`
2. Upload the JAR file from `target/agent-broker-web-ui-1.0.0-mule-application.jar` to Anypoint Platform
3. Deploy to your desired environment

## 💡 How It Works

### 1. Web Interface Layer
The frontend (`index.html`, `styles.css`, `app.js`) provides a beautiful chat-like interface where users can:
- Enter natural language queries
- See example queries to get started
- View responses in a formatted, easy-to-read manner

### 2. Mule Flow Layer

#### Static Content Serving
- **Flow 1**: Serves `index.html` at `/`
- **Flow 2**: Serves CSS files at `/*.css`
- **Flow 3**: Serves JavaScript files at `/*.js`

#### API Proxy
- **Flow 4**: Receives POST requests at `/api/query`
  - Accepts JSON-RPC 2.0 formatted requests from the frontend
  - Forwards to the agent broker endpoint
  - Returns the response to the frontend
  - Handles errors gracefully

### 3. Payload Structure

The frontend automatically constructs this JSON-RPC 2.0 payload:

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "message/send",
  "params": {
    "message": {
      "kind": "message",
      "messageId": "908627f8-fe22-4367-8d9b-6a5ed857133e",
      "role": "user",
      "parts": [
        {
          "kind": "text",
          "text": "YOUR INPUT TEXT HERE"
        }
      ]
    }
  }
}
```

The **only variable** is the `text` field in the `parts` array - everything else is auto-generated!

## 🎨 Customization

### Change the Port
Edit `src/main/resources/config.properties`:
```properties
http.port=8081  # Change to your desired port
```

### Update Agent Broker URL
If your agent broker URL changes, update:
```properties
agent.broker.host=your-new-host.com
agent.broker.port=443
agent.broker.path=/your-path/
```

### Customize the UI
- **Colors/Theme**: Edit `src/main/resources/web/styles.css`
- **Layout**: Edit `src/main/resources/web/index.html`
- **Behavior**: Edit `src/main/resources/web/app.js`

## 🐛 Troubleshooting

### Port Already in Use
Change the port in `config.properties` or stop the process using port 8081:
```bash
lsof -ti:8081 | xargs kill -9
```

### Connection Refused to Agent Broker
Verify the agent broker is accessible:
```bash
curl -X POST https://agent-network-ingress-gw-npo8yu.dyx6np.usa-e2.cloudhub.io/credit-card-broker/ \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":"1","method":"message/send","params":{"message":{"kind":"message","messageId":"test","role":"user","parts":[{"kind":"text","text":"test"}]}}}'
```

### Static Files Not Loading
Ensure the `file.working.dir` in `config.properties` is correct and the web files exist in `src/main/resources/web/`

## 📝 Technologies Used

- **MuleSoft Runtime 4.10.0**
- **HTTP Connector 1.10.5**
- **File Connector 1.5.4**
- **HTML5 / CSS3 / JavaScript (ES6)**
- **JSON-RPC 2.0**

## 📄 License

Copyright © 2025 MuleSoft

## 🤝 Contributing

Feel free to enhance this project by:
1. Improving the UI/UX
2. Adding more example queries
3. Enhancing error handling
4. Adding request/response logging

---

Built with ❤️ using MuleSoft





