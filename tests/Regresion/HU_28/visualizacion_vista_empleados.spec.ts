import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_28', () => {
    //test.setTimeout(40000);
    test('ID: TC-HU28.CA2 - Visualización de lista de empleados', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_28',
        title: 'ID: TC-HU28.CA2 - Visualización de lista de empleados',
        description: `**Descripción**: El capability lead puede ver el perfil de los que esta encargado

**Precondiciones**:
1. Usuario autenticado como capability
2. Capability con empleados

**Navegador**: ${browserName}`,
        severity: 'normal',
        priority: 'medium',
        layer: 'e2e',
        milestone: 'Sprint 3',
        parameters: {
          'Usuario': 'a00836530@tec.mx',
          'Navegador': browserName
        }
      }, browserName);

      let testFailed = false
      const nombreEmpleado = 'Alfredo Emir Puente Medrano';

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


        await test.step('Ver perfiles de empleados', async () => {

            await page.waitForTimeout(1000);

            await page.goto('https://pathexplorer-esquimales.vercel.app/employee/capability-lead/perfiles-de-empleados')
            
            await page.getByRole('heading', { name: nombreEmpleado }).click();

            // Espera a que se abra el módulo/perfil y verifica que el nombre aparece en el detalle
            await expect(page.getByRole('heading', { name: nombreEmpleado, level: 2 })).toBeVisible({ timeout: 5000 });

            await attachScreenshot(testInfo, 'Se pudo entrar al proyecto', page);         
            
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