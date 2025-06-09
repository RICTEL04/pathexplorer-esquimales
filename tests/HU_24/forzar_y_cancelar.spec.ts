import {  talentLeadTest as test, expect, configureQaseTest, attachScreenshot, handleTestError } from '../base.fixture';

test.describe('Browser Suite', () => {
  test.describe('HU_24', () => {
    test('ID: TC-HU24.CA3-CA4 Forzar empleados y cancelar talent discussion', async ({ page, browserName }, testInfo) => {
      // Configurar metadatos para Qase
      configureQaseTest({
        hu: 'HU_24',
        caseId: 140, // Ajustar según numeración real en Qase
        title: 'ID: TC-HU24.CA3-CA4 Forzar empleados y cancelar talent discussion',
        description: `**Descripción**: Verifica el flujo completo de forzar empleados y cancelar la talent discussion debido a que no se cumplen los requerimientos

**Precondiciones**:
1. Usuario autenticado como Talent Lead
2. Talent Discussion existente con empleados en diferentes estados que la hagan no cumplir los requerimientos para ser iniciada

**Navegador**: ${browserName}`,
        severity: 'critical',
        priority: 'high',
        layer: 'e2e',
        milestone: 'Sprint 3',
        parameters: {
          'Talent Discussion': `Talent discussion prueba ${browserName}`,
          'Navegador': browserName
        }
      }, browserName);

      try {
        await test.step('Acceder a Talent Discussion existente', async () => {
          await page.locator('.grid > a').first().click();
          await attachScreenshot(testInfo, `Talent discussion prueba ${browserName}`, page);
        });

        await test.step('Verificar estados iniciales de empleados', async () => {
          await expect(page.getByText('Pendiente de request').first()).toBeVisible();
          await expect(page.getByText('Pendiente de request').nth(1)).toBeVisible();
          await expect(page.locator('div').filter({ hasText: /^DavidPeople LeadPendiente$/ }).locator('span')).toBeVisible();
          await expect(page.locator('div').filter({ hasText: /^PanchoPeople LeadPendiente$/ }).locator('span')).toBeVisible();
          await expect(page.getByText('No asignado').first()).toBeVisible();
          await expect(page.getByText('No asignado').nth(1)).toBeVisible();
          await attachScreenshot(testInfo, 'Estados iniciales de empleados', page);
        });

        await test.step('Forzar empleados', async () => {
          await page.getByRole('button', { name: 'Forzar a los empleados' }).click();
          await page.getByRole('button', { name: 'Sí, forzar' }).click();
          
          // Verificar cambios después de forzar
          //await expect(page.getByText('Pendiente')).toBeVisible();
          await expect(page.getByText('No Asignado', { exact: true }).first()).toBeVisible();
          await expect(page.getByText('No Asignado', { exact: true }).nth(1)).toBeVisible();
          await expect(page.locator('div').filter({ hasText: /^DavidPeople LeadNo Asignados$/ }).locator('span')).toBeVisible();
          await expect(page.locator('div').filter({ hasText: /^PanchoPeople LeadNo Asignados$/ }).locator('span')).toBeVisible();
          await attachScreenshot(testInfo, 'Estados después de forzar empleados', page);
        });

        await test.step('Cancelar Talent Discussion', async () => {
          await page.getByRole('button', { name: 'Cancelar Talent Discussion' }).click();
          
          // Verificar estado cancelado
          await expect(page.getByText('Cancelada', { exact: true })).toBeVisible();
          await expect(page.getByRole('heading', { name: 'Talent Discussion Cancelada' })).toBeVisible();
          await expect(page.getByText('Esta Talent Discussion ha')).toBeVisible();
          
          // Verificar modo solo lectura
          await expect(page.locator('div').filter({ hasText: /^Empleados \(2\)Solo lectura$/ }).locator('span')).toBeVisible();
          await expect(page.locator('div').filter({ hasText: /^People Leads \(2\)Solo lectura$/ }).locator('span')).toBeVisible();
          await expect(page.locator('div').filter({ hasText: /^Capability Leads \(2\)Solo lectura$/ }).locator('span')).toBeVisible();
          await attachScreenshot(testInfo, 'Talent Discussion cancelada', page);
        });

      } catch (error) {
        await handleTestError(error, testInfo, page);
      }
    });
  });
});