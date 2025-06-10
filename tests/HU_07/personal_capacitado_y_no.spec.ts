import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_07', () => {
    test('ID: TC-HU07.CA1 Se establecen métricas para identificar empleados con alto y bajo rendimiento para postular', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_07',
        title: 'ID: TC-HU07.CA1 Se establecen métricas para identificar empleados con alto y bajo rendimiento para postular',
        description: `**Descripción**: El capability lead podra identificar los empleados mas convenientes para cada proyecto a postular y a aquellos que necesitan capacitacion

**Precondiciones**:
1. Usuario autenticado como capability
2. Hay un proyecto en progreso
3. Faltan empleados en el proyecto y hay opciones para postular

**Navegador**: ${browserName}`,
        severity: 'normal',
        priority: 'medium',
        layer: 'api',
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


        await test.step('Entrar a la pestaña de capability lead y al modal', async () => {
          await page.getByRole('link', { name: 'Ver perfil' }).click();
          page.goto('https://pathexplorer-esquimales.vercel.app/employee/capability-lead/proyectos')

          await page.getByText('TestEn progresoCliente:').click();
          await page.locator('div').filter({ hasText: /^1 posiciones$/ }).first().click();

          await attachScreenshot(testInfo, 'Entrar al modal', page);
        });

        await test.step('Verificar los empleados mejor capacitados y peor capacitados' , async () => {

          await page.getByRole('button', { name: 'IA' }).click();

          await page.getByRole('button', { name: 'Personal mejor capacitado' }).click();
          await page.getByText('Sergio Ricardo Tellez Loaiza').isVisible();
          await page.getByRole('button', { name: 'Personal a capacitar' }).click();
          await page.getByText('Jose').isVisible();

          await attachScreenshot(testInfo, 'Verificar a los empleados mejor y peor capacitados', page);
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