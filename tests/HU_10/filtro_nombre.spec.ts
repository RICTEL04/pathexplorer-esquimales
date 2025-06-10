import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_10', () => {
    test('ID: TC-HU10.CA6 Filtrar empleados por nombre', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_10',
        title: 'ID: TC-HU10.CA6 Filtrar empleados por nombre',
        description: `**Descripción**: El people lead quiere poder filtrar a sus empleados por nombre o ID

**Precondiciones**:
1. Usuario autenticado como people lead
2. People lead con counsulees

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


        await test.step('Entrar al counsulee section', async () => {
            await page.getByRole('button', { name: 'People lead' }).click();
            await page.getByRole('link', { name: 'Counselee' }).click();
            
            await attachScreenshot(testInfo, 'Entrar al counsulee', page);
        });

        await test.step('Detectar los campos que se necesitan ver' , async () => {

            await page.getByRole('textbox', { name: 'Buscar por nombre o ID empleado' }).fill('Sergio');

            await expect(page.getByText('Jose')).not.toBeVisible()
            await expect(page.getByText('Sergio Ricardo Tellez Loaiza')).toBeVisible()
            await expect(page.getByText('Alfredo Emir Puente Medrano')).not.toBeVisible()

            await page.getByRole('textbox', { name: 'Buscar por nombre o ID empleado' }).fill('Jo');

            await expect(page.getByText('Jose')).toBeVisible()
            await expect(page.getByText('Sergio Ricardo Tellez Loaiza')).not.toBeVisible()
            await expect(page.getByText('Alfredo Emir Puente Medrano')).not.toBeVisible()

            await attachScreenshot(testInfo, 'Detectar a los trabajadores mediante filtro', page);
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