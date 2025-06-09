import {  talentLeadTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_20', () => {
    test('ID: TC-HU20.CA1-CA3 Visualizar empleados y escoger no nominar', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_20',
        title: 'ID: TC-HU20.CA1-CA3 Visualizar empleados y escoger no nominar',
        description: `**Descripción**: Verifica que el usuario pueda decidir no nominar a quien no nominar.

**Precondiciones**:
1. Usuario autenticado como Talent Lead
2. Empleados disponibles para nominar

**Navegador**: ${browserName}`,
        severity: 'major',
        priority: 'medium',
        layer: 'e2e',
        milestone: 'Sprint 3',
        parameters: {
          'Nombre Discusión': 'Prueba People Lead 1',
          'Nivel': '1',
          'Fechas': '2025-06-27 a 2025-06-28',
          'Participantes': 'PanchoAdmin, Sergio Ricardo Tellez LoaizaAdmin',
          'Navegador': browserName
        }
      }, browserName);

      let testFailed = false;

      try {
        const discussionName = 'Prueba People Lead No Nominar ' + browserName;

        await test.step('Crear Talent Discussion', async () => {
          await page.getByRole('button', { name: 'Crear Talent Discussion' }).click();
          await page.getByRole('textbox', { name: 'Describe la discusión de' }).click();
          await page.getByRole('textbox', { name: 'Describe la discusión de' }).fill(discussionName);
          await page.getByRole('combobox').selectOption('1');
          await page.locator('div').filter({ hasText: /^Inicio año fiscal$/ }).getByRole('textbox').fill('2025-06-27');
          await page.locator('div').filter({ hasText: /^Final año fiscal$/ }).getByRole('textbox').fill('2025-06-28');
          await page.getByRole('listitem').filter({ hasText: 'PanchoAdmin • TIAgregar' }).getByRole('button').click();
          await page.getByRole('listitem').filter({ hasText: 'Sergio Ricardo Tellez LoaizaAdmin • HRAgregar' }).getByRole('button').click();
          await page.locator('div').filter({ hasText: /^Crear Talent Discussion$/ }).getByRole('button').click();
          await attachScreenshot(testInfo, 'Talent Discussion creada', page);
        });

        await test.step('Acceder a la Talent Discussion creada', async () => {
          await page.goto('https://pathexplorer-esquimales.vercel.app/employee/people-lead/talent-discussions');
          await page.getByRole('link', { name: discussionName }).first().click();
          await attachScreenshot(testInfo, 'Acceso a Talent Discussion', page);
        });

        await test.step('Cambiar estado a No asignados', async () => {
await page.getByText('Marcar el resto sin asignar').click();

          // Espera a que el botón del modal sea visible y habilitado
          const continuarBtn = page.getByRole('button', { name: /sí, continuar/i });
          await expect(continuarBtn).toBeVisible({ timeout: 10000 });
          await expect(continuarBtn).toBeEnabled();
          await continuarBtn.click();
          await attachScreenshot(testInfo, 'Estado cambiado a sin asignar', page);
        });

        await test.step('Verificar no asignado', async () => {
          await page.getByText('Sergio Ricardo Tellez LoaizaNivel 1SolicitudAdmin').click();
          await expect(page.getByText('No Asignados').first()).toBeVisible();
          await page.getByText('No Asignado', { exact: true }).click();
          await attachScreenshot(testInfo, 'Estado cambiado a No Asignados', page);
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