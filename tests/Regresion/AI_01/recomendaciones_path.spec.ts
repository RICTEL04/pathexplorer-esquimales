import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('AI_01', () => {
    //test.setTimeout(40000);
    test('ID: TC-AI01.CA2 - Recomendaciones basadas en plan de carrera seleccionado', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'AI_01',
        title: 'ID: TC-AI01.CA2 - Recomendaciones basadas en plan de carrera seleccionado',
        description: `**Descripción**: El path de carrera debe de dar recomendaciones en base al path

**Precondiciones**:
1. Usuario autenticado como empleado
**Navegador**: ${browserName}`,
        severity: 'major',
        priority: 'medium',
        layer: 'api',
        milestone: 'Sprint 3',
        parameters: {
          'Usuario': 'rantonion2004@outlook.com',
          'Navegador': browserName
        }
      }, browserName);

      let testFailed = false

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


        await test.step('Ver perfiles de empleados sin proyectos asignados', async () => {

            await page.waitForTimeout(1000)
            await page.goto("https://pathexplorer-esquimales.vercel.app/employee/path-de-carrera")

            await expect(page.getByText('Recomendaciones:')).toBeVisible({ timeout: 15000 })

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