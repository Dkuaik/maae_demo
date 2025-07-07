# MAAe - Modelo Avanzado para el Análisis de Evidencias

### links a los servicios
maae-frontend (https://maae-pemex-hgaxbpb0g7d5accb.eastus-01.azurewebsites.net/)   
maae-backend (https://maae-backend-a7gtdwffaegcgsab.eastus-01.azurewebsites.net/)  
maae-llm-service (https://maae-llm-hwevbqcybzgfgffc.eastus-01.azurewebsites.net/docs)  

## Estructura de MAAe (WBS)
La estructura de MAAe se realizó a través de drawio: https://app.diagrams.net/#G1j2sfX5yY-XvdwKssLucuQlX74HVKMyLg#%7B%22pageId%22%3A%221vvVhC9-HVARlry0gJxA%22%7D

## Descripción
Esta aplicación ahora está dockerizada y se puede ejecutar fácilmente con `docker-compose`. A continuación, se detallan los pasos para instalar los requisitos y ejecutar la aplicación en distintos sistemas operativos.

## Requisitos
Antes de ejecutar la aplicación, asegúrate de cumplir con los siguientes requisitos:

### Requisitos generales
- **Docker** (versión 20.10 o superior)
- **Docker Compose** (si es una instalación separada, versión 1.29 o superior)

### Requisitos en Linux
Para ejecutar Docker en Linux, es necesario que el kernel sea compatible con las tecnologías de contenedores:
- Kernel de Linux versión 3.10 o superior
- Se recomienda utilizar una distribución como Ubuntu, Debian o CentOS
- Asegurar que el usuario tenga permisos para ejecutar Docker sin `sudo`
  ```sh
  sudo usermod -aG docker $USER
  ```

### Requisitos en Windows
Para ejecutar Docker en Windows, es necesario:
- **Windows 10/11 Pro, Enterprise o Education** (Docker Desktop no funciona en Home sin WSL 2)
- **WSL 2** habilitado con una distribución Linux instalada
- **Virtualización habilitada** en la BIOS
- Descargar e instalar **Docker Desktop** desde [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

## Instalación de Docker

### En Linux (Ubuntu/Debian)
```sh
sudo apt update
sudo apt install -y docker.io docker-compose
```

### En Windows
1. Descargar e instalar [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Habilitar WSL 2 y asegurarse de que Docker lo use
3. Reiniciar el sistema si es necesario

## Ejecución
Una vez instalado Docker, puedes ejecutar la aplicación con los siguientes comandos:

```sh
docker-compose up -d  # Inicia la aplicación en segundo plano
docker-compose down -v # Detiene la aplicación y elimina volúmenes
```

Si necesitas reconstruir las imágenes, usa:
```sh
docker-compose up --build
```

## Notas
- Si Docker requiere permisos en Linux, usa `sudo` o agrega tu usuario al grupo `docker`.
- En Windows, asegúrate de que WSL 2 está habilitado y configurado correctamente en Docker Desktop.

---
Con esta configuración, la aplicación se ejecutará dentro de contenedores sin necesidad de instalar dependencias manualmente en el sistema operativo anfitrión.

### 2. Dependencias para IA y Deep Learning

#### Requisitos
- **Python** (versión 3.8 o superior).
- **Pandas** - Para manipulación y análisis de datos.
- **NumPy** - Para operaciones numéricas avanzadas.
- **PyTorch** - Framework de deep learning.
- **Keras** - API de redes neuronales.
- **TensorFlow** - Framework de machine learning.

#### Instalación
1. **Python**:
   - Descargar e instalar Python desde [python.org](https://www.python.org/).
   - Verificar la instalación con `python --version`.

2. **Instalación de bibliotecas**:
   - Ejecutar los siguientes comandos para instalar las dependencias:
     ```bash
     pip install pandas numpy torch keras tensorflow
     ```

---

## Base de Datos

### PostgreSQL
- **Requisito**: Instalar PostgreSQL desde su [sitio oficial](https://www.postgresql.org/download/).
- **Configuración**:
  - Crear una base de datos llamada `MAAe`.
  - Configurar las credenciales de acceso en el archivo de configuración del proyecto.
- **Diagrama de la base de datos**: [Ver diagrama](https://dbdiagram.io/d/MAAe-PostgreSQL-67ad1cf8263d6cf9a0f66d9f).

---

## Acceso a Azure

Para acceder a los recursos en Azure:
1. Iniciar sesión con el correo: `leopoldomartinez_1@gmail.com`.
2. Solicitar acceso al ingeniero **Leopoldo Martínez** para obtener los permisos necesarios.

---

## Ejecución del Proyecto

### Backend (MVC)
1. Clonar el repositorio del proyecto.
2. Navegar a la carpeta del proyecto y ejecutar:
   ```bash
   mvn clean install
3. Desplegar el archivo .war generado en Tomcat (tomcat/weebaps/Maae).

#### estructura de carpeteo

│── src/main/java/com/enrique/app
│   ├── MiApiApplication.java  # Clase principal
│   ├── controller/
│   │   ├── UsuarioController.java  # Controlador para exponer la API
│   ├── service/
│   │   ├── UsuarioService.java  # Lógica de negocio
│   ├── repository/
│   │   ├── UsuarioRepository.java  # Acceso a BD (opcional)
│   ├── model/
│   │   ├── Usuario.java  # Modelo de datos
│── src/main/resources/
│   ├── application.properties  # Configuración


