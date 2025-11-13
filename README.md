# 🎨 Jobsi — Frontend (React + Vite + Tailwind)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwindcss&logoColor=white)
![Status](https://img.shields.io/badge/estado-en%20desarrollo-orange)

Proyecto académico del ecosistema **Jobsi**, enfocado en el desarrollo del **frontend web**.  
Busca aplicar buenas prácticas de arquitectura modular y diseño moderno utilizando *React, Vite y TailwindCSS.*

---

## Objetivos de aprendizaje

- Construir interfaces modernas, accesibles y responsivas.  
- Implementar navegación con **React Router DOM**.  
- Organizar el frontend con arquitectura basada en **features**.
- Uso de TailwindCSS para estilos rápidos, responsivos y consistentes.  
- Integrar el frontend con la API REST de Jobsi (Spring Boot).  
- Crear una experiencia visual consistente con la identidad del proyecto Jobsi.

---

## Arquitectura (Frontend Adaptada)

```bash
src/
 ├─ assets/                # Imágenes, íconos, logos
 ├─ components/            # Componentes reutilizables
 ├─ features/              # Módulos funcionales (login, register, home, etc.)
 │   ├─ auth/              # Login / Register
 │   └─ home/              # Pantalla Home
 ├─ routes/                # Configuración de rutas
 ├─ services/              # Conexión con API (fetch/axios)
 ├─ App.jsx                # Punto principal de la app
 ├─ main.jsx               # Render de React
 ├─ index.css              # Estilos globales
 ├─ tailwind.config.js     # Configuración Tailwind
 └─ vite.config.js         # Configuración Vite
```
El proyecto sigue una estructura modular por **features**, favoreciendo reutilización y mantenibilidad.

---

## Stack técnico

| Tecnología | Propósito |
|-----------|-----------|
| **React 18+** | Construcción de UI |
| **Vite** | Bundler rápido |
| **TailwindCSS** | Estilización |
| **React Router DOM** | Navegación |
| **Node.js 18+** | Entorno de ejecución |
| **Git + GitHub** | Control de versiones |

---

## Puesta en marcha (Local)

### **1. Requisitos**
- Node.js 18+
- npm
- Git
  
---

### **2. Clonar el repositorio**
```bash
git clone https://github.com/Juanchito1106/Jobsi_Frontend_Project.git
cd Jobsi_Frontend_Project
```

---

### **3. Instalar dependencias**
```bash
npm install
```

---

### **4. Instalar TailwindCSS**
```bash
npm install tailwindcss @tailwindcss/vite
```

---

### **5. Ejecutar en entorno de desarrollo**
```bash
npm run dev
```
La app quedará disponible en:
```arduino
http://localhost:5173
```

---

### **6. Construir para producción**
```bash
npm run build
```

---

## Conexión con el Backend

Este proyecto se comunica con la API REST del backend **Jobsi — Clean Architecture (Spring Boot)**.

Repositorio del backend:  
👉 https://github.com/Jobsi-PPI/Jobsi_Backend_Project

---

## 🧑‍💻 Autores

**- Juan Andrés Correa (Juanchito1106)**  
**- Johnder Naranjo (Johnd3r)**  

Frontend Developer — Proyecto **Jobsi**  
📍 Politécnico Colombiano Jaime Isaza Cadavid






