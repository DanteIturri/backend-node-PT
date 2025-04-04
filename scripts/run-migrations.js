#!/usr/bin/env node

/**
 * Script para ejecutar migraciones de Prisma
 * Ejecuta: 
 * - node scripts/run-migrations.js
 * - o usando npm/pnpm run migrate
 */

import { spawn } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Cargar variables de entorno
dotenv.config();

// Obtener el directorio actual del script (para ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🚀 Ejecutando migraciones de Prisma...');
console.log(`📁 Directorio raíz: ${rootDir}`);

// Utilizar spawn para ejecutar el comando prisma migrate dev
const prisma = spawn('npx', ['prisma', 'migrate', 'dev', '--name', `migration-${Date.now()}`], {
  cwd: rootDir,
  stdio: 'inherit',
  shell: true
});

prisma.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Migraciones aplicadas correctamente');
    console.log('🔄 Generando cliente Prisma...');
    
    const generate = spawn('npx', ['prisma', 'generate'], {
      cwd: rootDir,
      stdio: 'inherit',
      shell: true
    });
    
    generate.on('close', (genCode) => {
      if (genCode === 0) {
        console.log('✅ Cliente Prisma generado correctamente');
      } else {
        console.error(`❌ Error al generar el cliente Prisma. Código de salida: ${genCode}`);
        process.exit(genCode);
      }
    });
  } else {
    console.error(`❌ Error al ejecutar las migraciones. Código de salida: ${code}`);
    process.exit(code);
  }
});