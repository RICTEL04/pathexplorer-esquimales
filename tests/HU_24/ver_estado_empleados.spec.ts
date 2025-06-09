import {  talentLeadTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_24', () => {
    test('ID: TC-HU24.CA2 Ver estado de empleados', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_24',
        caseId: 139, // Asumiendo que este es el siguiente ID de caso
        title: 'ID: TC-HU24.CA2 Ver estado de empleados',
        description: `**Descripción**: Verifica que se pueden visualizar correctamente los estados de los empleados en una Talent Discussion despues de crearla

**Precondiciones**:
1. Usuario autenticado como Talent Lead
2. Talent Discussion existente con empleados asignados

**Navegador**: ${browserName}`,
        severity: 'normal',
        priority: 'medium',
        layer: 'e2e',
        milestone: 'Sprint 3',
        parameters: {
          'Talent Discussion': `Talent discussion prueba ${browserName}`,
          'Navegador': browserName
        }
      }, browserName);

      try {
        await test.step('Acceder a Talent Discussion existente', async () => {
          await page.getByRole('link', { name: `Talent discussion prueba ${browserName}` }).first().click();
          await attachScreenshot(testInfo, 'Talent Discussion seleccionada', page);
        });

        await test.step('Verificar estados de empleados', async () => {
          // Verificar estado "Pendiente de request"
          await expect(page.getByText('Pendiente de request').first()).toBeVisible();
          await expect(page.getByText('Pendiente de request').nth(1)).toBeVisible();
          
          // Verificar estado "Pendiente" en empleados específicos
          await expect(page.locator('div').filter({ hasText: /^DavidPeople LeadPendiente$/ }).locator('span')).toBeVisible();
          await expect(page.locator('div').filter({ hasText: /^PanchoPeople LeadPendiente$/ }).locator('span')).toBeVisible();
          
          // Verificar estado "No asignado"
          await expect(page.getByText('No asignado').first()).toBeVisible();
          await expect(page.getByText('No asignado').nth(1)).toBeVisible();
          
          await attachScreenshot(testInfo, 'Estados de empleados visibles', page);
        });

      } catch (error) {
        await handleTestError(error, testInfo, page);
      }
    });
  });
});