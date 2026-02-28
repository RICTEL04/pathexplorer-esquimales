import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_28', () => {
    //test.setTimeout(40000);
    test('ID: TC-HU28.CA2 - Visualización de empleados con y sin proyectos asignados', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_28',
        title: 'ID: TC-HU28.CA2 - Visualización de empleados con y sin proyectos asignados',
        description: `**Descripción**: El capability lead puede ver el los empleados con y sin proyectos asignados

**Precondiciones**:
1. Usuario autenticado como capability
2. Capability con empleados
3. Empleados con proyectos asignados
4. Empleados sin proyectos asignados

**Navegador**: ${browserName}`,
        severity: 'normal',
        priority: 'low',
        layer: 'e2e',
        milestone: 'Sprint 3',
        parameters: {
          'Usuario': 'a01722728@tec.mx',
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


        await test.step('Ver perfiles de empleados sin proyectos asignados', async () => {

            // Empleados sin proyectos asignados
            const moduloSinProyectos = page.getByRole('heading', { name: /Empleados sin proyectos asignados/i });
            await expect(moduloSinProyectos).toBeVisible();

            const listaSinProyectos = moduloSinProyectos.locator('xpath=../../..').locator('ul > li');
            await expect(listaSinProyectos.first()).toBeVisible();
            const sinProyectosCount = await listaSinProyectos.count();
            expect(sinProyectosCount).toBeGreaterThan(0);

            await attachScreenshot(testInfo, 'Se pudo ver que empleados no tienen proyecto asignado', page);         
            
        });

        await test.step('Ver perfiles de empleados con proyectos asignados', async () => {

            const moduloConProyectos = page.getByRole('heading', { name: /Empleados con proyectos asignados/i });
            await expect(moduloConProyectos).toBeVisible();

            const listaConProyectos = moduloConProyectos.locator('xpath=../../..').locator('ul > li');
            await expect(listaConProyectos.first()).toBeVisible();
            const conProyectosCount = await listaConProyectos.count();
            expect(conProyectosCount).toBeGreaterThan(0);

            await attachScreenshot(testInfo, 'Se puede ver que empleados si tienen proyectos asignados', page);         
            
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