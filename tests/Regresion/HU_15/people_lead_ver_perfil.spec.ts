import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_15', () => {
    test('ID: TC-HU15.CA1 - Acceso al perfil de empleado gestionado Regresion', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_15',
        title: 'ID: TC-HU15.CA1 - Acceso al perfil de empleado gestionado Regresion',
        description: `**Descripción**: El People Lead debe poder acceder al perfil de cualquier empleado bajo su gestión.

**Precondiciones**:
1. Usuario autenticado como people lead
2. People lead tiene counsulees

**Navegador**: ${browserName}`,
        severity: 'major',
        priority: 'medium',
        layer: 'e2e',
        milestone: 'Sprint 3',
        parameters: {
          'Usuario': 'rantonion2004@outlook.com',
          'Navegador': browserName
        }
      }, browserName);

      let testFailed = false;
      const interes = "interes" + browserName;
      let interestTextBox: any = null;
      let dislikeTag: any = null;
      
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


        await test.step('Entrar al counsulee y escogerlo', async () => {
          await page.getByRole('link', { name: 'Ver perfil' }).click();
          await page.goto('https://pathexplorer-esquimales.vercel.app/employee/people-lead/empleados')
          await page.locator('div').filter({ hasText: /^Sergio Ricardo Tellez LoaizaAdmin$/ }).first().click();
          
          await attachScreenshot(testInfo, 'Entrar al counsulee', page);
        });

        await test.step('Detectar los campos que se necesitan ver' , async () => {

          await page.getByText("Habilidades técnicas").isVisible()
          await page.getByText("Habilidades blandas").isVisible()
          await page.getByText("Intereses").isVisible()
          await page.getByText("Certificados").isVisible()
          await page.getByText("Experiencia Laboral").isVisible()

          await attachScreenshot(testInfo, 'Detectar los campos que se necesitan ver', page);
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