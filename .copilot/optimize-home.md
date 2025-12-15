# HOME PAGE UI/UX INSTRUCTION (AMC‑STYLE)

## 1. UI GOAL
Redesign the Home page UI to follow a **premium cinematic layout** similar to AMC Theatres:
- Large hero slider with full‑width images
- Multiple horizontal carousels
- Clear visual hierarchy
- Whitespace and spacing for easy scanning
- Consistent card layout across sections
- Smooth hover and transitions
- Responsive mobile/tablet/desktop layout
## 2. HERO (BANNER) RULES
- Full screen width
- High‑quality images
- Overlay text with clear contrast
- Simple title + optional subtitle
- Consistent spacing from edges
- Navigation dots + arrows visible + accessible

Hero must use brand color accents (e.g., white text + blue highlight)
## 3. CAROUSEL / SLIDER RULES
All carousels must:
- Span full width of container (max‑width 1200px)
- Be horizontally scrollable
- Responsive breakpoints:
  - Desktop: 4 cards
  - Tablet: 2 cards
  - Mobile: 1 card
- Navigation UI:
  - Dots or arrows with hover effects
  - Arrows semi‑transparent circles
  - Dots spacing consistent
- Smooth transitions (duration 300ms)
- No abrupt snapping
## 4. CARD DESIGN (AMC STYLE, PREMIUM)

### 4.1 Poster Image
- Full width
- Maintain aspect ratio (3:4 or standard poster ratio)
- Hover scale: 1.03 → 1.05
- Subtle gradient overlay on hover

### 4.2 Title & Meta Hierarchy
- Title: bold, large readable, line‑clamp 2
- Meta info: smaller, lighter color
- Use spacing: 8px (tight), 16px (sections), 24px (blocks)

### 4.3 Action Buttons
- Visible and prominent
- Full width or large touch target
- Brand color `--color‑blue‑normal`
- Hover → `--color‑blue‑normalHover`
- Transition: 200–300ms
## 5. SPECIFIC CARD RULES

### MovieCard
- Poster top
- Title under poster
- Meta info + release date
- Description line‑clamp 3
- Action button: "Book Now"
- Consistent spacing

### NewsCard
- Image top
- Title below
- Optional label (e.g., “News”)
- Hover scale + shadow

### ShopItemCard
- Product image top
- Badge (optional) at top right
- Title centered
- Price emphasized
- Action button below price
## 6. RESPONSIVE RULES

### Desktop
- Carousel shows 3–4 items
- Spacing wide
- Whitespace generous

### Tablet
- 2 items
- Reduced text size slightly
- Spacing consistent

### Mobile
- 1 item
- Full width card
- Action buttons easily tappable
## 7. SPACING RULES
Use spacing scale:
4px / 8px / 12px / 16px / 24px / 32px / 48px

Card padding:
- Small: 8px
- Medium: 16px
- Large section gap: 24px

## 8. TYPOGRAPHY RULES
- Section titles: font‑bungee, uppercase optional
- Card title: bold, semibold
- Meta info: smaller, gray
- Body text: normal
- Avoid small text <12px
## 9. COLOR RULES
Use theme tokens only:
--color‑blue‑normal
--color‑blue‑normalHover
--color‑blue‑normalActive
--color‑blue‑light
--color‑yellow‑normal
--color‑red‑normal
Buttons: brand blue primary

## 10. LOADING & EMPTY STATES
- Skeleton cards for loading
- Empty state with centered message
- No raw text “Loading…”
- Use spinner icon or rectangle skeleton
## 11. PERFORMANCE RULES
- Lazy load images
- Memoize cards & slider
- Avoid rerender whole page
- Virtualize only if list is too long

## 12. VALIDATION CHECKLIST
✔ Cards aligned  
✔ Hover smooth  
✔ Spacing consistent  
✔ Colors according to brand  
✔ Buttons visible  
✔ Images lazy loaded  
✔ Responsive breakpoints correct

**The UI should feel like a premium cinema experience — clean, spaced, balanced, and intuitive.**
