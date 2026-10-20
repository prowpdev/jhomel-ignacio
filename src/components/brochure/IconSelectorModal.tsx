import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { ICON_MAP } from './ServiceIcon';

interface IconSelectorModalProps {
  isOpen: boolean;
  selectedIcon: string;
  onSelect: (iconName: string) => void;
  onClose: () => void;
}

export const IconSelectorModal: React.FC<IconSelectorModalProps> = ({
  isOpen,
  selectedIcon,
  onSelect,
  onClose,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const availableIcons = Object.keys(ICON_MAP);
  const filtered = availableIcons.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#12131A] border border-black/10 dark:border-white/10 rounded-xl max-w-lg w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Select Service Icon
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Pick an icon that best represents this service offering
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-white rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-black/20">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search icons (e.g. Code, Shop, Globe, Database)..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-white dark:bg-[#1A1C24] border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:border-accent"
              autoFocus
            />
          </div>
        </div>

        {/* Icon Grid */}
        <div className="p-4 overflow-y-auto grid grid-cols-4 sm:grid-cols-6 gap-2.5">
          {filtered.map((iconName) => {
            const IconComponent = ICON_MAP[iconName];
            const isSelected = selectedIcon === iconName;

            return (
              <button
                key={iconName}
                type="button"
                onClick={() => {
                  onSelect(iconName);
                  onClose();
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all ${
                  isSelected
                    ? 'border-accent bg-accent/10 text-accent font-semibold shadow-xs'
                    : 'border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.03] dark:hover:bg-white/[0.04] text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <IconComponent size={22} className="mb-1.5" />
                <span className="text-[10px] truncate max-w-full font-mono">
                  {iconName}
                </span>
              </button>
            );
          })}

          {filtered.length === 0 && (
            <div className="col-span-full py-8 text-center text-xs text-zinc-500">
              No icons found matching "{search}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-black/20 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
