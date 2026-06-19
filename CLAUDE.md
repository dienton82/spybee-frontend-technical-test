@AGENTS.md

# Spybee Frontend Technical Test

Proyecto Next.js / React / TypeScript para prueba técnica de Spybee.

## Stack
- Next.js App Router
- React
- TypeScript
- Zustand
- Mapbox GL
- SCSS

## Estado actual
La app ya funciona:
- carga incidencias desde incidents.mock.json
- muestra mapa con Mapbox
- muestra marcadores
- crea incidencias desde modal
- persiste incidencias locales en localStorage
- dashboard con KPIs, filtros, resúmenes y feed
- selección desde feed centra mapa y abre popup
- filtros y búsqueda funcionan
- npm run lint pasa
- npm run build pasa

## Reglas
No cambiar lógica crítica.
No tocar Zustand salvo que sea necesario.
No romper Mapbox.
No romper filtros.
No romper creación de incidencias.
No agregar librerías.
No usar Tailwind.
Solo mejorar UI/UX con SCSS y componentes existentes.

## Objetivo visual
Mejorar la UI hacia un estilo SaaS premium minimalista:
- glassmorphism sutil
- soft UI
- sombras suaves
- tarjetas limpias
- buen contraste
- diseño moderno
- menos carga visual
- responsive limpio

## Inspiración visual
- Linear
- Vercel
- Raycast
- Stripe Dashboard
- Interfaces soft UI modernas