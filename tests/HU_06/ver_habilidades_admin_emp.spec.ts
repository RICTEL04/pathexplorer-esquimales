import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_06', () => {
    test('ID: TC-HU06.CA9 Solo el admin y el empleado pueden acceder a la vista de habilidades desde el perfil', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_06',
        title: 'ID: TC-HU06.CA9 Solo el admin y el empleado pueden acceder a la vista de habilidades desde el perfil',
        description: `**Descripción**: Tanto el administrador como el empleado son los unicos que pueden acceder a sus propias habilidades.

**Precondiciones**:
1. Usuario autenticado como empleado
2. Tiene rol de admin

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
          await page.getByRole('link', { name: /perfil|Profile|Mi perfil/i }).waitFor({ timeout: 10000 });
          await attachScreenshot(testInfo, 'Login enviado', page);
        });


        await test.step('Verificar si puedo ver mis habilidades', async () => {
          
          await page.goto('https://pathexplorer-esquimales.vercel.app/employee/perfil/386e63ba-dc8f-4af6-9447-44f7976a4a0c');
          await page.getByText('Habilidades técnicas').isVisible();
          await attachScreenshot(testInfo, 'Verificó mis habilidades', page);
        });

        await test.step('Verificar que no puedo ver las habilidades de otro' , async () => {

            await page.goto('https://pathexplorer-esquimales.vercel.app/employee/perfil/3912d459-b96e-4150-9a2a-fb9135ebc374');
            await page.getByText('Este perfil no es tuyo.').isVisible();
            await page.getByRole('button', { name: 'Ir a mi perfil' }).click();
            await attachScreenshot(testInfo, 'Verificó que no puedo ver las habilidades de otro', page);
        })

        
        await test.step('Verificar que el admin puede ver las habilidades de otro', async () => {
          await page.goto('https://pathexplorer-esquimales.vercel.app/admin/empleados');
          //await page.getByRole('link', { name: 'Perfiles de Empleados' }).click();
          await page.getByRole('cell', { name: 'Jose', exact: true }).isVisible();
          await page.getByRole('row', { name: 'Jose Jose@gmail.com Dev HR 4/24/2025' }).getByRole('link').click();
          await page.getByText('Habilidades técnicas', { exact: true }).isVisible();
          await attachScreenshot(testInfo, 'Habilidades tecnicas de otro', page);
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