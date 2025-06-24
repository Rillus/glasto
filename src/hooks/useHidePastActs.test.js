import { renderHook, act } from '@testing-library/react';
import useHidePastActs from './useHidePastActs';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Replace the global localStorage
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});

describe('useHidePastActs', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  it('should default to true when no localStorage value exists', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useHidePastActs());
    
    expect(result.current.hidePastActs).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('hidePastActs', 'true');
  });

  it('should use localStorage value when it exists', () => {
    localStorageMock.getItem.mockReturnValue('false');
    
    const { result } = renderHook(() => useHidePastActs());
    
    expect(result.current.hidePastActs).toBe(false);
  });

  it('should toggle the value and save to localStorage', () => {
    localStorageMock.getItem.mockReturnValue('true');
    
    const { result } = renderHook(() => useHidePastActs());
    
    expect(result.current.hidePastActs).toBe(true);
    
    act(() => {
      result.current.toggleHidePastActs();
    });
    
    expect(result.current.hidePastActs).toBe(false);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('hidePastActs', 'false');
  });

  it('should save initial value to localStorage', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    renderHook(() => useHidePastActs());
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('hidePastActs', 'true');
  });
}); 