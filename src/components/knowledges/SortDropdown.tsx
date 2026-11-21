'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  value: string;
  onChange: (val: string) => void;
  options: SortOption[];
  label?: string;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  value,
  onChange,
  options,
  label = 'Urutkan:',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-2.5 self-start sm:self-auto" ref={dropdownRef}>
      {label && <span className="text-xs text-portal-muted font-medium select-none">{label}</span>}

      <div className="relative">
        {/* Custom Dropdown Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 select-none backdrop-blur-md border ${
            isOpen
              ? 'bg-purple-950/40 text-white border-purple-400/80 shadow-[0_0_15px_rgba(167,139,250,0.25)]'
              : 'bg-portal-card/90 hover:bg-portal-card border-portal-border hover:border-purple-400/50 text-slate-200 hover:text-white shadow-sm'
          }`}
        >
          {/* Sort icon and current value */}
          <div className="flex items-center gap-2">
            <svg
              className="w-3.5 h-3.5 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
            <span className="font-medium tracking-normal">{selectedOption.label}</span>
          </div>

          {/* Smooth animated chevron */}
          <svg
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-purple-300' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Custom Glassmorphic Dropdown Menu */}
        {isOpen && (
          <div
            role="listbox"
            className="absolute right-0 top-full mt-2 w-52 rounded-xl p-1.5 bg-[#0d0e24]/95 backdrop-blur-xl border border-white/[0.12] shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] z-40 flex flex-col gap-1 transition-all"
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 text-left ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-500/25 via-purple-500/15 to-transparent text-white border border-purple-400/40 shadow-sm font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent'
                  }`}
                >
                  <span className="truncate">{option.label}</span>

                  {isSelected && (
                    <svg
                      className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
