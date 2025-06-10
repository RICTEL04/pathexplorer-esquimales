// tests/HU_24/validacion-sin-empleados.spec.ts
import {  talentLeadTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

// Estructura anidada para crear la jerarquía correcta en Qase
test.describe('Browser Suite', () => {
  test.describe('HU_24', () => {
    test('Validación sin empleados disponibles', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_24',
        caseId: 138,
        title: 'ID: TC-HU24.CA1 Validación al crear TD sin empleados disponibles',
        description: `**Descripción**: Verifica que el sistema muestre el mensaje adecuado cuando no hay empleados disponibles

**Precondiciones**:
1. Usuario autenticado como Talent Lead
2. No hay empleados en el nivel seleccionado

**Navegador**: ${browserName}`,
        severity: 'major',
        priority: 'medium',
        layer: 'e2e',
        milestone: 'Sprint 3',
        parameters: {
          'Nivel': '2',
          'Escenario': 'Sin empleados disponibles',
          'Navegador': browserName
        }
      }, browserName);

      try {
        await test.step('Iniciar creación de Talent Discussion', async () => {
          await page.getByRole('button', { name: 'Crear Talent Discussion' }).click();
          await attachScreenshot(testInfo, 'Proceso de creación iniciado', page);
        });

        await test.step('Completar información básica', async () => {
          await page.getByRole('textbox', { name: 'Describe la discusión de' }).fill('Talent Discussion prueba 2');
          await page.getByRole('combobox').selectOption('2');
          await attachScreenshot(testInfo, 'Nivel seleccionado', page);
        });

        await test.step('Verificar mensaje de error', async () => {
          const errorMessage = page.getByText('No hay empleados, people leads o capability leads para este nivel.');
          await expect(errorMessage).toBeVisible();
          await attachScreenshot(testInfo, 'Mensaje de error mostrado', page);
        });

        await test.step('Verificar estado del botón', async () => {
          const saveButton = page.locator('button:has-text("Crear Talent Discussion")')
            .filter({ hasNot: page.locator('[disabled]') })
            .first();
          await expect(saveButton).toBeEnabled();
          await attachScreenshot(testInfo, 'Estado del botón verificado', page);
        });

      } catch (error) {
        await handleTestError(error, testInfo, page);
      }
    });
  });
});