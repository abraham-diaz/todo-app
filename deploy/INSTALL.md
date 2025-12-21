# Instalación en Raspberry Pi

## Requisitos previos

```bash
# Instalar Node.js (v18+)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar Nginx
sudo apt install -y nginx

# Instalar dependencias de compilación para better-sqlite3
sudo apt install -y build-essential python3
```

## Instalación automática

```bash
cd /home/abraham/todo-app
chmod +x deploy/deploy.sh
./deploy/deploy.sh
```

## Instalación manual

### 1. Clonar/copiar el proyecto a `/home/abraham/todo-app`

### 2. Instalar dependencias y compilar

```bash
cd /home/abraham/todo-app
npm install
npm run build

cd server
npm install
npm run build
```

### 3. Configurar systemd

```bash
sudo cp deploy/todo-backend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable todo-backend
sudo systemctl start todo-backend
```

### 4. Configurar Nginx

```bash
sudo cp deploy/todo-app.nginx.conf /etc/nginx/sites-available/todo-app
sudo ln -s /etc/nginx/sites-available/todo-app /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## Comandos útiles

```bash
# Ver estado del backend
sudo systemctl status todo-backend

# Ver logs del backend
sudo journalctl -u todo-backend -f

# Reiniciar backend
sudo systemctl restart todo-backend

# Reiniciar nginx
sudo systemctl reload nginx
```

## Estructura de archivos

```
/home/abraham/todo-app/
├── dist/                 # Frontend compilado (servido por nginx)
├── server/
│   ├── dist/            # Backend compilado
│   └── data/todos.db    # Base de datos SQLite
└── deploy/              # Archivos de configuración
```
