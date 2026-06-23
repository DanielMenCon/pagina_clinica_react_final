import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // o @vitejs/react-swc

// https://vite.dev/config/
export default defineConfig({
  base: '/pagina_clinica_react_landing/', //  AQUÍ SÍ, en la raíz
  plugins: [react()],
})