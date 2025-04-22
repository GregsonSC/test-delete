# Proyecto de Migración a Next.js para Senavia Corp

Este documento detalla las funcionalidades y características que se implementarán en la migración del sitio web de Senavia Corp a Next.js.

## Instalación y Configuración

1. Clonar el repositorio:

```bash
git clone https://github.com/Senavia-Corp/landing-senavia
cd landing-senavia
```

2. Instalar las dependencias:

```bash
yarn install
```

Si no tienes yarn instalo de la siguiente manera:

```bash
npm install --global yarn
```

3. Iniciar el servidor de desarrollo:

```bash
yarn dev
```

4. Para producción, construir y ejecutar el proyecto:

```bash
yarn build
yarn start
```

### Comandos Disponibles

- yarn dev : Inicia el servidor de desarrollo en http://localhost:3000
- yarn build : Construye la aplicación para producción
- yarn start : Inicia el servidor de producción
- yarn format : Formatea automáticamente el código usando Prettier
- yarn format:check : Verifica el formato del código sin modificarlo
- yarn lint : Ejecuta el linter para encontrar problemas en el código
- yarn lint:fix : Ejecuta el linter y corrige automáticamente los problemas que puede resolver

### Requisitos del Sistema

- Node.js 18.x o superior
- Yarn 1.22.x o superior

