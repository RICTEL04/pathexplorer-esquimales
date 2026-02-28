import { baseTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_27', () => {
    test.setTimeout(45000);
    test('ID: TC-HU27.CA2.CA3 - Asignar empleado con capacidad para más de dos proyectos', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_27',
        title: 'ID: TC-HU27.CA2.CA3 - Asignar empleado con capacidad para más de dos proyectos',
        description: `**Descripción**: Al agregar a un empleado con falta de cargabilidad, se debe de revisar que estos puedan ser agregados de acuerdo a la cargabilidad que agrega el proyecto

**Precondiciones**:
1. Usuario autenticado como capability
2. Dos empleados con una cargabilidad menor a 10

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
      let proyecto = 'Proyecto ' + browserName
      let otherBrowser = ""

      if(browserName == "chromium") otherBrowser = "firefox"
      else if(browserName == "firefox") otherBrowser = "chromium"

      let proyecto2 = 'Proyecto ' + otherBrowser
      let empleado = browserName === "chromium" ? "Jorge Betanzo" : "Jorge Beyanzo"


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


        await test.step('Ver proyecto', async () => {

            await page.waitForTimeout(1000);

            await page.goto('https://pathexplorer-esquimales.vercel.app/employee/capability-lead/proyectos')
            
            // Busca la tarjeta del proyecto según el navegador y haz clic en ella
            await page.locator('div.grid > div', { has: page.getByRole('heading', { name: proyecto }) }).click();

            await attachScreenshot(testInfo, 'Se pudo entrar al proyecto', page);         
            
        });

        await test.step('Asignar empleado', async () => {

            // Selecciona el ítem de la lista que contiene "QA"
            const puestoQA = page.locator('li.ant-list-item', { has: page.getByRole('heading', { name: 'QA' }) });

            // Haz clic en el ítem (opcional, si es necesario para expandir o seleccionar)
            await puestoQA.click();
            
            // Si hay un botón dentro del ítem, haz clic en él (ajusta el selector si es necesario)
            //await puestoQA.getByRole('button').click();     

            await page.waitForTimeout(1000);

            const empleadoDisponible = page.locator('div.flex.items-center.bg-white.rounded-2xl', { hasText: empleado });
            const dropzone = page.locator('div.border-dashed.border-gray-300.bg-white');
            await empleadoDisponible.dragTo(dropzone);

            await page.waitForTimeout(2000);

            await page.getByRole('button', {name : 'Guardar asignaciones'}).click()
            
            await page.getByRole('button', { name: 'Regresar' }).click();
            
            await attachScreenshot(testInfo, 'Se asignó el empleado al proyectoproyecto', page);
            
            await page.waitForTimeout(1000);

        });

        await test.step('Asignar empleado a segundo proyecto', async () => {

            // Busca la tarjeta del proyecto según el navegador y haz clic en ella
            await page.locator('div.grid > div', { has: page.getByRole('heading', { name: proyecto2 }) }).click();

            // Selecciona el ítem de la lista que contiene "Developer"
            const puestoDeveloper = page.locator('li.ant-list-item', { has: page.getByRole('heading', { name: 'Developer' }) });

            // Haz clic en el ítem (opcional, si es necesario para expandir o seleccionar)
            await puestoDeveloper.click();
            
            // Si hay un botón dentro del ítem, haz clic en él (ajusta el selector si es necesario)
            //await puestoDeveloper.getByRole('button').click();     
            
            await page.waitForTimeout(1000);

            const empleadoDisponible = page.locator('div.flex.items-center.bg-white.rounded-2xl', { hasText: empleado });
            const dropzone = page.locator('div.border-dashed.border-gray-300.bg-white');
            await empleadoDisponible.dragTo(dropzone);

            await page.waitForTimeout(1000);

            await page.getByRole('button', {name : 'Guardar asignaciones'}).click()

            await page.waitForTimeout(1000);

            await page.getByRole('button', { name: 'Regresar' }).click();
            
            await attachScreenshot(testInfo, 'Se asignó el empleado al proyecto 2', page);
            
        });

        await test.step('Revisar exceso de cargabilidad en otro proyecto', async () => {

            await page.waitForTimeout(1000);

            // Busca la tarjeta del proyecto según el navegador y haz clic en ella
            await page.locator('div.grid > div', { has: page.getByRole('heading', { name: /^Test$/ }) }).click();

            // Selecciona el ítem de la lista que contiene "Developer"
            const puestoIADev = page.locator('li.ant-list-item', { has: page.getByRole('heading', { name: 'IA Dev' }) });

            // Haz clic en el ítem (opcional, si es necesario para expandir o seleccionar)
            await puestoIADev.click();
            
            // Si hay un botón dentro del ítem, haz clic en él (ajusta el selector si es necesario)
            //await puestoDeveloper.getByRole('button').click();     
            
            await page.waitForTimeout(1000);

            await expect(page.locator('div.flex.items-center.bg-white.rounded-2xl', { hasText: empleado })).not.toBeVisible

            await page.waitForTimeout(1000);

            // Espera a que el modal de confirmación desaparezca y luego cierra el modal principal
            await page.locator('.ant-modal-content button[aria-label="Close"]').first().click();

            await page.getByRole('button', { name: 'Regresar' }).click();
            await attachScreenshot(testInfo, 'Se presionó el botón Regresar', page);

            await page.locator('div.grid > div', { has: page.getByRole('heading', { name: proyecto2 }) }).click();
            await page.waitForTimeout(1000);
            await attachScreenshot(testInfo, 'Se verifico que el empleado ya no podía entrar en otro proyecto', page);
            
        });


        await test.step('Quitar empleado del segundo proyecto', async () => {

            // Selecciona el ítem de la lista que contiene "Developer"
            const puestoDeveloper = page.locator('li.ant-list-item', { has: page.getByRole('heading', { name: 'Developer' }) });

            // Haz clic en el ítem (opcional, si es necesario para expandir o seleccionar)
            await puestoDeveloper.click();
                        
            await page.waitForTimeout(1000);

            const tarjetaEmpleado = page.locator('div.flex.items-center.bg-white.rounded-2xl', { hasText: empleado });
            // Busca el botón con el texto "×" (multiplicación)
            await tarjetaEmpleado.locator('button', { hasText: '×' }).click();

            await page.waitForTimeout(1000);

            await page.getByRole('button', { name: 'Sí, continuar' }).click();
            // Espera a que el modal de confirmación desaparezca
            await expect(page.getByRole('button', { name: 'Sí, continuar' })).toBeHidden({ timeout: 5000 });
            // Si hay otro modal, ciérralo solo si existe
            const closeModalBtn = page.locator('.ant-modal-content button[aria-label="Close"]');
            if (await closeModalBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
                await closeModalBtn.first().click();
            }

            await page.locator('.ant-modal-content button[aria-label="Close"]').first().click();

            await page.waitForTimeout(1000);

            await page.getByRole('button', { name: 'Regresar' }).click();
            await attachScreenshot(testInfo, 'Se presionó el botón Regresar', page);

            await page.waitForTimeout(1000);

            await attachScreenshot(testInfo, 'Empleado quitado del proyecto', page);
            
        });

        await test.step('Quitar empleado del primer proyecto', async () => {

            
            // Busca la tarjeta del proyecto según el navegador y haz clic en ella
            await page.locator('div.grid > div', { has: page.getByRole('heading', { name: proyecto }) }).click();

            // Selecciona el ítem de la lista que contiene "Developer"
            const puestoQA = page.locator('li.ant-list-item', { has: page.getByRole('heading', { name: 'QA' }) });

            // Haz clic en el ítem (opcional, si es necesario para expandir o seleccionar)
            await puestoQA.click();
                        
            await page.waitForTimeout(1000);

            const tarjetaEmpleado = page.locator('div.flex.items-center.bg-white.rounded-2xl', { hasText: empleado });
            // Busca el botón con el texto "×" (multiplicación)
            await tarjetaEmpleado.locator('button', { hasText: '×' }).click();

            await page.waitForTimeout(1000);

            await page.getByRole('button', { name: 'Sí, continuar' }).click();
            // Espera a que el modal de confirmación desaparezca
            await expect(page.getByRole('button', { name: 'Sí, continuar' })).toBeHidden({ timeout: 5000 });
            // Si hay otro modal, ciérralo solo si existe
            const closeModalBtn = page.locator('.ant-modal-content button[aria-label="Close"]');
            if (await closeModalBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
                await closeModalBtn.first().click();
            }

            await page.locator('.ant-modal-content button[aria-label="Close"]').first().click();

            await page.waitForTimeout(1000);

            await page.getByRole('button', { name: 'Regresar' }).click();
            await attachScreenshot(testInfo, 'Se presionó el botón Regresar', page);

            await page.waitForTimeout(1000);

            await attachScreenshot(testInfo, 'Empleado quitado del  primer proyecto', page);
            
            //throw new Error('Se Fallo para probar.');
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