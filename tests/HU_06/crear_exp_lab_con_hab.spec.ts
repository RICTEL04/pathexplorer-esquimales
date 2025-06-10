import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_06', () => {
    test('ID: TC-HU06.CA1 Creacion de Experiencia Laboral con habilidades', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_06',
        title: 'ID: TC-HU06.CA1 Creacion de Experiencia Laboral con habilidades',
        description: `**Descripción**: El empleado puede crear una experiencia laboral con habilidades adquiridas.

**Precondiciones**:
1. Usuario autenticado como empleado

**Navegador**: ${browserName}`,
        severity: 'major',
        priority: 'high',
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
          await page.getByRole('textbox', { name: 'Buscar categorías o' }).click();
          await page.getByRole('textbox', { name: 'Buscar categorías o' }).fill('tailw');
          await page.getByRole('button', { name: 'Agregar' }).click();
          await page.getByRole('button', { name: 'Guardar experiencia' }).click();
          await attachScreenshot(testInfo, 'Experiencia creada', page);
        });

        await test.step('Verificar habilidad creada' , async () => {
          await page.getByRole('heading', { name: 'Tailwind CSS' }).isVisible();
          await attachScreenshot(testInfo, 'Habilidad es visible', page);
        })

        await test.step('Buscar Experiencia y borrar', async () => {
          let found = false;
          let maxPages = 10; // Cambia esto si tienes más páginas
          let currentPage = 1;

          while (!found && currentPage <= maxPages) {
            // ¿Existe la experiencia en la página actual?
            const experiencia = page.getByText('Tailwind CSS (beginner)').first();
            if (await experiencia.count() > 0) {
              await experiencia.click();
              await page.locator('div').filter({ hasText: /^HabilidadesTailwind CSS \(beginner\)$/ }).locator('span').click();
              await page.getByRole('button', { name: 'Editar', exact: true }).click();
              page.once('dialog', dialog => {
                console.log(`Dialog message: ${dialog.message()}`);
                dialog.accept().catch(() => {});
              });
              await page.getByRole('button', { name: 'Eliminar' }).click();
              
              await expect(page.getByRole('heading', { name: nombreExperiencia })).not.toBeVisible({timeout: 15000});
              await attachScreenshot(testInfo, 'Experiencia borrada', page);
              found = true;
            } else {
              // Si no se encuentra, intenta ir a la siguiente página
              const nextButton = page.getByRole('button', { name: '→' });
              if (await nextButton.isVisible() && await nextButton.isEnabled()) {
                await nextButton.click();
                currentPage++;
              } else {
                throw new Error('No se encontró la experiencia con Tailwind CSS (beginner) en ninguna página.');
              }
            }
          }
        });

        await test.step('Verificar habilidad ya no esta' , async () => {
          await page.getByRole('heading', { name: 'Tailwind CSS' }).isVisible() === false;
          await attachScreenshot(testInfo, 'Habilidad ya no es visible', page);
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