/*
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://pathexplorer-esquimales.vercel.app/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('rantonion2004@outlook.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Ver perfil' }).click();
  await page.getByRole('navigation').getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
  await page.getByRole('link', { name: 'Validar certificados' }).click();
  await page.getByRole('heading', { name: 'Sergio Ricardo Tellez Loaiza' }).click();
  await page.getByText('certificado firefox').click();
  await page.getByText('certificado chromium').click();
  await page.getByText('Introducción a JavaScript').click();
  await page.getByRole('button', { name: 'Cerrar' }).click();
});
*/

import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_02', () => {
    test('ID: TC-HU2.CA1 - Ver listado de certificaciones del empleado seleccionado Regresion', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_02',
        title: 'ID: TC-HU2.CA1 - Ver listado de certificaciones del empleado seleccionado Regresion',
        description: `**Descripción**: El people lead quiere ver la lista de certificados de sus counsulees

**Precondiciones**:
1. Usuario autenticado como people lead
2. People lead tiene counsulees
3. Counsulees tienen certificados pendientes de validar o rechazar

**Navegador**: ${browserName}`,
        severity: 'normal',
        priority: 'medium',
        layer: 'e2e',
        milestone: 'Sprint 3',
        parameters: {
          'Usuario': 'rantonion2004@outlook.com',
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
            await page.getByRole('textbox', { name: 'Email' }).fill('rantonion2004@outlook.com');
            await page.getByRole('textbox', { name: 'Contraseña' }).click();
            await page.getByRole('textbox', { name: 'Contraseña' }).fill('password');
            await attachScreenshot(testInfo, 'Credenciales ingresadas', page);
        });

        await test.step('Enviar formulario de login', async () => {
          
            await page.getByRole('textbox', { name: 'Contraseña' }).press('Enter');
            await page.getByRole('button', { name: 'Sign in' }).click();
            await attachScreenshot(testInfo, 'Login enviado', page);
        });


        await test.step('Entrar al counsulee y ver sus certificados', async () => {

            await page.getByRole('link', { name: 'Ver perfil' }).click();
            await page.goto('https://pathexplorer-esquimales.vercel.app/employee/people-lead/validarCursos')

            await expect(page.getByText('No hay certificados por validar')).not.toBeVisible();

            await page.getByRole('heading', { name: 'Sergio Ricardo Tellez Loaiza' }).click();
            
            await attachScreenshot(testInfo, 'Entrar al counsulee y ver sus certificados', page);
        });

        await test.step('Detectar la lista de certificados', async () => {
            // Selecciona todas las filas del tbody
            const rows = page.locator('table.popup-table tbody tr');
            // Verifica que haya al menos una fila
            const rowCount = await rows.count();
            expect(rowCount).toBeGreaterThan(0);

            await attachScreenshot(testInfo, 'Detectar lista de certificados', page);
        });

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