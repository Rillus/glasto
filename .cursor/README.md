# Cursor AI Configuration for Glastonbury 2025 PWA

This directory contains AI instruction files that help Cursor understand the project context, coding standards, and specific requirements for the Glastonbury festival app.

## Files Overview

### `.cursorrules`
Main project rules file that Cursor automatically reads. Contains:
- Project context and architecture overview
- Code style standards (British English, TDD, React patterns)
- Festival-specific requirements (mobile-first, offline functionality)
- Testing guidelines (dynamic dates, mocked time)
- Performance and accessibility considerations

### `instructions.md`
Detailed technical implementation guide with:
- Specific code patterns and examples
- Data structures and state management
- Component implementation templates
- Testing patterns with code examples
- Error handling best practices
- Performance optimization techniques

## How These Help AI Development

### Context Awareness
- **Project Purpose**: AI understands this is a festival PWA, not just any React app
- **User Context**: Knows users are on mobile devices with poor connectivity
- **Critical Features**: Prioritises offline functionality, performance, battery life

### Code Quality
- **Consistent Patterns**: AI follows established patterns for hooks, components, filtering
- **British English**: All text, comments, and variable names use British spellings
- **TDD Approach**: AI writes tests first, focuses on edge cases

### Festival-Specific Knowledge
- **Time Handling**: Understands BST, midnight transitions, date filtering requirements
- **Mobile Priority**: Considers touch targets, responsive design, offline usage
- **Performance**: Optimises for festival conditions (poor network, low battery)

### Testing Excellence
- **Dynamic Dates**: AI never uses hardcoded future dates that will fail
- **Edge Cases**: Focuses on festival scenarios (midnight acts, timezone issues)
- **Comprehensive Coverage**: Tests performance, accessibility, offline functionality

## Usage Tips

### When AI Suggests Code
The AI will automatically:
- Use British English spellings (`colour`, `favourite`, `realise`)
- Follow TDD by suggesting tests first
- Consider mobile users and performance
- Handle edge cases (invalid dates, offline scenarios)
- Use established patterns (`useHidePastActs`, `filterPastActs`)

### Custom Prompts
You can reference these files in prompts:
```
"Follow the patterns in .cursorrules for adding a new feature"
"Use the testing patterns from instructions.md"
"Consider the festival context when optimising this component"
```

### Updating Instructions
When adding new features or patterns:
1. Update `.cursorrules` with high-level guidelines
2. Add specific implementation details to `instructions.md`
3. Include examples and common pitfalls
4. Test that AI follows the new patterns

## Example AI Behaviors

### ✅ Good AI Responses (Following Instructions)
- Suggests dynamic dates in tests: `futureDate.setFullYear(futureDate.getFullYear() + 2)`
- Uses British English: "optimise", "colour", "favourite"
- Considers mobile: "minimum 44px touch targets"
- Handles edge cases: "graceful degradation for invalid dates"
- Follows TDD: "Let's write the test first"

### ❌ Problematic AI Responses (Missing Context)
- Hardcoded future dates: `'2025-12-25'` (will fail after that date)
- American English: "optimize", "color", "favorite"
- Desktop-first: small touch targets, complex interactions
- Ignoring offline: assumes network connectivity
- Implementation-first: writing code before tests

## Benefits for Team Development

### Consistency
- All AI suggestions follow the same patterns and standards
- New team members get consistent guidance
- Code reviews focus on logic, not style/patterns

### Quality
- AI automatically considers festival-specific requirements
- Performance and accessibility built into suggestions
- Comprehensive testing coverage by default

### Efficiency
- Less time explaining project context to AI
- Faster development with pre-configured patterns
- Fewer bugs from missed edge cases

## Maintenance

### Regular Updates
- Review and update after major feature additions
- Add new patterns as they emerge
- Remove outdated guidance
- Keep examples current with latest dependencies

### Team Alignment
- Ensure all developers are aware of these files
- Update instructions based on team feedback
- Document exceptions or special cases
- Regular reviews of AI suggestion quality 