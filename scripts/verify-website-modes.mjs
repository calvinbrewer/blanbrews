import assert from 'node:assert/strict'

// Run only against a local app connected to a disposable test database.
const base = process.env.WEBSITE_TEST_URL || 'http://localhost:3107'
assert(
  ['localhost', '127.0.0.1'].includes(new URL(base).hostname),
  'Tests must target localhost',
)
assert.equal(
  process.env.WEBSITE_TEST_DISPOSABLE_DB,
  'yes',
  'Confirm the app uses a disposable DB with WEBSITE_TEST_DISPOSABLE_DB=yes',
)
const authorization = `Basic ${Buffer.from(`${process.env.WEBSITE_TEST_USER}:${process.env.WEBSITE_TEST_PASSWORD}`).toString('base64')}`
const settingsUrl = `${base}/api/admin/site-settings`
const headers = {
  authorization,
  'Content-Type': 'application/json',
  Origin: base,
}
const defaults = {
  mode: 'planning',
  showTravel: true,
  showExplore: true,
  showAccommodation: false,
  showRsvp: false,
  showGifts: false,
  showFaq: false,
}
const weekend = { ...defaults, mode: 'weekend' }
const sectionIds = (html) =>
  [...html.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map((match) => match[1])
const homepage = async () => {
  const response = await fetch(base)
  assert.equal(response.status, 200)
  return response.text()
}
async function save(settings) {
  const response = await fetch(settingsUrl, {
    method: 'PUT',
    headers,
    body: JSON.stringify(settings),
  })
  assert.equal(response.status, 200, await response.clone().text())
  assert.deepEqual(await response.json(), settings)
}

assert.equal(
  (await fetch(settingsUrl)).status,
  401,
  'Settings must require admin authentication',
)
assert.equal(
  (await fetch(`${base}/admin/preview`)).status,
  401,
  'Previews must require admin authentication',
)
assert.equal(
  (
    await fetch(settingsUrl, {
      headers: { authorization: 'Basic aW52YWxpZDppbnZhbGlk' },
    })
  ).status,
  401,
)
assert.equal(
  (
    await fetch(settingsUrl, {
      method: 'PUT',
      headers: { ...headers, Origin: 'https://other.example' },
      body: JSON.stringify(weekend),
    })
  ).status,
  403,
  'Cross-site saves must fail',
)
assert.equal(
  (await fetch(settingsUrl, { method: 'PUT', headers, body: '{' })).status,
  400,
)
assert.equal(
  (
    await fetch(settingsUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ ...weekend, mode: 'invalid' }),
    })
  ).status,
  400,
)
assert.equal(
  (
    await fetch(settingsUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ ...weekend, showRsvp: 'false' }),
    })
  ).status,
  400,
)
assert.equal(
  (
    await fetch(settingsUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ ...weekend, unexpected: true }),
    })
  ).status,
  400,
)
console.log(
  'PASS admin authentication, cross-site protection, and input validation',
)

await save(defaults)
assert.deepEqual(sectionIds(await homepage()), [
  'events',
  'accommodation',
  'travel',
  'rsvp',
  'gifts',
  'faq',
])
const preview = await fetch(
  `${base}/admin/preview?${new URLSearchParams({ settings: JSON.stringify(weekend) })}`,
  { headers: { authorization } },
)
const previewHtml = await preview.text()
assert.equal(preview.status, 200)
assert.deepEqual(sectionIds(previewHtml), [
  'events',
  'getting-around',
  'travel',
  'explore',
])
assert(previewHtml.includes('Preview only'))
assert.deepEqual(
  sectionIds(await homepage()),
  ['events', 'accommodation', 'travel', 'rsvp', 'gifts', 'faq'],
  'Preview must not change public mode',
)
console.log('PASS original website and non-publishing weekend preview')

await save(weekend)
const persisted = await fetch(settingsUrl, { headers: { authorization } })
assert.deepEqual(await persisted.json(), weekend)
assert.match(persisted.headers.get('cache-control'), /no-store/)
let html = await homepage()
assert.deepEqual(sectionIds(html), [
  'events',
  'getting-around',
  'travel',
  'explore',
])
assert(html.includes('tel:+39057820178'))
assert(html.includes('cars may be left overnight'))
assert(
  html.includes('6:00 PM') &&
    html.includes('4:00 PM') &&
    html.includes('Midnight (into Saturday)') &&
    html.includes('1:00 PM') &&
    html.includes('7:00 PM'),
)
assert(!html.includes('href="#rsvp"'))
assert(!html.includes('View more travel details in our FAQ'))
console.log(
  'PASS saved mode is reflected on fresh public visits with schedule, taxi, and parking',
)

const minimal = {
  mode: 'weekend',
  showTravel: false,
  showExplore: false,
  showAccommodation: false,
  showRsvp: false,
  showGifts: false,
  showFaq: false,
}
await save(minimal)
assert.deepEqual(sectionIds(await homepage()), ['events', 'getting-around'])
const all = Object.fromEntries(
  Object.keys(minimal).map((key) => [key, key === 'mode' ? 'weekend' : true]),
)
await save(all)
assert.deepEqual(sectionIds(await homepage()), [
  'events',
  'getting-around',
  'travel',
  'explore',
  'accommodation',
  'rsvp',
  'gifts',
  'faq',
])
await save(defaults)
assert.deepEqual(sectionIds(await homepage()), [
  'events',
  'accommodation',
  'travel',
  'rsvp',
  'gifts',
  'faq',
])
console.log('PASS optional sections and switching back to original website')
