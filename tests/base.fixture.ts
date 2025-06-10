// tests/base.fixture.ts
import { test as base, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

// Tipo para los metadatos de las pruebas
interface TestMetadata {
  hu: string;
  caseId?: number;
  title: string;
  description: string;
  severity?: 'blocker' | 'critical' | 'major' | 'normal' | 'minor' | 'trivial';
  priority?: 'high' | 'medium' | 'low';
  layer?: 'e2e' | 'api' | 'unit';
  milestone?: string;
  parameters?: Record<string, string>;
}

// Tipos de usuarios para autenticación
type UserType = 'talent-lead' | 'employee' | 'none';

interface AuthConfig {
  email: string;
  password: string;
  redirectTo?: string;
}

// Configuraciones de usuarios
const USER_CONFIGS: Record<Exclude<UserType, 'none'>, AuthConfig> = {
  'talent-lead': {
    email: 'rantonion2004@outlook.com',
    password: 'password',
    redirectTo: 'https://pathexplorer-esquimales.vercel.app/employee/people-lead/talent-discussions'
  },
  'employee': {
    email: 'A01741300@tec.mx',
    password: 'password123',
    redirectTo: 'https://pathexplorer-esquimales.vercel.app/employee'
  }
};

// Fixture base sin autenticación
export const baseTest = base.extend({
  page: async ({ page }, use) => {
    await use(page);
  },
});

// Fixture para Talent Lead (comportamiento original)
export const talentLeadTest = base.extend({
  page: async ({ page }, use) => {
    const config = USER_CONFIGS['talent-lead'];
    await authenticateUser(page, config);
    await page.getByRole('link', { name: 'Talent lead' }).click();
    await use(page);
  },
});

// Fixture para Employee
export const employeeTest = base.extend({
  page: async ({ page }, use) => {
    const config = USER_CONFIGS['employee'];
    await authenticateUser(page, config);
    // Employee se queda en la página principal sin redirección automática
    await use(page);
  },
});

// Función helper para autenticación
async function authenticateUser(page: any, config: AuthConfig) {
  await page.goto('https://pathexplorer-esquimales.vercel.app/');
  await page.getByRole('textbox', { name: 'Email' }).fill(config.email);
  await page.getByRole('textbox', { name: 'Contraseña' }).fill(config.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  
  if (config.redirectTo) {
    await page.goto(config.redirectTo);
  }
}

// Función helper para configurar casos de Qase con jerarquía
export function configureQaseTest(metadata: TestMetadata, browserName: string) {
  const { hu, caseId, title, description, severity, priority, layer, milestone, parameters } = metadata;
  
  // Configurar la jerarquía: Suite Root > Navegador > HU > Prueba
  const browserDisplayName = browserName === 'chromium' ? 'Chrome' : 
                            browserName === 'firefox' ? 'Firefox' : 
                            browserName.charAt(0).toUpperCase() + browserName.slice(1);
  
  // Solo configurar la suite del navegador - la HU se manejará con describe anidado
  qase.suite(browserDisplayName);
  
  try {
    if (caseId) {
      qase.id(caseId);
    }
    
    qase.title(`${title}`);
    
    qase.fields({
      description: description,
      severity: severity || 'normal',
      priority: priority || 'medium',
      layer: layer || 'e2e',
      milestone: milestone || 'Current Sprint',
      // Agregar metadatos del navegador
      browser: browserDisplayName,
      hu: hu
    });
    
    if (parameters) {
      qase.parameters(parameters);
    }
    
  } catch (error) {
    if (error && typeof error === 'object' && 'message' in error && 
        typeof error.message === 'string' && error.message.includes('Test case not found')) {
      console.warn(`Caso ${caseId} no existe en Qase - Creando nuevo en suite: ${browserDisplayName}`);
      qase.fields({
        description: 'Creado automáticamente por ejecución de prueba'
      });
    }
  }
}

// Helper mejorado para adjuntar screenshots con contexto garantizando formato PNG
export async function attachScreenshot(testInfo: any, name: string, page: any) {
  try {
    if (!page.isClosed()) {
      // Asegurar que el nombre termine con .png
      const screenshotName = name.endsWith('.png') ? name : `${name}.png`;
      
      // Capturar screenshot con configuración específica para PNG
      const screenshot = await page.screenshot({ 
        fullPage: true,
        type: 'png', // Forzar formato PNG explícitamente
        quality: 90   // Solo aplica para JPEG, pero es buena práctica incluirlo
      });
      
      await testInfo.attach(screenshotName, { 
        body: screenshot, 
        contentType: 'image/png' // Especificar explícitamente el MIME type
      });
      
      console.log(`Screenshot capturado: ${screenshotName}`);
    }
  } catch (error) {
    console.warn(`No se pudo capturar screenshot ${name}: ${error}`);
  }
}

// Versión alternativa con validación adicional
export async function attachScreenshotWithValidation(testInfo: any, name: string, page: any) {
  try {
    if (!page.isClosed()) {
      // Limpiar nombre para evitar caracteres problemáticos
      const cleanName = name.replace(/[^a-zA-Z0-9_-]/g, '_');
      const screenshotName = `${cleanName}.png`;
      
      // Capturar screenshot
      const screenshot = await page.screenshot({ 
        fullPage: true,
        type: 'png',
        animations: 'disabled' // Evitar animaciones que puedan causar problemas
      });
      
      // Validar que el buffer no esté vacío
      if (screenshot && screenshot.length > 0) {
        await testInfo.attach(screenshotName, { 
          body: screenshot, 
          contentType: 'image/png'
        });
        
        console.log(`✓ Screenshot capturado exitosamente: ${screenshotName} (${screenshot.length} bytes)`);
      } else {
        console.warn(`⚠ Screenshot vacío para: ${screenshotName}`);
      }
    } else {
      console.warn(`⚠ La página está cerrada, no se puede capturar: ${name}`);
    }
  } catch (error) {
    console.error(`✗ Error al capturar screenshot ${name}:`, error);
    
    // Intentar capturar información adicional del error
    await testInfo.attach(`Error_${name}.txt`, { 
      body: Buffer.from(`Error capturando screenshot: ${error}`), 
      contentType: 'text/plain' 
    });
  }
}

// Helper adicional para casos especiales donde necesites mayor control
export async function attachScreenshotWithMetadata(
  testInfo: any, 
  name: string, 
  page: any, 
  options: {
    fullPage?: boolean;
    clip?: { x: number; y: number; width: number; height: number };
    timeout?: number;
  } = {}
) {
  try {
    const { fullPage = true, clip, timeout = 5000 } = options;
    
    if (!page.isClosed()) {
      const screenshotName = `${name}.png`;
      
      const screenshotOptions: any = {
        type: 'png',
        fullPage,
        timeout
      };
      
      if (clip) {
        screenshotOptions.clip = clip;
        screenshotOptions.fullPage = false; // clip requiere fullPage: false
      }
      
      const screenshot = await page.screenshot(screenshotOptions);
      
      await testInfo.attach(screenshotName, { 
        body: screenshot, 
        contentType: 'image/png',
        // Metadatos adicionales para Qase
        path: screenshotName
      });
      
      console.log(`📸 Screenshot: ${screenshotName}`);
    }
  } catch (error) {
    console.error(`📸 Error en screenshot ${name}:`, error);
  }
}

// Helper para manejo de errores
export async function handleTestError(error: unknown, testInfo: any, page: any) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  await testInfo.attach('Error Details', { 
    body: Buffer.from(`Error: ${errorMessage}`), 
    contentType: 'text/plain' 
  });

  if (!page.isClosed()) {
    await attachScreenshot(testInfo, 'Error Screenshot', page);
  }
  
  throw error;
}

// Exportar el test original como alias para compatibilidad
export const test = talentLeadTest;
export { expect };