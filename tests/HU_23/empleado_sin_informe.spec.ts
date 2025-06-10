import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_23', () => {
    test('ID: TC-HU23.CA1 Empleado sin informes', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_23',
        title: 'ID: TC-HU23.CA1 Empleado sin informes',
        description: `**Descripción**: Si el empleado no tiene informes, no aparece el modulo

**Precondiciones**:
1. Usuario autenticado como admin
2. Usuario a revisar no tiene informes

**Navegador**: ${browserName}`,
        severity: 'minor',
        priority: 'low',
        layer: 'e2e',
        milestone: 'Sprint 3',
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


        await test.step('Entrar a la pestaña de admin y al perfil del empleado', async () => {
          
          await page.getByRole('link', { name: 'Perfiles de Empleados' }).click();
          await page.getByRole('cell', { name: 'Jorge Beyanzo' }).click();
          await page.getByRole('row', { name: 'Jorge Beyanzo a01198676@tec.' }).getByRole('link').click();
          await attachScreenshot(testInfo, 'Visitar al empleado a analizar', page);
        });

        await test.step('Ver los informes del empleado' , async () => {
          await page.getByRole('button', { name: 'No hay informes disponibles' }).isVisible();

          await attachScreenshot(testInfo, 'No habia informes a analizar', page);
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