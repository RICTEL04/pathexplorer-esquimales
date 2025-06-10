import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_10', () => {
    test('ID: TC-HU10.CA1_CA2_CA4_CA5 Visualizar datos del empleado', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_10',
        title: 'ID: TC-HU10.CA1_CA2_CA4_CA5 Visualizar datos del empleado',
        description: `**Descripción**: El people lead quiere poder visualizar datos relevantes acerca de su counsulee

**Precondiciones**:
1. Usuario autenticado como people lead
2. People lead con counsulees

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
          await page.getByRole('button', { name: 'People lead' }).click();
          await page.getByRole('link', { name: 'Counselee' }).click();
          await page.locator('div').filter({ hasText: /^Sergio Ricardo Tellez LoaizaAdmin$/ }).first().click();
          
          await attachScreenshot(testInfo, 'Entrar al counsulee', page);
        });

        await test.step('Detectar los campos que se necesitan ver' , async () => {

          await page.getByText("Habilidades técnicas").isVisible()
          await page.getByText("C/C++").isVisible()

          await page.getByText("Habilidades blandas").isVisible()
          await page.getByText("Communication").isVisible()

          await page.getByText("Intereses").isVisible()
          await page.getByText("Desarrollo web").isVisible()

          await page.getByText("Certificados").isVisible()
          await page.getByText("arch.pdf").isVisible()

          await page.getByText("Experiencia Laboral").isVisible()
          await page.getByText("IA developer").isVisible()

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