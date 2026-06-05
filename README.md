# Apple UI Library

A comprehensive UI component library based on **Apple's Human Interface Guidelines**, with a clean Shopify-admin aesthetic. Every component is built as self-contained, copy-paste-ready HTML.

**🔗 Live demo:** https://talha020.github.io/apple-ui-library/

## What's inside

Hundreds of production-ready section components across 19 categories:

| Category | Category | Category |
| --- | --- | --- |
| Navigation | Hero | Features |
| Testimonials | Pricing | CTA |
| Blog | Contact | FAQ |
| Footer | Gallery | Login |
| Logos | Newsletter | Stats |
| Team | 404 | Other |

Plus standalone page examples and React versions:

- `LandingPage.html` — full landing page demo
- `AppleHIGDashboard.html` / `.jsx` — dashboard layout
- `BentoGrid.html` / `.jsx` — bento-style grid layout

## Structure

```
sections/
  navigation/   hero/        features/
  testimonials/ pricing/     cta/
  blog/         contact/     faq/
  footer/       gallery/     login/
  logos/        newsletter/  stats/
  team/         404/         other/
```

Each category folder contains numbered HTML files (e.g. `hero-001-025.html`), where each file holds a batch of component variations.

## Usage

Every component is plain HTML with inline styling, so there's no build step. Open any file in a browser to preview, then copy the markup you want into your own project.

## License

[MIT](LICENSE)