## Índice

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Características Principales](#características-principales)
  - [Páginas Informativas](#páginas-informativas)
  - [Servicios Ofrecidos](#servicios-ofrecidos)
  - [Formulario de Contacto](#formulario-de-contacto)
  - [Testimonios de Clientes](#testimonios-de-clientes)
  - [Blog](#blog)
  - [Optimización para Motores de Búsqueda (SEO)](#optimización-para-motores-de-búsqueda-seo)
  - [Responsividad y Accesibilidad](#responsividad-y-accesibilidad)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación y Configuración](#instalación-y-configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Descripción del Proyecto

El objetivo de este proyecto es migrar el sitio web de Senavia Corp a Next.js, con el fin de tener más control y para mejorar el rendimiento,
la escalabilidad y la experiencia del usuario.

## Características Principales

### Páginas Informativas

- **Inicio**: Presentación de la empresa, misión, visión y valores.
- **Nosotros**: Información detallada sobre el equipo, historia y cultura empresarial.
- **Servicios**: Descripción de los servicios ofrecidos, incluyendo diseño web, desarrollo y soluciones de comercio electrónico.
- **Portafolio**: Muestra de proyectos anteriores con descripciones e imágenes.
- **Contacto**: Información de contacto y formulario para consultas.

### Servicios Ofrecidos

- **Diseño Web**: Creación de sitios web personalizados y adaptativos.
- **Desarrollo Web**: Soluciones de desarrollo a medida utilizando tecnologías modernas.
- **Comercio Electrónico**: Implementación de plataformas de e-commerce seguras y eficientes.
- **Marketing Digital**: Estrategias de SEO, SEM y gestión de redes sociales.

### Formulario de Contacto

- Campos para nombre, correo electrónico, número de teléfono y mensaje.
- Validación de datos en el cliente y el servidor.
- Envío de notificaciones por correo electrónico al equipo de Senavia Corp.

### Testimonios de Clientes

- Sección dedicada a reseñas y opiniones de clientes satisfechos.
- Integración con plataformas de reseñas externas para mostrar calificaciones.

### Blog

- Publicación de artículos relacionados con la industria, consejos y novedades.
- Categorías y etiquetas para una fácil navegación.
- Sistema de comentarios moderados.

### Optimización para Motores de Búsqueda (SEO)

- Uso de etiquetas meta adecuadas en cada página.
- Generación de un sitemap.xml y un robots.txt.
- URLs amigables y estructura de encabezados correcta.

### Responsividad y Accesibilidad

- Diseño adaptativo que garantiza una experiencia óptima en dispositivos móviles, tabletas y desktops.
- Cumplimiento con las pautas de accesibilidad web (WCAG) para asegurar que el sitio sea usable por todas las personas.

### Documentación de la API

- Se utilizó la librería next-swagger-doc de Swagger para generar automáticamente una interfaz con la documentación de todos los endpoints de la API.
- Los archivos que contienen la configuración de la librería son los siguientes:
- **lib/swagger.ts**: Aquí se especifica la configuración de Swagger de acuerdo a las rutas de la API.
- **app/api-doc/react-swagger.tsx**: Componente que utiliza la librería swagger-ui-react para renderizar una interfaz de Swagger de acuerdo a las especificaciones anteriormente definidas.
- **app/api-doc/page.tsx**: Página que renderiza el componente gráfico.
- Para añadir un endpoint a la documentación se debe agregar un comentario a la ruta correspondiente con metadatos que describan el funcionamiento y características del endpoint, como se muestra en los ejemplos de la ruta app/api/lead.
- Para visualizar la documentación se debe acceder a la url: localhost:3000/api-doc

## Tecnologías Utilizadas

- **Next.js**: Framework principal para el desarrollo del sitio.
- **React**: Biblioteca de JavaScript para la construcción de interfaces de usuario.
- **Shadcn**: Para el estilizado de componentes.
- **Zod**: Manejo y validación de formularios.
- **Axios**: Cliente HTTP para la comunicación con APIs.
- **Nodemailer (en revisión)**: Envío de correos electrónicos desde el servidor.
- **Prisma**: ORM para la creación de entidades en la DB.
- **Swagger**: Documentación de la API

# Generar migración de Prisma

```bash
npx prisma migrate dev --name <nombre_migracion>
```

# Actualizar cliente Prisma

Tener el archivo .env configurado con la db que deseas apuntar

```bash
npx prisma generate
```

# Visualizar BD en interfaz web

```bash
npx prisma studio
```

# Actualizar dependecias de forma interactiva

```bash
yarn upgrade-interactive --latest
```

//--- back end
para iniciar utilizamos este comando para crear las tablas :npx migrate generate
para iniciar el back corremos: yarn dev --turbo
ya para los endpoints estamos utilizando este formato
http://localhost:3000/api/blog
el cual si queremos cambiar de entidad solo cambiamos la ultima palabra por ejemplo
http://localhost:3000/api/permission
si se requiere una busqueda se cambiaria el numero y se pone el requirido
http://localhost:3000/api/blog?id=1
y pues tendriamos el get de obtener todos, obtener por id, y sus casos de error
el post que seria para crear la entidad con sus atributos.
tendriamos el patch para actualizar uno o mas atributos de la entidad, por medio del id.
y el delete para eliminar las entidades por medio del id.



Para iniciar usamos el siguiente comando para crear las tablas en la base de datos npx prisma migrate dev
Luego para ejecutar el backend corremos yarn dev --turbo

Los endpoints siguen este formato http://localhost:3000/api/blog
Si queremos cambiar de entidad simplemente reemplazamos la última palabra por ejemplo http://localhost:3000/api/permission

Si se requiere una búsqueda por ID agregamos el parámetro id con el valor deseado http://localhost:3000/api/blog?id=1

Contamos con los siguientes métodos disponibles en cada endpoint

GET sin parámetros obtiene todos los registros, con id obtiene un registro específico.
POST crea una nueva entidad con los atributos requeridos
PATCH actualiza uno o varios atributos de una entidad identificándola por su id
DELETE elimina una entidad específica mediante su id

también maneja casos de error como ID inválido o entidad no encontrada, o falta de atributos.



Código	Cuándo usarlo						          De quién es la culpa
200		  Todo salió bien						        —
400		  El cliente envió algo incorrecto	Cliente
404		  El recurso no fue encontrado		  Cliente
500		  Algo falló dentro del servidor		Servidor