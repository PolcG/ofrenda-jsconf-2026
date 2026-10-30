# Gotty · Nueve vidas, infinitas huellas

Ofrenda digital de Paul para AWS JSConf México 2026, basada en `anacunha/jsconfmx-ofrenda`.

**Sitio público:** https://production.d3afjve66e6jt6.amplifyapp.com/

## La experiencia

- Vela interactiva que revela la dedicatoria e ilumina el altar.
- Cuatro fotografías reales de Gotty en un álbum ampliable con teclado.
- Ritual de nueve flores: cada flor ilumina una estrella hasta dibujar un gato.
- Cielo animado, pétalos de cempasúchil y diseño adaptable a celular.
- Compartir mediante el sistema del dispositivo o copiar el enlace.
- Respeta la preferencia de movimiento reducido.

El progreso de las flores se guarda únicamente en el navegador del visitante. No es un contador global y no se recopilan datos personales.

## Publicación

HTML, CSS y JavaScript sin dependencias ni compilación. La aplicación `ofrenda-gotty` está en AWS Amplify Hosting, región `us-east-2`, rama `production`.

El despliegue actual es manual: los cambios en GitHub se guardan como fuente, pero para actualizar el sitio hay que subir a Amplify un ZIP con `index.html`, `styles.css`, `script.js` y las cuatro imágenes en la raíz.
