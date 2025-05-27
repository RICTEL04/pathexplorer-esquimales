import { test, expect } from "@playwright/test";


test.describe("Certificados", () => {
    test('Ver Certificados', async ({ page }) => {
        await page.goto('https://pathexplorer-esquimales.vercel.app/');
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('a01198327@tec.mx');
        await page.getByRole('textbox', { name: 'Contraseña' }).click();
        await page.getByRole('textbox', { name: 'Contraseña' }).fill('password123');
        await page.getByRole('button', { name: 'Sign in' }).click();
        await page.getByRole('link', { name: 'Certificaciones' }).click();
        await page.locator('div').filter({ hasText: /^Upload$/ }).locator('div').nth(1).click();
        await page.locator('div').filter({ hasText: /^Certificación DBFecha Caducidad: 2027-07-25Estatus: Verificado Editar$/ }).nth(2).click();
        await page.locator('div:nth-child(2) > .bg-white').click();
        await page.locator('div').filter({ hasText: /^Upload$/ }).locator('div').nth(1).click();
        await page.getByRole('cell', { name: 'Nombre' }).click();
        await page.getByRole('cell', { name: 'Fecha Caducidad' }).click();
        await page.getByRole('cell', { name: 'Estatus' }).click();
        await expect(page.getByRole('button').filter({ hasText: /^$/ }).first()).toBeVisible();
        await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
        await page.getByRole('button', { name: 'Cerrar sesión' }).click();
        await page.getByText('Login').click();
    });
});