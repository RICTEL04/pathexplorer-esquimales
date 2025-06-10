import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_06', () => {
    test('ID: TC-HU06.CA5 Proyectos permiten filtros de titulo y aplicabilidad', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_06',
        title: 'ID: TC-HU06.CA5 Proyectos permiten filtros de titulo y aplicabilidad',
        description: `**Descripción**: Los proyectos permiten ser filtrados por titulo y si aplicas o no aplicas.

**Precondiciones**:
1. Usuario autenticado como empleado
2. Debe de haber proyectos en el sistema

**Navegador**: ${browserName}`,
        severity: 'minor',
        priority: 'low',
        layer: 'e2e',
        milestone: 'Sprint 3',
        parameters: {
          'Usuario': 'rantonion2004@outlook.com',
          'Navegador': browserName
        }
      }, browserName);

      let testFailed = false;
      const nombreExperiencia = 'QA con hab' + browserName; 
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


        await test.step('Verificar filtros de aplicabilidad', async () => {
          await page.goto('https://pathexplorer-esquimales.vercel.app/employee/perfil/386e63ba-dc8f-4af6-9447-44f7976a4a0c');
          await page.getByRole('link', { name: 'Proyectos' }).click();
          await page.getByRole('button', { name: 'Proyectos disponibles'}).click();
          await page.getByRole('button', { name: 'Aplicas', exact: true }).click();
          await page.getByRole('heading', { name: 'No hay proyectos para mostrar.' }).isVisible() === false;
          await page.getByRole('button', { name: 'No aplicas' }).click();
          await page.getByRole('heading', { name: 'No hay proyectos para mostrar.' }).isVisible();

          await attachScreenshot(testInfo, 'Verificó filtros de aplicabilidad', page);
        });

        await test.step('Verificar filtros texto', async () => {
          
          await page.getByRole('button', { name: 'Todos' }).click();
          await page.getByRole('heading', { name: 'No hay proyectos para mostrar.' }).isVisible() === false;

          await page.getByRole('textbox', { name: 'Buscar por título o ID...' }).fill('No');
          await page.getByRole('heading', { name: 'No hay proyectos para mostrar.' }).isVisible();

          await page.getByRole('textbox', { name: 'Buscar por título o ID...' }).fill('Test');

          await page.getByRole('heading', { name: 'PostgreSQL' }).isVisible();
          await page.getByRole('heading', { name: 'Scrum Mastery' }).isVisible();
          await page.getByRole('heading', { name: 'Spring Boot' }).isVisible();

          await page.getByRole('textbox', { name: 'Buscar por título o ID...' }).fill('Nada');
          await page.getByRole('heading', { name: '2025-06-09' }).isVisible();

          await page.getByRole('button', { name: 'Aplicas', exact: true }).click();
          await page.getByRole('heading', { name: '2025-06-09' }).isVisible();

          await page.getByRole('button', { name: 'No aplicas' }).click();
          await page.getByRole('heading', { name: 'No hay proyectos para mostrar.' }).isVisible();

          await attachScreenshot(testInfo, 'Verificó filtros de texto', page);
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