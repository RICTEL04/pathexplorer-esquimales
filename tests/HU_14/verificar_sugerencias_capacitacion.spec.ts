// tests/auth/login.spec.ts
import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_14', () => {
    test('ID: TC-HU14.CA1 Verificacion de existencia de sugerencias para capacitacion', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_14',
        title: 'ID: TC-HU14.CA1 Verificacion de existencia de sugerencias para capacitacion',
        description: `**Descripción**: El path de carrera le brinda al empleado sugerencias de certificados para certificacion.

**Precondiciones**:
1. Usuario tiene acceso al path de carrera

**Navegador**: ${browserName}`,
        severity: 'normal',
        priority: 'medium',
        layer: 'api',
        milestone: 'Sprint 1',
        parameters: {
          'Usuario': 'A01741300@tec.mx',
          'Navegador': browserName
        }
      }, browserName);

      let testFailed = false;

      try {
        await test.step('Navegar a la página de login', async () => {
          await page.goto('https://pathexplorer-esquimales.vercel.app/');
          await attachScreenshot(testInfo, 'Página de login', page);
        });

        await test.step('Ingresar credenciales válidas', async () => {
          await page.getByRole('textbox', { name: 'Email' }).click();
          await page.getByRole('textbox', { name: 'Email' }).fill('A01741300@tec.mx');
          await page.getByRole('textbox', { name: 'Contraseña' }).click();
          await page.getByRole('textbox', { name: 'Contraseña' }).fill('password123');
          await attachScreenshot(testInfo, 'Credenciales ingresadas', page);
        });

        await test.step('Enviar formulario de login', async () => {
          await page.getByRole('textbox', { name: 'Contraseña' }).press('Enter');
          await page.getByRole('button', { name: 'Sign in' }).click();
          await attachScreenshot(testInfo, 'Login enviado', page);
        });

        await test.step('Verificar login exitoso', async () => {
          // Verificar que fuimos redirigidos a la página del empleado
          await page.goto('https://pathexplorer-esquimales.vercel.app/employee/path-de-carrera');
          await attachScreenshot(testInfo, 'Enviar a employee', page);
        });

        await test.step('Verificar sugerencias de capacitacion', async () => {
          await page.getByRole('heading', { name: 'Cursos Recomendados:' }).isVisible();
          await attachScreenshot(testInfo, 'Enviar a employee', page);
        })

      } catch (error) {
        testFailed = true;
        if (!page.isClosed()) {
          await handleTestError(error, testInfo, page);
        } else {
          await testInfo.attach('Error Details', { 
            body: Buffer.from(`Error: ${error instanceof Error ? error.message : String(error)}`), 
            contentType: 'text/plain' 
          });
        }
        throw error;
      } finally {
        if (testFailed && !page.isClosed()) {
          await page.close();
        }
      }
    });
  });
});