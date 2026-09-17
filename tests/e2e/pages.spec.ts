import { expect, test } from '@playwright/test'

const routes = [
  { path: '/', heading: /Dmitriy Mitrokhin/i },
  { path: '/about', heading: /About/i },
  { path: '/stack', heading: /Stack/i },
  { path: '/architecture', heading: /Architecture/i },
  { path: '/contact', heading: /Contact/i }
]

for (const { path, heading } of routes) {
  test(`${path} renders its heading and nav with no console errors`, async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text())
    })

    await page.goto(path)

    await expect(page.getByRole('heading', { level: 1 })).toContainText(heading)
    await expect(page.getByRole('navigation')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeVisible()

    expect(consoleErrors).toEqual([])
  })
}

test('nav links navigate between pages', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('navigation').getByRole('link', { name: 'Stack' }).click()
  await expect(page).toHaveURL(/\/stack$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Stack/i)

  await page.getByRole('navigation').getByRole('link', { name: 'Contact' }).click()
  await expect(page).toHaveURL(/\/contact$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Contact/i)
})

test('hero CTA navigates to the architecture page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'See the architecture' }).click()
  await expect(page).toHaveURL(/\/architecture$/)
})
