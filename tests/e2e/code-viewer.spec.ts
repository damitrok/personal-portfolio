import { expect, test } from '@playwright/test'

test('a code-snippet trigger opens the panel with highlighted source, Esc closes it', async ({ page }) => {
  await page.goto('/architecture')

  const trigger = page.getByRole('button', { name: /View source: app\/features\/lang-switch/ })
  await trigger.click()

  const panel = page.getByRole('dialog')
  await expect(panel).toBeVisible()
  await expect(panel).toContainText('LangSwitch.vue')
  await expect(panel.locator('pre.shiki')).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(panel).toBeHidden()
  await expect(trigger).toBeFocused()
})
