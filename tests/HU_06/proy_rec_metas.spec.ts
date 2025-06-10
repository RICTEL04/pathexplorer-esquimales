import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_06', () => {
    test('ID: TC-HU06.CA6 Proyectos recomendados basados en metas', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_06',
        title: 'ID: TC-HU06.CA6 Proyectos recomendados basados en metas',
        description: `**Descripción**: Los proyectos recomendados para el empleado estan basados en las metas.

**Precondiciones**:
1. Usuario autenticado como empleado
2. Tiene metas

**Navegador**: ${browserName}`,
        severity: 'normal',
        priority: 'medium',
        layer: 'api',
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
          await page.getByRole('link', { name: /perfil|Profile|Mi perfil/i }).waitFor({ timeout: 10000 });
          await attachScreenshot(testInfo, 'Login enviado', page);
        });


        await test.step('Verificar metas', async () => {
          
          await page.goto('https://pathexplorer-esquimales.vercel.app/employee/perfil/386e63ba-dc8f-4af6-9447-44f7976a4a0c');
          await page.getByRole('link', { name: 'Metas' }).click();

          await page.getByRole('heading', { name: 'Aprender .NET con C#' }).nth(1).click();
          await page.getByRole('button', { name: 'Cerrar' }).click();
          await page.getByRole('heading', { name: 'Python' }).click();
          await page.getByRole('button', { name: 'Cerrar' }).click();
          await attachScreenshot(testInfo, 'Verificó las metas', page);
        });

        await test.step('Verificar todos los proyectos' , async () => {
            await page.goto('https://pathexplorer-esquimales.vercel.app/employee/proyectos')
            //await page.getByRole('link', { name: 'Proyectos' }).click();
            await page.getByRole('button', { name: 'Proyectos disponibles' }).click();
            await page.getByRole('heading', { name: 'vector DBs' }).isVisible();
            await page.getByRole('heading', { name: 'AI code review' }).isVisible();
            await page.getByRole('heading', { name: 'Tailwind CSS' }).isVisible();
            await attachScreenshot(testInfo, 'Verificó las ha de un proyecto disponible', page);
        })

        await test.step('Verificar proyectos recomendados' , async () => {
            await page.getByRole('button', { name: 'Proyectos sugeridos' }).click();
            await page.getByRole('heading', { name: 'vector DBs' }).isVisible();
            await page.getByRole('heading', { name: 'AI code review' }).isVisible();
            await page.getByRole('heading', { name: 'Tailwind CSS' }).isVisible();
            await attachScreenshot(testInfo, 'Verificó las habilidades de un proyecto disponible y como se compara con las metas', page);
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