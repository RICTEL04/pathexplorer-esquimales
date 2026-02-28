import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_17', () => {
    test('ID: TC-HU17.CA1 - Acceso restringido a administradores Regresion', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_17',
        title: 'ID: TC-HU17.CA1 - Acceso restringido a administradores Regresion',
        description: `**Descripción**: Acceso restringido a la pestaña de admin

**Precondiciones**:
1. Usuario autenticado como employee

**Navegador**: ${browserName}`,
        severity: 'critical',
        priority: 'medium',
        layer: 'e2e',
        milestone: 'Sprint 3',
        parameters: {
          'Usuario': 'a00836530@tec.mx',
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
            await page.getByRole('textbox', { name: 'Email' }).fill('a00836530@tec.mx');
            await page.getByRole('textbox', { name: 'Contraseña' }).click();
            await page.getByRole('textbox', { name: 'Contraseña' }).fill('password');
            await attachScreenshot(testInfo, 'Credenciales ingresadas', page);
        });

        await test.step('Enviar formulario de login', async () => {
          
            await page.getByRole('textbox', { name: 'Contraseña' }).press('Enter');
            await page.getByRole('button', { name: 'Sign in' }).click();
            await attachScreenshot(testInfo, 'Login enviado', page);
        });


        await test.step('Validar admin', async () => {

            await page.goto('https://pathexplorer-esquimales.vercel.app/admin')

            await expect(page.getByText('No hay certificados por validar')).not.toBeVisible();

            if(await page.getByText('Sesión expirada').isVisible)
            {
                await page.getByRole('button' , { name: 'Ir al inicio' } ).click()
            }



            
            
            await attachScreenshot(testInfo, 'Se muestra un modal de lo que pasa si intentas entrar como admin', page);
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