import { expect, test } from '@playwright/test'

test('language switch toggles content between English and Russian', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Dmitriy Mitrokhin')
  await expect(page.getByRole('button', { name: 'RU' })).toBeVisible()

  await page.getByRole('button', { name: 'RU' }).click()

  await expect(page.getByRole('button', { name: 'EN' })).toBeVisible()
  await expect(page.getByText('Делаю интерфейсы для сложных систем')).toBeVisible()

  await page.getByRole('button', { name: 'EN' }).click()
  await expect(page.getByRole('button', { name: 'RU' })).toBeVisible()
})
