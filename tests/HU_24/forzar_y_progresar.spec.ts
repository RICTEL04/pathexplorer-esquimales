import {  talentLeadTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_24', () => {
    test('ID: TC-HU24.CA5 Crear y avanzar estado de Talent Discussion a "En Progreso"', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_24',
        caseId: 141, // Ajustar según numeración real en Qase
        title: 'ID: TC-HU24.CA3-CA4 Crear y forzar para avanzar a estado de Talent Discussion a "En Progreso"',
        description: `**Descripción**: Verifica el flujo completo de creación de Talent Discussion y transición a estado "En Progreso"

**Precondiciones**:
1. Usuario autenticado como Talent Lead
2. Empleados disponibles para asignar

**Navegador**: ${browserName}`,
        severity: 'critical',
        priority: 'high',
        layer: 'e2e',
        milestone: 'Sprint 3',
        parameters: {
          'Nombre Discusión': 'Prueba para En Progreso',
          'Nivel': '1',
          'Fechas': '2025-06-27 a 2025-06-28',
          'Participantes': 'PanchoAdmin, Sergio Ricardo Tellez LoaizaAdmin',
          'Navegador': browserName
        }
      }, browserName);

      let testFailed = false;

      try {
        const discussionName = 'Prueba para En Progreso ' + browserName;

        await test.step('Crear nueva Talent Discussion', async () => {
          await page.getByRole('button', { name: 'Crear Talent Discussion' }).click();
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
          //await page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
          await page.goto('https://pathexplorer-esquimales.vercel.app/employee/people-lead/talent-discussions');
          await page.getByRole('link', { name: discussionName }).first().click();
          await attachScreenshot(testInfo, 'Acceso a Talent Discussion', page);
        });

        await test.step('Completar formulario de empleado', async () => {
          await page.getByText('Admin').click();
          
          await test.step('Completar sección de Bono', async () => {
            await page.locator('input[type="checkbox"]#bono').check();
            await page.getByRole('textbox', { name: 'Describe el bono' }).fill('Quiere bono');
            await attachScreenshot(testInfo, 'Bono completado', page);
          });

          await test.step('Completar sección de Promoción', async () => {
            await page.locator('input[type="checkbox"]#promocion').check();
            await page.getByRole('textbox', { name: 'Describe la promoción' }).fill('Quiere Promocion');
            await attachScreenshot(testInfo, 'Promoción completada', page);
          });

          await page.getByRole('button', { name: 'Enviar' }).click();
          await attachScreenshot(testInfo, 'Formulario enviado', page);
        });

        await test.step('Cambiar estado a Asignados', async () => {
          await page.getByRole('button', { name: 'Cambiar estado a Asignados' }).click();
          await expect(page.getByText('Pendiente').first()).toBeVisible();
          await attachScreenshot(testInfo, 'Estado cambiado a Asignados', page);
        });

        await test.step('Forzar empleados y cambiar estado', async () => {
          page.goto('https://pathexplorer-esquimales.vercel.app/employee/talent-lead');
          await page.getByRole('link', { name: `${discussionName} Nivel` }).first().click();
          
          await page.getByRole('button', { name: 'Forzar a los empleados' }).click();
          await page.getByRole('button', { name: 'Sí, forzar' }).click();
          
          await page.getByRole('button', { name: 'Iniciar Talent Discussion' }).click();
          await expect(page.getByText('En Progreso', { exact: true })).toBeVisible();
          await attachScreenshot(testInfo, 'Estado En Progreso', page);
        });

        await test.step('Completar evaluación de empleados', async () => {
          await page.locator('.grid > .w-full').first().click();
          await page.getByRole('textbox', { name: 'Comentarios de Evaluación' }).fill('Aceptado');
          await page.getByRole('switch').click();
          await page.getByRole('button', { name: 'Guardar cambios' }).click();
          await attachScreenshot(testInfo, 'Evaluación completada', page);
        });
        await test.step('Finalizar Talent Discussion', async () => {
          await page.getByRole('button', { name: 'Finalizar Talent Discussion' }).click();
          await expect(page.getByText('Finalizada', { exact: true })).toBeVisible();
          await expect(page.getByText('Aprobada')).toBeVisible();
          await attachScreenshot(testInfo, 'Talent Discussion finalizada', page);
        });

        } catch (error) {
          testFailed = true;
          // Verificar si la página todavía está disponible antes de intentar screenshot
          if (!page.isClosed()) {
            await handleTestError(error, testInfo, page);
          } else {
            // Si la página está cerrada, solo registrar el error
            await testInfo.attach('Error Details', { 
              body: Buffer.from(`Error: ${error instanceof Error ? error.message : String(error)}`), 
              contentType: 'text/plain' 
            });
          }
          throw error;
        } finally {
          // Cerrar la página solo si el test falló y la página sigue abierta
          if (testFailed && !page.isClosed()) {
            await page.close();
          }
        }
    });
  });
});