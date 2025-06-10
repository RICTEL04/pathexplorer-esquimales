import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_06', () => {
    test('ID: TC-HU06.CA Creacion de Experiencia Laboral sin habilidades', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_06',
        title: 'ID: TC-HU06.CA Creacion de Experiencia Laboral sin habilidades',
        description: `**Descripción**: El empleado puede crear una experiencia laboral sin seleccionar habilidades.

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
      const nombreExperiencia = 'QA sin hab' + browserName; 
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


        await test.step('Crear experiencia laboral', async () => {
          
          await page.goto('https://pathexplorer-esquimales.vercel.app/employee/perfil/386e63ba-dc8f-4af6-9447-44f7976a4a0c');
          await page.getByRole('button', { name: '+ Añadir experiencia' }).click();
          await page.getByRole('textbox', { name: 'Rol *' }).click();
          await page.getByRole('textbox', { name: 'Rol *' }).fill(nombreExperiencia);
          await page.getByRole('textbox', { name: 'Proyecto *' }).click();
          await page.getByRole('textbox', { name: 'Proyecto *' }).fill('Path_Explorer');
          await page.getByRole('textbox', { name: 'Fecha de inicio *' }).fill('2025-02-10');
          await page.getByRole('textbox', { name: 'Fecha de finalización' }).fill('2025-06-13');
          await page.getByRole('textbox', { name: 'Descripción' }).click();
          await page.getByRole('textbox', { name: 'Descripción' }).fill('Proyecto de desarrollo de una aplicación para Accenture');
          await page.getByRole('button', { name: 'Guardar experiencia' }).click();
          await attachScreenshot(testInfo, 'Experiencia creada', page);
        });

        
        await test.step('Buscar Experiencia y borrarla', async () => {
          let found = false;
          let maxPages = 10; // Ajusta si tienes más páginas
          let currentPage = 1;

          while (!found && currentPage <= maxPages) {
            const experiencia = page.getByRole('heading', { name: nombreExperiencia });
            if (await experiencia.count() > 0) {
              await experiencia.click();
              await page.getByRole('button', { name: 'Editar', exact: true }).click();
              page.once('dialog', dialog => {
                console.log(`Dialog message: ${dialog.message()}`);
                dialog.dismiss().catch(() => {});
              });
              await page.getByRole('button', { name: 'Eliminar' }).click();

              page.once('dialog', dialog => {
                console.log(`Dialog message: ${dialog.message()}`);
                dialog.accept().catch(() => {});
              });

              await page.getByRole('button', { name: 'Eliminar' }).click();


              await expect(page.getByRole('heading', { name: nombreExperiencia })).not.toBeVisible({timeout: 15000});
              await attachScreenshot(testInfo, 'Experiencia borrada', page);
              found = true;
            } else {
              // Ir a la siguiente página
              const nextButton = page.getByRole('button', { name: '→' });
              if (await nextButton.isVisible() && await nextButton.isEnabled()) {
                await nextButton.click();
                currentPage++;
              } else {
                throw new Error(`No se encontró la experiencia "${nombreExperiencia}" en ninguna página.`);
              }
            }
          }
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