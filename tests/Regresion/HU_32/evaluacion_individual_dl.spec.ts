import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_32', () => {
    //test.setTimeout(40000);
    test('ID: TC-HU32.CA3 - Ingreso de evaluación individual', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_32',
        title: 'ID: TC-HU32.CA3 - Ingreso de evaluación individual',
        description: `**Descripción**: El Delivery lead puede hacer una evaluacion al acabar un proyecto

**Precondiciones**:
1. Usuario autenticado como delivery
2. Proyecto finalizado y con revisiones pendientes

**Navegador**: ${browserName}`,
        severity: 'major',
        priority: 'medium',
        layer: 'e2e',
        milestone: 'Sprint 3',
        parameters: {
          'Usuario': 'a01722728@tec.mx',
          'Navegador': browserName
        }
      }, browserName);

      let testFailed = false
      let nombreProyecto = "Proyecto software evaluativo"

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


        await test.step('Ver proyectos y abrir formulario', async () => {

            await page.waitForTimeout(1000);

            await page.goto('https://pathexplorer-esquimales.vercel.app/employee/delivery-lead/proyectos')
            
            await page.getByRole('heading', { name: nombreProyecto }).click();

            // Espera a que se abra el módulo/perfil y verifica que el nombre aparece en el detalle
            await page.getByRole('button', { name: 'Dar retroalimentación' }).click();

            await attachScreenshot(testInfo, 'Se pudo ver el formulario', page);         
            
        });

        await test.step('Abrir empleado y verificar campos', async () => {

            await page.waitForTimeout(1000);

            const cardYolanda = page.getByText('Yolanda', { exact: true });
            await expect(cardYolanda).toBeVisible({ timeout: 10000 });
            await cardYolanda.click();

            await page.waitForTimeout(1000)

            const btnEnviar = page.getByRole('button', { name: 'Enviar Evaluación' });
            await expect(btnEnviar).toBeDisabled();

            await page.locator('button span:text("★")').first().click();

            // Llena fortalezas
            await page.getByLabel('Fortalezas:').fill('Muy buen trabajo en equipo');
            // Llena áreas de mejora
            await page.getByLabel('Áreas de Mejora:').fill('Podría mejorar la puntualidad');

            await expect(btnEnviar).toBeEnabled();

            await attachScreenshot(testInfo, 'Se verificaron que los campos funcionen adecuadamente', page);  
            
            
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