# Resumen del Proyecto: Clínicas Cartagena Dermatológico

## Estado General
- Aplicación React/Vite con routing para secciones principales (home, nosotros, dermatología, spa, blog, tienda, etc.).
- Estilos basados en CSS modular con componentes reutilizables.
- Integraciones clave: Navbar con menú principal, modales de valoración, componentes de showcase y tienda con filtros.

## Cambios Relevantes Recientes
- Dermatología separada en subrutas /dermatologia/clinica y /dermatologia/estetica con modal de valoración rápida y secciones de tecnología.
- Sección Spa rediseñada: hero inmersivo, tarjetas 3D de experiencias, navegación sticky con offsets dinámicos.
- Navbar actualizado: acceso directo a /spa y dropdowns simplificados.
- Componentes nuevos: QuickAssessmentModal, SpaExperienceShowcase, SpaLayout y estilos asociados.

## Pendientes Identificados
- Asignar nombres y metadatos reales a los productos de la tienda según las imágenes.
- Revisar los datos de precios y líneas en src/data/products.js para que coincidan con la oferta real.
- Validar responsividad y accesibilidad de nuevas secciones (hero, tarjetas, modales) en dispositivos móviles.

## Notas Técnicas
- Offset de la barra SPA calculado dinámicamente vía --spa-navbar-offset definido en SpaLayout.
- Modal de valoración reutilizable para dermatología y spa categorizado por servicio.
- SpaExperienceShowcase maneja estado interno para selección de experiencia y renderiza detalles enriquecidos.

