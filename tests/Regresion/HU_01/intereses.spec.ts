// Update the import path below to the correct location of base.fixture.ts
import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../../base.fixture';
// For example, if base.fixture.ts is in the 'tests' folder, use:
// import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';
// Or if it's in the project root, use:
// import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../../../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_01', () => {
    test('ID: TC-HU01.CA6.1.2.3', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_01',
        title: 'ID: TC-HU01.CA6.1.2.3',
        description: `**Descripción**: Agregar interes, intentar agregar duplicado, eliminar interes y cancelar cambios

**Precondiciones**:
1. Usuario autenticado como empleado

**Navegador**: ${browserName}`,
        severity: 'normal',
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


        await test.step('Entrar al perfil y agregar interes', async () => {
            await page.getByRole('link', { name: 'Ver perfil' }).click();
            await page.getByRole('button', { name: 'Editar intereses' }).click();
            
            interestTextBox = await page.getByRole('textbox', { name: 'Añadir nuevo intereses' })
            await interestTextBox.fill(interes)

            await page.getByRole('button', { name: 'Agregar' }).click();
            await page.getByRole('button', { name: 'Guardar cambios' }).click();

            await page.getByRole('button', { name: 'Editar intereses' }).click();
            
            dislikeTag = page.locator(
              'div.flex.items-center.bg-purple-100',
              { hasText: interes }
            ).filter({
              has: page.locator(`button[aria-label="Eliminar ${interes}"]`)
            });

            await expect(dislikeTag).toBeVisible();
            await page.getByRole('button', { name: 'Cancelar' }).click();

            await attachScreenshot(testInfo, 'Entrar y agregar interes', page);
        });

        await test.step('Evitar duplicados' , async () => {

            await page.goto('https://pathexplorer-esquimales.vercel.app/employee/perfil/386e63ba-dc8f-4af6-9447-44f7976a4a0c')

            await page.getByRole('button', { name: 'Editar intereses' }).click();
              
            await interestTextBox.fill(interes)

            await page.getByRole('button', { name: 'Agregar' }).click();
            await page.getByRole('button', { name: 'Guardar cambios' }).click();
            
            await page.getByRole('button', { name: 'Editar intereses' }).click();
            await expect(dislikeTag).toHaveCount(1);
            await attachScreenshot(testInfo, 'Evitar duplicados', page);

        })

        await test.step('Cancelar cambios' , async () => {

            await page.goto('https://pathexplorer-esquimales.vercel.app/employee/perfil/386e63ba-dc8f-4af6-9447-44f7976a4a0c')
            await page.getByRole('button', { name: 'Editar intereses' }).click();

            await dislikeTag.locator(`button[aria-label="Eliminar ${interes}"]`).click();

            await expect(dislikeTag).not.toBeVisible();

            await page.getByRole('button', { name: 'Cancelar' }).click();

            await page.getByRole('button', { name: 'Editar intereses' }).click();
            await expect(dislikeTag).toBeVisible();
            await page.getByRole('button', { name: 'Cancelar' }).click();

            await attachScreenshot(testInfo, 'Cancelar Cambios', page);
            
        })

        await test.step('Eliminar interes' , async () => {

            await page.goto('https://pathexplorer-esquimales.vercel.app/employee/perfil/386e63ba-dc8f-4af6-9447-44f7976a4a0c')
            await page.getByRole('button', { name: 'Editar intereses' }).click();

            await dislikeTag.locator(`button[aria-label="Eliminar ${interes}"]`).click();

            await expect(dislikeTag).not.toBeVisible();

            await page.getByRole('button', { name: 'Guardar cambios' }).click();

            await page.getByRole('button', { name: 'Editar intereses' }).click();
            await expect(dislikeTag).not.toBeVisible();
            await page.getByRole('button', { name: 'Cancelar' }).click();

            await attachScreenshot(testInfo, 'Eliminar interes', page);
            
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