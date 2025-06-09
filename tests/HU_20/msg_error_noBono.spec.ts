import {  talentLeadTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_20', () => {
    test('ID: TC-HU20.CA2 Error al no agregar descripcion de bono o promocion', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_20',
        title: 'ID: TC-HU20.CA2 Error al no agregar descripcion de bono o promocion',
        description: `**Descripción**: Verifica que el usuario no pueda enviar el formulario sin subir el bono o la promocion

**Precondiciones**:
1. Usuario autenticado como Talent Lead
2. Empleados disponibles para nominar

**Navegador**: ${browserName}`,
        severity: 'normal',
        priority: 'low',
        layer: 'e2e',
        milestone: 'Sprint 3',
        parameters: {
          'Nombre Discusión': 'Prueba People Lead Error Bono ' + browserName,
          'Nivel': '1',
          'Fechas': '2025-06-27 a 2025-06-28',
          'Participantes': 'PanchoAdmin, Sergio Ricardo Tellez LoaizaAdmin',
          'Navegador': browserName
        }
      }, browserName);

      let testFailed = false;

      try {
        const discussionName = 'Prueba People Lead Error Bono ' + browserName;

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

        await test.step('Completar formulario de empleado', async () => {
          await page.getByText('DepartamentoHRCargabilidad40Fecha Contratación4/24/2025People').click();
          
          await test.step('Completar sección de Bono', async () => {
            await page.locator('input[type="checkbox"]#bono').check();
            await page.getByRole('button', { name: 'Enviar' }).click();
            await page.locator('input[type="checkbox"]#bono').uncheck();
            await attachScreenshot(testInfo, 'Bono sin completar', page);
          });

          await test.step('Completar sección de Promoción', async () => {
            await page.locator('input[type="checkbox"]#promocion').check();
            await page.getByRole('button', { name: 'Enviar' }).click();
            await page.locator('input[type="checkbox"]#promocion').uncheck();
            await attachScreenshot(testInfo, 'Promoción sin completar', page);
          });
          
          await attachScreenshot(testInfo, 'Formulario no enviado', page);
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