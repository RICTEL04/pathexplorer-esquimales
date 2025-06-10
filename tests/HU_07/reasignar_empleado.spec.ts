import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_07', () => {
    test('ID: TC-HU07.CA7 Se podrán reasignar empleados', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_07',
        title: 'ID: TC-HU07.CA7 Se podrán reasignar empleados',
        description: `**Descripción**: El capability lead podra reasignar a un empleado de un proyecto a otro(en este caso, eliminarlo de uno)

**Precondiciones**:
1. Usuario autenticado como capability
2. Hay un proyecto en progreso
3. Faltan empleados en el proyecto y hay opciones para postular

**Navegador**: ${browserName}`,
        severity: 'major',
        priority: 'high',
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
          await page.getByRole('button', { name: 'Capability lead' }).click();
          await page.getByRole('link', { name: 'Proyectos capability' }).click();

          await page.getByText('TestEn progresoCliente:').click();

          await attachScreenshot(testInfo, 'Entrar al modal', page);
        });

        await test.step('Quitar a un empleado del proyecto' , async () => {

          await page.getByText('IA Dev').click();
          await page.getByText('31%').isVisible();
          await page.getByRole('button', { name: '×' }).click();
          await page.getByRole('button', { name: 'Sí, continuar' }).click();
          await page.getByText('1%').isVisible();

          await attachScreenshot(testInfo, 'Verificar que el empleado sea quitado del proyecto', page);
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