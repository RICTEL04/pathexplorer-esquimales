import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_31', () => {
    //test.setTimeout(40000);
    test('ID: TC-HU31.CA1.CA4 - Visualización del perfil del empleado en modal y filtrar', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_31',
        title: 'ID: TC-HU31.CA1.CA4 - Visualización del perfil del empleado en modal y filtrar',
        description: `**Descripción**: El capability lead quiere ver a sus empleados y filtrarlos

**Precondiciones**:
1. Usuario autenticado como capability
2. Capability tiene empleados encargados

**Navegador**: ${browserName}`,
        severity: 'normal',
        priority: 'medium',
        layer: 'e2e',
        milestone: 'Sprint 3',
        parameters: {
          'Usuario': 'a01722728@tec.mx',
          'Navegador': browserName
        }
      }, browserName);

      let testFailed = false
      let nombreEmpleado = "Jorge Betanzo"

      try {
        await test.step('Navegar a la página de login', async () => {
            await page.goto('https://pathexplorer-esquimales.vercel.app/');
            await attachScreenshot(testInfo, 'Página de login', page);
        });

        await test.step('Ingresar credenciales válidas', async () => {
            await page.getByRole('textbox', { name: 'Email' }).click();
            await page.getByRole('textbox', { name: 'Email' }).fill('a01722728@tec.mx');
            await page.getByRole('textbox', { name: 'Contraseña' }).click();
            await page.getByRole('textbox', { name: 'Contraseña' }).fill('password123');
            await attachScreenshot(testInfo, 'Credenciales ingresadas', page);
        });

        await test.step('Enviar formulario de login', async () => {
          
            await page.getByRole('textbox', { name: 'Contraseña' }).press('Enter');
            await page.getByRole('button', { name: 'Sign in' }).click();
            await attachScreenshot(testInfo, 'Login enviado', page);
        });


        await test.step('Ver empleados y abrir su modulo', async () => {

            await page.waitForTimeout(1000);

            await page.goto('https://pathexplorer-esquimales.vercel.app/employee/capability-lead/perfiles-de-empleados')
            
            const cardBetanzo = page.getByRole('heading', { name: nombreEmpleado, level: 2 });
            await expect(cardBetanzo).toBeVisible({ timeout: 5000 });
            await cardBetanzo.click();
            
            await expect(page.getByRole('heading', { name: nombreEmpleado, level: 2 })).toBeVisible({ timeout: 5000 });

            await attachScreenshot(testInfo, 'Se pudo ver la informacion del empleado', page);         
            
        });

        await test.step('Filtrar por nombre', async () => {

            
            const listaEmpleados = page.locator('div.overflow-y-scroll.overflow-x-hidden');
            const textBox = await page.getByPlaceholder('Buscar por nombre o ID empleado');

            await textBox.fill("Betanzo");
            await expect(listaEmpleados.getByText('Jorge Betanzo', { exact: true })).toBeVisible({ timeout: 3000 });
            await expect(listaEmpleados.getByText('Jorge Beyanzo', { exact: true })).toBeHidden({ timeout: 3000 });

            await textBox.fill("Beyanzo");
            await expect(listaEmpleados.getByText('Jorge Beyanzo', { exact: true })).toBeVisible({ timeout: 3000 });
            await expect(listaEmpleados.getByText('Jorge Betanzo', { exact: true })).toBeHidden({ timeout: 3000 });

            await textBox.fill('900fdfaf-7517-4876-8d20-b83da73a8347');
            await expect(listaEmpleados.getByText('Jorge Betanzo', { exact: true })).toBeVisible({ timeout: 3000 });


            await attachScreenshot(testInfo, 'Se pudieron filtrar los empleados', page);         
            
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