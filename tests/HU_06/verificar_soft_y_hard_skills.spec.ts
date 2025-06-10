import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_06', () => {
    test('ID: TC-HU06.CA2 Verificacion de separacion de habilidades', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_06',
        title: 'ID: TC-HU06.CA2 Verificacion de separacion de habilidades',
        description: `**Descripción**: El empleado puede tener tanto softskills como hardskills.

**Precondiciones**:
1. Usuario autenticado como empleado
2. Usuario tiene al menos una softskill y una hardskill

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
      const nombreExperiencia = 'QA ' + browserName; 
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
          await page.getByRole('link', { name: /perfil|Profile|Mi perfil/i }).waitFor({ timeout: 10000 });
          await attachScreenshot(testInfo, 'Login enviado', page);
        });


        await test.step('Verificar habilidades', async () => {
          
          await page.goto('https://pathexplorer-esquimales.vercel.app/employee/perfil/386e63ba-dc8f-4af6-9447-44f7976a4a0c');
          await page.getByText('Habilidades técnicas').isVisible();
          await page.getByRole('heading', { name: 'React/Next.js' }).isVisible();
          await page.getByText('Habilidades blandas').isVisible();
          await page.getByRole('heading', { name: 'Communication' }).isVisible();
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