import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_17', () => {
    test('ID: TC-HU17.CA2 - Validación de permisos', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_17',
        title: 'ID: TC-HU17.CA2 - Validación de permisos',
        description: `**Descripción**: Al verificar algo del perfil(por ejemplo) se deben de validar los permisos para que empleados normales no puedan verlo

**Precondiciones**:
1. Usuario autenticado como admin
2. Usuario autenticado solo como empleado

**Navegador**: ${browserName}`,
        severity: 'critical',
        priority: 'medium',
        layer: 'e2e',
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
            await page.getByRole('textbox', { name: 'Email' }).fill('a00836530@tec.mx');
            await page.getByRole('textbox', { name: 'Contraseña' }).click();
            await page.getByRole('textbox', { name: 'Contraseña' }).fill('password');
            await attachScreenshot(testInfo, 'Credenciales ingresadas', page);
        });

        await test.step('Enviar formulario de login', async () => {
          
            await page.getByRole('textbox', { name: 'Contraseña' }).press('Enter');
            await page.getByRole('button', { name: 'Sign in' }).click();
            await attachScreenshot(testInfo, 'Login enviado', page);
        });


        await test.step('Ver otro perfil ajeno', async () => {

            await page.waitForTimeout(2000);

            await page.goto('https://pathexplorer-esquimales.vercel.app/employee/perfil/900fdfaf-7517-4876-8d20-b83da73a8347')
            
            await expect(page.getByText('Este perfil no es tuyo.')).toBeVisible()
            
            await page.locator('button:has(svg.lucide-log-out)').click();

            await attachScreenshot(testInfo, 'Perfil ajeno no se pudo ver', page);         
            
        });

        await test.step('Ingresar credenciales válidas admin', async () => {
            await page.getByRole('textbox', { name: 'Email' }).click();
            await page.getByRole('textbox', { name: 'Email' }).fill('rantonion2004@outlook.com');
            await page.getByRole('textbox', { name: 'Contraseña' }).click();
            await page.getByRole('textbox', { name: 'Contraseña' }).fill('password');
            await attachScreenshot(testInfo, 'Credenciales ingresadas admin', page);
        });

        await test.step('Enviar formulario de login admin', async () => {
          
            await page.getByRole('textbox', { name: 'Contraseña' }).press('Enter');
            await page.getByRole('button', { name: 'Sign in' }).click();
            await attachScreenshot(testInfo, 'Login enviado', page);
        });

        await test.step('Ver perfiles ajenos como admin ', async () => {

            await page.getByRole('link', { name: 'Perfiles de Empleados' }).click();


            // Busca la fila que contiene el nombre "Jorge Betanzo"
            const fila = page.locator('tr', { hasText: 'Jorge Beyanzo' });

            // Haz click en el enlace "Editar usuario" dentro de esa fila
            await fila.getByRole('link', { name: 'Editar usuario' }).click();

            await expect(page.getByText('Este perfil no es tuyo.')).not.toBeVisible()

            await attachScreenshot(testInfo, 'Perfil visto', page);         
            
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