import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_14', () => {
    test('ID: TC-HU14.CA2 Verificacion de sugerencias acorde al historial profesional', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_14',
        title: 'ID: TC-HU14.CA2 Verificacion de sugerencias acorde al historial profesional',
        description: `**Descripción**: Los cursos recomendados son acorde al historial profesional.

**Precondiciones**:
1. Usuario tiene acceso al path de carrera
2. Usuario tiene un historial profesional con al menos 1 trabajo

**Navegador**: ${browserName}`,
        severity: 'normal',
        priority: 'medium',
        layer: 'api',
        milestone: 'Sprint 1',
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


        await test.step('Verificar historial profesional', async () => {
          
          await page.goto('https://pathexplorer-esquimales.vercel.app/employee/perfil/5f096705-11c3-49b1-b42c-d7bd17a75439');
          await page.getByText('IA developer').isVisible();
          await page.getByText('Backend Developer').isVisible();
          await attachScreenshot(testInfo, 'Historial profesional', page);
        });

        
        await test.step('Verificar cursos y certificados recomendados', async () => {
          
          await page.goto('https://pathexplorer-esquimales.vercel.app/employee/path-de-carrera');
          await page.getByText('React Development').isVisible();
          await page.getByText('Curso python').isVisible();
          await page.getByText('C++').isVisible();

          await attachScreenshot(testInfo, 'Cursos recomendados validos', page);
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