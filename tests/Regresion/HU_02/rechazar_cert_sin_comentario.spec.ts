import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_02', () => {
    test('ID: TC-HU2.CA3-NF - Validar comentario obligatorio al rechazar Regresion', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_02',
        title: 'ID: TC-HU2.CA3-NF - Validar comentario obligatorio al rechazar Regresion',
        description: `**Descripción**: El people lead quiere ver si se puede rechazar la certificacion sin comentario

**Precondiciones**:
1. Usuario autenticado como people lead
2. People lead tiene counsulees
3. Counsulees tienen certificados pendientes de validar o rechazar

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
      
      const nombreTitulo = "certificado comentarios " + browserName

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


        await test.step('Entrar al counsulee y ver sus certificados', async () => {

            await page.getByRole('link', { name: 'Ver perfil' }).click();
            await page.goto('https://pathexplorer-esquimales.vercel.app/employee/people-lead/validarCursos')

            await expect(page.getByText('No hay certificados por validar')).not.toBeVisible();

            await page.getByRole('heading', { name: 'Sergio Ricardo Tellez Loaiza' }).click();
            
            await attachScreenshot(testInfo, 'Entrar al counsulee y ver sus certificados', page);
        });

        await test.step('Detectar la lista de certificados', async () => {
            // Selecciona todas las filas del tbody
            const rows = page.locator('table.popup-table tbody tr');
            // Verifica que haya al menos una fila
            const rowCount = await rows.count();
            expect(rowCount).toBeGreaterThan(0);

            await attachScreenshot(testInfo, 'Detectar lista de certificados', page);
        });

        await test.step('Rechazar certificado sin comentario', async () => {
          // 1. Busca la fila con el título igual a nombreTitulo
          const row = page.locator('table.popup-table tbody tr').filter({
            has: page.locator('td strong', { hasText: nombreTitulo })
          });

          // 2. Haz click en el botón "Cerrar" de esa fila
          await row.locator('button.edit-button', { hasText: 'Editar' }).click();

          // 3. Haz click en el botón "Negar Certificado" del dropdown
          const negarBtn = page.locator('tr.dropdown-row .negar-boton');
          await expect(negarBtn).toBeVisible();
          await negarBtn.click();

          // 5. Verifica que el botón "Guardar" esté habilitado
          const guardarBtn = page.locator('tr.dropdown-row button.save-button');
          await expect(guardarBtn).not.toBeEnabled();

          await attachScreenshot(testInfo, 'Formulario de rechazo de certificado', page);
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