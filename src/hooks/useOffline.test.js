import { renderHook, act } from '@testing-library/react';
import { useOffline } from './useOffline';

// Mock navigator.onLine
const mockNavigator = {
  onLine: true
};

Object.defineProperty(window, 'navigator', {
  value: mockNavigator,
  writable: true
});

describe('useOffline', () => {
  beforeEach(() => {
    // Reset navigator.onLine to true before each test
    mockNavigator.onLine = true;
  });

  it('should return false when online', () => {
    mockNavigator.onLine = true;
    const { result } = renderHook(() => useOffline());
    expect(result.current).toBe(false);
  });

  it('should return true when offline', () => {
    mockNavigator.onLine = false;
    const { result } = renderHook(() => useOffline());
    expect(result.current).toBe(true);
  });

  it('should update when online status changes', () => {
    mockNavigator.onLine = true;
    const { result, rerender } = renderHook(() => useOffline());
    
    expect(result.current).toBe(false);
    
    // Simulate going offline
    mockNavigator.onLine = false;
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    rerender();
    
    expect(result.current).toBe(true);
    
    // Simulate going back online
    mockNavigator.onLine = true;
    act(() => {
      window.dispatchEvent(new Event('online'));
    });
    rerender();
    
    expect(result.current).toBe(false);
  });
}); 