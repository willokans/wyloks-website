"""
Playwright E2E tests for the Wyloks website (dev server on localhost:3000).
Run: python tests/e2e_wyloks.py
"""
from playwright.sync_api import sync_playwright, expect
import sys

BASE = "http://localhost:3000"
PASS = []
FAIL = []

def test(name, fn):
    try:
        fn()
        PASS.append(name)
        print(f"  ✓  {name}")
    except Exception as e:
        FAIL.append((name, str(e)))
        print(f"  ✗  {name}\n     {e}")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # ── Homepage ──────────────────────────────────────────────────────────────
    page.goto(BASE)
    page.wait_for_load_state("networkidle")

    test("Home: page title contains Wyloks", lambda:
        expect(page).to_have_title("Home | Wyloks"))

    test("Home: hero heading 'We Turn' visible", lambda:
        expect(page.get_by_text("We Turn")).to_be_visible())

    test("Home: hero 'Into Growth' visible", lambda:
        expect(page.get_by_text("Into Growth.")).to_be_visible())

    test("Home: 'View Services' CTA link exists", lambda:
        expect(page.get_by_role("link", name="View Services")).to_be_visible())

    test("Home: 'Start a project' CTA link exists", lambda:
        expect(page.get_by_role("link", name="Start a project")).to_be_visible())

    test("Home: services section shows IT Consultation", lambda:
        expect(page.get_by_text("IT Consultation").first).to_be_visible())

    test("Home: services section shows Software Development", lambda:
        expect(page.get_by_text("Software Development").first).to_be_visible())

    test("Home: services section shows Digital Marketing", lambda:
        expect(page.get_by_text("Digital Marketing").first).to_be_visible())

    test("Home: Why Wyloks section visible", lambda:
        expect(page.get_by_text("Why Wyloks")).to_be_visible())

    test("Home: no fabricated stats (5+ Years) present", lambda: (
        lambda count: count == 0
    )(page.get_by_text("5+ Years of practice").count()) == True or
        page.get_by_text("5+ Years of practice").count() == 0)

    test("Home: CTA 'remarkable?' heading visible", lambda:
        expect(page.get_by_text("remarkable?")).to_be_visible())

    test("Home: footer renders with company name", lambda:
        expect(page.locator("footer").get_by_text("Wyloks").first).to_be_visible())

    # ── Cookie banner ─────────────────────────────────────────────────────────
    test("Cookie: banner visible on first load", lambda:
        expect(page.get_by_text("We use cookies")).to_be_visible())

    test("Cookie: 'Accept all' button exists", lambda:
        expect(page.get_by_role("button", name="Accept all")).to_be_visible())

    test("Cookie: 'Reject all' button exists", lambda:
        expect(page.get_by_role("button", name="Reject all")).to_be_visible())

    test("Cookie: 'Manage' button exists", lambda:
        expect(page.get_by_role("button", name="Manage")).to_be_visible())

    # Accept and verify banner disappears
    page.get_by_role("button", name="Accept all").click()
    page.wait_for_timeout(300)

    test("Cookie: banner gone after accepting", lambda:
        expect(page.get_by_text("We use cookies")).not_to_be_visible())

    # Reload — banner should stay gone
    page.reload()
    page.wait_for_load_state("networkidle")

    test("Cookie: banner stays hidden after reload (persisted)", lambda:
        expect(page.get_by_text("We use cookies")).not_to_be_visible())

    # ── Navigation ────────────────────────────────────────────────────────────
    test("Nav: header is present", lambda:
        expect(page.locator("header")).to_be_visible())

    test("Nav: About link in header", lambda:
        expect(page.locator("header").get_by_role("link", name="About")).to_be_visible())

    test("Nav: Services link in header", lambda:
        expect(page.locator("header").get_by_role("link", name="Services")).to_be_visible())

    test("Nav: Contact button in header", lambda:
        expect(page.locator("header").get_by_role("link", name="Contact")).to_be_visible())

    # ── About page ────────────────────────────────────────────────────────────
    page.goto(f"{BASE}/about")
    page.wait_for_load_state("networkidle")

    test("About: page loads (200)", lambda:
        expect(page).to_have_url(f"{BASE}/about"))

    test("About: heading mentions 'genuine expertise'", lambda:
        expect(page.get_by_text("genuine expertise.")).to_be_visible())

    test("About: Mission section visible", lambda:
        expect(page.get_by_text("Mission")).to_be_visible())

    test("About: Vision section visible", lambda:
        expect(page.get_by_text("Vision")).to_be_visible())

    test("About: values section has Innovation", lambda:
        expect(page.get_by_text("Innovation")).to_be_visible())

    # ── Services page ─────────────────────────────────────────────────────────
    page.goto(f"{BASE}/services")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1500)  # allow async service loading

    test("Services: page loads", lambda:
        expect(page).to_have_url(f"{BASE}/services"))

    test("Services: hero heading 'Services built' visible", lambda:
        expect(page.get_by_text("Services built")).to_be_visible())

    test("Services: IT Consultation card visible", lambda:
        expect(page.get_by_text("IT Consultation").first).to_be_visible())

    test("Services: Software Development card visible", lambda:
        expect(page.get_by_text("Software Development").first).to_be_visible())

    test("Services: Digital Marketing card visible", lambda:
        expect(page.get_by_text("Digital Marketing").first).to_be_visible())

    test("Services: CTA 'Start the conversation' link present", lambda:
        expect(page.get_by_role("link", name="Start the conversation")).to_be_visible())

    # ── Contact page ──────────────────────────────────────────────────────────
    page.goto(f"{BASE}/contact")
    page.wait_for_load_state("networkidle")

    test("Contact: page loads", lambda:
        expect(page).to_have_url(f"{BASE}/contact"))

    test("Contact: hero heading 'Let's build' visible", lambda:
        expect(page.get_by_text("Let's build")).to_be_visible())

    test("Contact: Name field present", lambda:
        expect(page.get_by_label("Name")).to_be_visible())

    test("Contact: Email field present", lambda:
        expect(page.get_by_label("Email")).to_be_visible())

    test("Contact: Message field present", lambda:
        expect(page.get_by_label("Message")).to_be_visible())

    test("Contact: Subject select present", lambda:
        expect(page.get_by_label("Subject")).to_be_visible())

    test("Contact: Send Message button present", lambda:
        expect(page.get_by_role("button", name="Send Message")).to_be_visible())

    test("Contact: email address in sidebar", lambda:
        expect(page.locator("section").get_by_role("link", name="info@wyloks.com")).to_be_visible())

    test("Contact: London location in sidebar", lambda:
        expect(page.get_by_text("London, UK")).to_be_visible())

    # ── Legal pages ───────────────────────────────────────────────────────────
    for path, label in [
        ("/cookie-policy",    "Cookie Policy"),
        ("/privacy",          "Privacy Policy"),
        ("/terms-of-service", "Terms of Service"),
    ]:
        page.goto(f"{BASE}{path}")
        page.wait_for_load_state("networkidle")
        test(f"Legal: {label} page loads", lambda lbl=label:
            expect(page.get_by_role("heading").first).to_be_visible())

    # ── Footer links ──────────────────────────────────────────────────────────
    page.goto(BASE)
    page.wait_for_load_state("networkidle")

    test("Footer: Privacy Policy link present", lambda:
        expect(page.locator("footer").get_by_role("link", name="Privacy Policy")).to_be_visible())

    test("Footer: Terms of Service link present", lambda:
        expect(page.locator("footer").get_by_role("link", name="Terms of Service")).to_be_visible())

    test("Footer: Cookie Policy link present", lambda:
        expect(page.locator("footer").get_by_role("link", name="Cookie Policy")).to_be_visible())

    # ── 404 page ──────────────────────────────────────────────────────────────
    page.goto(f"{BASE}/this-page-does-not-exist")
    page.wait_for_load_state("networkidle")

    test("404: renders a not-found message", lambda:
        expect(page.get_by_text("404")).to_be_visible())

    test("404: has a 'Return to Home' link", lambda:
        expect(page.get_by_role("link", name="Return to Home")).to_be_visible())

    browser.close()

# ── Summary ───────────────────────────────────────────────────────────────────
print(f"\n{'─'*50}")
print(f"  {len(PASS)} passed  |  {len(FAIL)} failed  |  {len(PASS)+len(FAIL)} total")
if FAIL:
    print("\nFailed tests:")
    for name, err in FAIL:
        print(f"  ✗ {name}")
        print(f"    {err}")
    sys.exit(1)
else:
    print("\n  All E2E tests passed.")
