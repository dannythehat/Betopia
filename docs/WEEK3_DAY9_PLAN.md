# Week 3 Day 9: Bet History Timeline

**Date**: 2025-11-06  
**Goal**: Add chronological timeline view to dashboard for better bet history visualization

---

## 🎯 Objectives

1. Create visual timeline component showing bets chronologically
2. Group bets by date for better organization
3. Add timeline navigation and filtering
4. Enhance visual hierarchy with date separators
5. Improve mobile responsiveness

---

## ✅ Features to Implement

### 1. Timeline View Component
- **Date-grouped display**: Group bets by day/week/month
- **Visual timeline**: Left-side date markers with connecting lines
- **Chronological order**: Most recent first (default)
- **Compact cards**: Streamlined bet cards for timeline view

### 2. View Toggle
- **List View** (current): Full bet cards with all details
- **Timeline View** (new): Chronological with date grouping
- **Toggle button**: Switch between views seamlessly

### 3. Date Grouping Options
- **By Day**: Individual days (default)
- **By Week**: Week starting Monday
- **By Month**: Calendar months
- **Smart grouping**: Automatic based on date range

### 4. Enhanced Navigation
- **Jump to date**: Quick navigation to specific dates
- **Scroll indicators**: Show current position in timeline
- **Date range summary**: "Showing bets from X to Y"

---

## 📐 Design Specifications

### Timeline Layout
```
┌─────────────────────────────────────────┐
│  [List View] [Timeline View ✓]         │
├─────────────────────────────────────────┤
│                                         │
│  📅 Today - 6 Nov 2025                 │
│  ├─ Bet Card 1                         │
│  ├─ Bet Card 2                         │
│  └─ Bet Card 3                         │
│                                         │
│  📅 Yesterday - 5 Nov 2025             │
│  ├─ Bet Card 4                         │
│  └─ Bet Card 5                         │
│                                         │
│  📅 3 Nov 2025                         │
│  └─ Bet Card 6                         │
│                                         │
└─────────────────────────────────────────┘
```

### Timeline Styles
- **Date headers**: Sticky, prominent, with bet count
- **Timeline line**: Vertical line connecting date groups
- **Date badges**: Circular badges on timeline
- **Compact cards**: Reduced padding, essential info only

---

## 🔧 Implementation Steps

### Step 1: Add View Toggle UI
```html
<div class="view-toggle">
  <button class="view-btn active" data-view="list">📋 List View</button>
  <button class="view-btn" data-view="timeline">📅 Timeline View</button>
</div>
```

### Step 2: Create Timeline Grouping Function
```javascript
function groupBetsByDate(bets, groupBy = 'day') {
  // Group bets by day/week/month
  // Return: { date: string, bets: Bet[], count: number }[]
}
```

### Step 3: Render Timeline View
```javascript
function renderTimelineView(groupedBets) {
  // Render date headers with bet cards
  // Add timeline visual elements
  // Apply compact card styling
}
```

### Step 4: Add CSS for Timeline
```css
.timeline-container { /* Timeline-specific styles */ }
.timeline-date-group { /* Date group container */ }
.timeline-date-header { /* Sticky date header */ }
.timeline-line { /* Vertical connecting line */ }
.timeline-card { /* Compact bet card */ }
```

---

## 📊 Acceptance Criteria

- [ ] Timeline view toggle button functional
- [ ] Bets grouped by date correctly
- [ ] Date headers sticky on scroll
- [ ] Timeline visual elements render properly
- [ ] Compact cards show essential info
- [ ] Filters work in timeline view
- [ ] Mobile responsive (stacks properly)
- [ ] Smooth transitions between views
- [ ] Performance: <100ms render time for 50 bets

---

## 🧪 Testing Checklist

### Functional Tests
- [ ] Toggle between list and timeline views
- [ ] Date grouping works (day/week/month)
- [ ] Filters apply to timeline view
- [ ] Sorting works in timeline
- [ ] Empty state displays correctly
- [ ] Remove bet works in timeline

### Visual Tests
- [ ] Date headers sticky
- [ ] Timeline line connects properly
- [ ] Cards aligned correctly
- [ ] Mobile layout works
- [ ] Dark theme consistent

### Performance Tests
- [ ] Render 10 bets: <50ms
- [ ] Render 50 bets: <100ms
- [ ] Render 100 bets: <200ms
- [ ] Smooth scrolling
- [ ] No layout shifts

---

## 📝 Code Structure

### New Functions
1. `groupBetsByDate(bets, groupBy)` - Group bets chronologically
2. `renderTimelineView(groups)` - Render timeline layout
3. `renderTimelineCard(bet)` - Compact bet card for timeline
4. `toggleView(view)` - Switch between list/timeline
5. `getDateLabel(date)` - Format date labels (Today, Yesterday, etc.)

### Modified Functions
1. `renderDashboard()` - Add view mode handling
2. `filterAndSortBets()` - Ensure timeline compatibility

### New CSS Classes
1. `.view-toggle` - View switcher buttons
2. `.timeline-container` - Timeline wrapper
3. `.timeline-date-group` - Date group container
4. `.timeline-date-header` - Sticky date header
5. `.timeline-line` - Vertical timeline line
6. `.timeline-card` - Compact bet card

---

## 🎨 Visual Enhancements

### Date Labels
- **Today**: "📅 Today - 6 Nov 2025"
- **Yesterday**: "📅 Yesterday - 5 Nov 2025"
- **This Week**: "📅 Monday, 4 Nov 2025"
- **Older**: "📅 3 Nov 2025"

### Timeline Elements
- **Vertical line**: Subtle, connects date groups
- **Date badges**: Circular, on timeline
- **Hover effects**: Highlight on hover
- **Status indicators**: Color-coded dots

---

## 🚀 Future Enhancements (Not in Day 9)

- [ ] Infinite scroll for large datasets
- [ ] Virtual scrolling for performance
- [ ] Export timeline as image
- [ ] Share timeline link
- [ ] Timeline animations
- [ ] Collapsible date groups

---

## 📈 Success Metrics

- **User Engagement**: Timeline view usage >30%
- **Performance**: <100ms render for 50 bets
- **Mobile Usage**: Works on all screen sizes
- **Accessibility**: Keyboard navigation works

---

## 🔗 Related Files

- `backend/public/dashboard.html` - Main dashboard file
- `docs/WEEK3_DAY9_SUMMARY.md` - Day 9 completion summary (to be created)
- `STATUS.md` - Project status tracking

---

**Estimated Time**: 2-3 hours  
**Priority**: High  
**Complexity**: Medium

---

*Plan created: 2025-11-06*
