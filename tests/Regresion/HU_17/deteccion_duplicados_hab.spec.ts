import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_17', () => {
    test('ID: TC-HU17.CA3 - Detección de duplicados Regresion', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_17',
        title: 'ID: TC-HU17.CA3 - Detección de duplicados Regresion',
        description: `**Descripción**: Al crear habilidades se quiere ver si se pueden crear con el mismo nombre

**Precondiciones**:
1. Usuario autenticado como admin

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
      let habName = "habilidad " + browserName;
      let categoryName = "category " + browserName;
      
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


        await test.step('Crear Categoria', async () => {

            //await page.goto('https://pathexplorer-esquimales.vercel.app/admin/habilidades')
            await page.getByRole('link', { name: 'Administrar Habilidades' }).click();

            await page.getByRole('button', { name: 'Nueva Categoria' }).click();

            let input = page.getByPlaceholder('Nombre de la categoría');
            await expect(input).toBeVisible();
            await input.fill(categoryName);

            // Esperar a que el botón "Agregar" esté habilitado y presionarlo
            let agregarBtn = page.getByRole('button', { name: 'Agregar' });
            await expect(agregarBtn).toBeEnabled();
            await agregarBtn.click();


            await attachScreenshot(testInfo, 'Categoría agregada', page);         
            
        });

        await test.step('Crear Habilidad dos veces', async () => {


            const categoria = page.locator('div.border.rounded-lg.overflow-hidden').filter({
                has: page.getByRole('heading', { name: categoryName })
            });

            // Busca el botón "+ Habilidad" dentro de esa categoría y haz click
            const addSkillBtn = categoria.getByRole('button', { name: '+ Habilidad' });
            await expect(addSkillBtn).toBeVisible();
            await addSkillBtn.click();

            const input = page.getByPlaceholder('Nombre de la habilidad');
            await expect(input).toBeVisible();
            await input.fill(habName);

            // Esperar a que el botón "Agregar" esté habilitado y presionarlo
            const agregarBtn = page.getByRole('button', { name: 'Agregar' });
            await expect(agregarBtn).toBeEnabled();
            await agregarBtn.click();

            await addSkillBtn.click()
            await expect(input).toBeVisible();
            await input.fill(habName);

            await expect(agregarBtn).toBeEnabled();
            await agregarBtn.click();

            await expect(page.getByRole('button', { name: 'Cancelar' })).toBeVisible()

            await page.getByRole('button', { name: 'Cancelar' }).click()

            await attachScreenshot(testInfo, 'Crear habilidad dos veces', page);         
            
        });

        await test.step('Crear categoria de nuevo', async () => {
            await page.getByRole('button', { name: 'Nueva Categoria' }).click();

            let input = page.getByPlaceholder('Nombre de la categoría');
            await expect(input).toBeVisible();
            await input.fill(categoryName);

            // Esperar a que el botón "Agregar" esté habilitado y presionarlo
            let agregarBtn = page.getByRole('button', { name: 'Agregar' });
            await expect(agregarBtn).toBeEnabled();
            await agregarBtn.click();

            // Espera un momento a que la UI actualice la lista de categorías
            await page.waitForTimeout(1000);

            // Busca todas las categorías con el mismo nombre
            const categorias = page.locator('div.border.rounded-lg.overflow-hidden').filter({
                has: page.getByRole('heading', { name: categoryName })
            });

            const count = await categorias.count();

            // Si hay más de una, borra todas y falla la prueba
            if (count > 1) {
                // Mientras haya más de una categoría con el mismo nombre, elimina la primera
                while (await page.locator('div.border.rounded-lg.overflow-hidden').filter({
                    has: page.getByRole('heading', { name: categoryName })
                }).count() > 0) {
                    // Recalcula el locator en cada iteración
                    const categorias = page.locator('div.border.rounded-lg.overflow-hidden').filter({
                        has: page.getByRole('heading', { name: categoryName })
                    });
                    const categoria = categorias.first();
                    const header = categoria.locator('div.flex.justify-between.items-center');
                    const eliminarBtn = header.getByRole('button', { name: 'Eliminar' });
                    await expect(eliminarBtn).toBeVisible();
                    await eliminarBtn.click();

                    // Espera el modal y haz click en el botón "Eliminar" del modal
                    const modalEliminarBtn = page.getByRole('button', { name: 'Eliminar' }).last();
                    await expect(modalEliminarBtn).toBeVisible({ timeout: 5000 });
                    await modalEliminarBtn.click();

                    // Espera a que el número de categorías disminuya
                    await expect(categorias).toHaveCount(1, { timeout: 5000 });
                    await page.waitForTimeout(500);
                }
                await attachScreenshot(testInfo, 'Se detectaron y eliminaron categorías duplicadas', page);
                throw new Error('Se crearon categorías duplicadas, lo cual no debería suceder.');
            }
            
            await attachScreenshot(testInfo, 'Intento de crear categoría duplicada', page);
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