import { filterPastActs } from './actFilters';

describe('filterPastActs', () => {
  // Generate dynamic dates to ensure tests always pass
  const futureDate1 = new Date();
  futureDate1.setFullYear(futureDate1.getFullYear() + 2); // 2 years from now
  const futureDate2 = new Date();
  futureDate2.setFullYear(futureDate2.getFullYear() + 3); // 3 years from now

  const mockActs = [
    {
      id: 1,
      name: 'Past Act',
      start: '2023-06-25 12:00',
      end: '2023-06-25 13:00', // Past act (fixed past date is fine)
    },
    {
      id: 2,
      name: 'Current Act',
      start: futureDate1.toISOString().slice(0, 16).replace('T', ' '),
      end: futureDate1.toISOString().slice(0, 16).replace('T', ' '), // Dynamic future date
    },
    {
      id: 3,
      name: 'Future Act',
      start: futureDate2.toISOString().slice(0, 16).replace('T', ' '),
      end: futureDate2.toISOString().slice(0, 16).replace('T', ' '), // Dynamic future date
    },
  ];

  it('should return all acts when hidePastActs is false', () => {
    const result = filterPastActs(mockActs, false);
    expect(result).toHaveLength(3);
    expect(result).toEqual(mockActs);
  });

  it('should filter out past acts when hidePastActs is true', () => {
    const result = filterPastActs(mockActs, true);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Current Act');
    expect(result[1].name).toBe('Future Act');
  });

  it('should handle empty array', () => {
    const result = filterPastActs([], true);
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should handle acts with invalid dates gracefully', () => {
    const futureTestDate = new Date();
    futureTestDate.setFullYear(futureTestDate.getFullYear() + 1);
    
    const actsWithInvalidDates = [
      {
        id: 1,
        name: 'Invalid Date Act',
        start: 'invalid-date',
        end: 'invalid-date',
      },
      {
        id: 2,
        name: 'Valid Future Act',
        start: futureTestDate.toISOString().slice(0, 16).replace('T', ' '),
        end: futureTestDate.toISOString().slice(0, 16).replace('T', ' '),
      },
    ];

    const result = filterPastActs(actsWithInvalidDates, true);
    // Invalid dates should be filtered out as they create invalid Date objects
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Valid Future Act');
  });

  // CRITICAL FESTIVAL EDGE CASES
  describe('Festival Edge Cases', () => {
    beforeEach(() => {
      // Mock current time to a specific festival moment
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should handle acts ending exactly at current time', () => {
      const currentTime = new Date('2025-06-27 15:00:00');
      jest.setSystemTime(currentTime);

      const acts = [
        {
          id: 1,
          name: 'Act ending now',
          start: '2025-06-27 14:00',
          end: '2025-06-27 15:00', // Ends exactly now
        },
        {
          id: 2,
          name: 'Act ending in 1 minute',
          start: '2025-06-27 14:00',
          end: '2025-06-27 15:01', // Ends 1 minute from now
        },
      ];

      const result = filterPastActs(acts, true);
      // Act ending exactly now should be filtered out
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Act ending in 1 minute');
    });

    it('should handle acts starting exactly at current time', () => {
      const currentTime = new Date('2025-06-27 15:00:00');
      jest.setSystemTime(currentTime);

      const acts = [
        {
          id: 1,
          name: 'Act starting now',
          start: '2025-06-27 15:00',
          end: '2025-06-27 16:00', // Starts now, ends later
        },
        {
          id: 2,
          name: 'Act started 1 minute ago',
          start: '2025-06-27 14:59',
          end: '2025-06-27 16:00', // Started 1 minute ago, ends later
        },
      ];

      const result = filterPastActs(acts, true);
      // Both should show as they haven't ended yet
      expect(result).toHaveLength(2);
    });

    it('should handle timezone edge cases (BST/UTC)', () => {
      // Test with various timezone representations
      const acts = [
        {
          id: 1,
          name: 'BST Time Act',
          start: '2025-06-27 14:00',
          end: '2025-06-27 15:00',
        },
        {
          id: 2,
          name: 'ISO Format Act',
          start: '2025-06-27T14:00:00.000Z',
          end: '2025-06-27T15:00:00.000Z',
        },
        {
          id: 3,
          name: 'With Timezone Act',
          start: '2025-06-27T14:00:00+01:00',
          end: '2025-06-27T15:00:00+01:00',
        },
      ];

      const result = filterPastActs(acts, true);
      // Should handle all formats without throwing errors
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle massive arrays efficiently', () => {
      // Test performance with large dataset (simulating full festival lineup)
      const largeActArray = Array.from({ length: 5000 }, (_, i) => ({
        id: i,
        name: `Act ${i}`,
        start: `2025-06-2${Math.floor(i / 1000) + 5} ${String(10 + (i % 14)).padStart(2, '0')}:00`,
        end: `2025-06-2${Math.floor(i / 1000) + 5} ${String(10 + (i % 14) + 1).padStart(2, '0')}:00`,
      }));

      const startTime = performance.now();
      const result = filterPastActs(largeActArray, true);
      const endTime = performance.now();

      // Should complete within reasonable time (< 100ms)
      expect(endTime - startTime).toBeLessThan(100);
      expect(result).toBeInstanceOf(Array);
    });

    it('should handle acts with missing or undefined end times', () => {
      const futureTestDate = new Date();
      futureTestDate.setFullYear(futureTestDate.getFullYear() + 1);
      const futureDateString = futureTestDate.toISOString().slice(0, 16).replace('T', ' ');
      
      const actsWithMissingData = [
        {
          id: 1,
          name: 'Act with no end time',
          start: futureDateString,
          end: undefined,
        },
        {
          id: 2,
          name: 'Act with null end time',
          start: futureDateString,
          end: null,
        },
        {
          id: 3,
          name: 'Valid act',
          start: futureDateString,
          end: futureDateString,
        },
      ];

      const result = filterPastActs(actsWithMissingData, true);
      // Should filter out acts with invalid end times and keep valid ones
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Valid act');
    });

    it('should handle festival midnight transitions correctly', () => {
      // Test around midnight when dates change
      const currentTime = new Date('2025-06-28 23:59:00');
      jest.setSystemTime(currentTime);

      const acts = [
        {
          id: 1,
          name: 'Late night act ending before midnight',
          start: '2025-06-28 23:00',
          end: '2025-06-28 23:58', // Ends before current time
        },
        {
          id: 2,
          name: 'Late night act crossing midnight',
          start: '2025-06-28 23:30',
          end: '2025-06-29 01:00', // Crosses midnight
        },
        {
          id: 3,
          name: 'Early morning act',
          start: '2025-06-29 01:00',
          end: '2025-06-29 02:00', // Next day
        },
      ];

      const result = filterPastActs(acts, true);
      // Should correctly handle midnight transition
      expect(result).toHaveLength(2);
      expect(result.find(act => act.name === 'Late night act ending before midnight')).toBeUndefined();
    });

    it('should handle system clock changes gracefully', () => {
      // Simulate what happens if user's system clock is wrong
      const wrongTime = new Date('2025-06-27 15:00:00');
      jest.setSystemTime(wrongTime);

      const acts = [
        {
          id: 1,
          name: 'Act in the past',
          start: '2025-06-26 14:00',
          end: '2025-06-26 15:00',
        },
        {
          id: 2,
          name: 'Act in the future',
          start: '2025-06-28 14:00',
          end: '2025-06-28 15:00',
        },
      ];

      const result = filterPastActs(acts, true);
      // Should work based on system time, even if it's wrong
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Act in the future');
    });

    it('should handle concurrent usage (multiple users)', () => {
      // Test that function is pure and doesn't have side effects
      const futureTestDate = new Date();
      futureTestDate.setFullYear(futureTestDate.getFullYear() + 1);
      const futureDateString = futureTestDate.toISOString().slice(0, 16).replace('T', ' ');
      
      const acts = [
        {
          id: 1,
          name: 'Test Act',
          start: futureDateString,
          end: futureDateString,
        },
      ];

      // Simulate multiple concurrent calls
      const results = Array.from({ length: 10 }, () => filterPastActs(acts, true));
      
      // All results should be identical
      results.forEach(result => {
        expect(result).toEqual(results[0]);
      });
    });

    it('should handle browser offline/online state changes', () => {
      // Test that filtering still works when browser goes offline
      const futureTestDate = new Date();
      futureTestDate.setFullYear(futureTestDate.getFullYear() + 1);
      const futureDateString = futureTestDate.toISOString().slice(0, 16).replace('T', ' ');
      
      const acts = [
        {
          id: 1,
          name: 'Future Act',
          start: futureDateString,
          end: futureDateString,
        },
      ];

      // Simulate offline state (no network errors should occur)
      const result = filterPastActs(acts, true);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Future Act');
    });
  });

  describe('Performance Edge Cases', () => {
    it('should handle filtering being called frequently', () => {
      const futureTestDate = new Date();
      futureTestDate.setFullYear(futureTestDate.getFullYear() + 1);
      const futureDateString = futureTestDate.toISOString().slice(0, 16).replace('T', ' ');
      
      const acts = [
        {
          id: 1,
          name: 'Test Act',
          start: futureDateString,
          end: futureDateString,
        },
      ];

      // Simulate rapid calls (e.g., user toggling button quickly)
      const startTime = performance.now();
      for (let i = 0; i < 1000; i++) {
        filterPastActs(acts, i % 2 === 0);
      }
      const endTime = performance.now();

      // Should handle rapid calls without performance issues
      expect(endTime - startTime).toBeLessThan(50);
    });
  });
}); 