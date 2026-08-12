import React, { useState } from 'react';
import { FolderNode } from '../types/notes.types';
import {
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
} from 'lucide-react';

export interface FolderTreeProps {
  folders: FolderNode[];
  selectedFolderId: string;
  onSelectFolder: (folderId: string) => void;
  onAddFolder: (parentId?: string) => void;
  onRenameFolder: (folderId: string, newName: string) => void;
  onDeleteFolder: (folderId: string) => void;
}

export const FolderTree: React.FC<FolderTreeProps> = ({
  folders,
  selectedFolderId,
  onSelectFolder,
  onAddFolder,
  onRenameFolder,
  onDeleteFolder,
}) => {
  const [expandedFolderIds, setExpandedFolderIds] = useState<Record<string, boolean>>({
    f_sem3: true,
    f_dbms: true,
  });

  const [contextMenu, setContextMenu] = useState<{ id: string; x: number; y: number } | null>(null);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedFolderIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderFolderNode = (node: FolderNode, level: number = 0) => {
    const isExpanded = !!expandedFolderIds[node.id];
    const isSelected = selectedFolderId === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="space-y-0.5">
        <div
          onClick={() => onSelectFolder(node.id)}
          onContextMenu={(e) => {
            e.preventDefault();
            setContextMenu({ id: node.id, x: e.clientX, y: e.clientY });
          }}
          style={{ paddingLeft: `${level * 14 + 10}px` }}
          className={`group flex items-center justify-between py-1.5 pr-2 rounded-xl text-xs font-mono cursor-pointer transition-all ${
            isSelected
              ? 'bg-[#7C5CFC]/20 text-white font-bold border border-[#7C5CFC]/40'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            {hasChildren ? (
              <button
                onClick={(e) => toggleExpand(node.id, e)}
                className="p-0.5 text-zinc-500 hover:text-white"
              >
                {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
              </button>
            ) : (
              <span className="w-3.5" />
            )}

            {isExpanded ? (
              <FolderOpen className="h-3.5 w-3.5 text-[#7C5CFC] shrink-0" />
            ) : (
              <Folder className="h-3.5 w-3.5 text-zinc-500 group-hover:text-zinc-300 shrink-0" />
            )}

            <span className="truncate">{node.name}</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] text-zinc-500 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
              {node.notesCount}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setContextMenu({ id: node.id, x: e.clientX, y: e.clientY });
              }}
              className="opacity-0 group-hover:opacity-100 p-0.5 text-zinc-500 hover:text-white"
            >
              <MoreVertical className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Recursive Children */}
        {hasChildren && isExpanded && (
          <div className="space-y-0.5">
            {node.children!.map((child) => renderFolderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-3 relative">
      <div className="flex items-center justify-between px-2 text-xs font-mono font-bold text-zinc-400">
        <span>Folder Directory</span>
        <button
          onClick={() => onAddFolder()}
          className="p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#7C5CFC]"
          title="New Folder"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="space-y-0.5 max-h-[500px] overflow-y-auto pr-1">
        {folders.map((f) => renderFolderNode(f, 0))}
      </div>

      {/* Right Click Context Menu */}
      {contextMenu && (
        <div
          onClick={() => setContextMenu(null)}
          className="fixed inset-0 z-50 bg-transparent"
        >
          <div
            style={{ top: contextMenu.y, left: contextMenu.x }}
            className="absolute w-44 rounded-xl border border-zinc-800 bg-zinc-950 p-1.5 shadow-2xl space-y-0.5 text-xs font-mono z-50"
          >
            <button
              onClick={() => onAddFolder(contextMenu.id)}
              className="w-full p-1.5 rounded-lg hover:bg-zinc-900 text-left text-zinc-300 hover:text-white flex items-center gap-2"
            >
              <Plus className="h-3.5 w-3.5 text-[#7C5CFC]" /> New Subfolder
            </button>
            <button
              onClick={() => {
                const name = prompt('Enter new folder name:');
                if (name) onRenameFolder(contextMenu.id, name);
              }}
              className="w-full p-1.5 rounded-lg hover:bg-zinc-900 text-left text-zinc-300 hover:text-white flex items-center gap-2"
            >
              <Edit2 className="h-3.5 w-3.5 text-amber-400" /> Rename
            </button>
            <button
              onClick={() => onDeleteFolder(contextMenu.id)}
              className="w-full p-1.5 rounded-lg hover:bg-rose-950/40 text-left text-rose-400 flex items-center gap-2"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
