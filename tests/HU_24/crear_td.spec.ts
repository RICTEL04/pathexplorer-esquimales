// tests/HU_24/creacion-exitosa.spec.ts
import {  talentLeadTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

// Estructura anidada para crear la jerarquía correcta en Qase
test.describe('Browser Suite', () => {
  test.describe('HU_24', () => {
    test('Creación exitosa de Talent Discussion', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_24',
        caseId: 137,
        title: 'ID: TC-HU24.CA1 Creación exitosa de Talent Discussion con empleados disponibles',
        description: `**Descripción**: Verifica la creación completa de una Talent Discussion con todos los campos requeridos

**Precondiciones**:
1. Usuario autenticado como Talent Lead
2. Empleados disponibles en el nivel seleccionado

**Navegador**: ${browserName}`,
        severity: 'critical',
        priority: 'high',
        layer: 'e2e',
        milestone: 'Sprint 3',
        parameters: {
          'Nivel': '1',
          'Participantes': 'PanchoAdmin, Sergio Ricardo Tellez LoaizaAdmin',
          'Fechas': '2025-06-26 a 2025-06-27',
          'Navegador': browserName
        }
      }, browserName);

      try {
        await test.step('Iniciar creación', async () => {
          await page.getByRole('button', { name: 'Crear Talent Discussion' }).click();
          await attachScreenshot(testInfo, 'Pantalla de creación iniciada', page);
        });

        await test.step('Completar información básica', async () => {
          await page.getByRole('textbox', { name: 'Describe la discusión de' }).fill(`Talent discussion prueba ${browserName}`);
          await page.getByRole('combobox').selectOption('1');
          await attachScreenshot(testInfo, 'Formulario completado', page);
        });

        await test.step('Seleccionar participantes', async () => {
          await page.getByRole('listitem')
            .filter({ hasText: 'PanchoAdmin • TIAgregar' })
            .getByRole('button')
            .click();
          
          await page.getByRole('listitem')
            .filter({ hasText: 'Sergio Ricardo Tellez LoaizaAdmin • HRAgregar' })
            .getByRole('button')
            .click();
          
          await attachScreenshot(testInfo, 'Participantes seleccionados', page);
        });

        await test.step('Establecer fechas', async () => {
          await page.locator('div')
            .filter({ hasText: /^Inicio año fiscal$/ })
            .getByRole('textbox')
            .fill('2025-06-26');
          
          await page.locator('div')
            .filter({ hasText: /^Final año fiscal$/ })
            .getByRole('textbox')
            .fill('2025-06-27');
          
          await attachScreenshot(testInfo, 'Fechas establecidas', page);
        });

        await test.step('Finalizar creación', async () => {
          await page.locator('div')
            .filter({ hasText: /^Crear Talent Discussion$/ })
            .getByRole('button')
            .click();
          
          await attachScreenshot(testInfo, 'Creación exitosa', page);
          
          // Verificar que la creación fue exitosa
          // Agregar aquí las verificaciones específicas según tu aplicación
          // await expect(page.getByText('Success message')).toBeVisible();
        });

      } catch (error) {
        await handleTestError(error, testInfo, page);
      }
    });
  });
});