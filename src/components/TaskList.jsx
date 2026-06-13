import React, { useState } from 'react';
import { ClipboardList, CheckSquare, Square } from 'lucide-react';

export default function TaskList({ tasks }) {
  const [completedSteps, setCompletedSteps] = useState({});

  if (!tasks || tasks.length === 0) return null;

  const toggleStep = (id) => {
    setCompletedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 shadow-xl space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
        <ClipboardList className="h-5 w-5 text-brand-400" />
        <h3 className="text-lg font-semibold text-white tracking-tight">Cooking To-Do List</h3>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => {
          if (task.type === 'header') {
            return (
              <div key={task.id} className="pt-2 first:pt-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded">
                  {task.mealType}
                </span>
                <h4 className="text-sm font-semibold text-slate-200 mt-1.5">{task.text}</h4>
              </div>
            );
          }

          const isCompleted = !!completedSteps[task.id];

          return (
            <div
              key={task.id}
              onClick={() => toggleStep(task.id)}
              className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                isCompleted
                  ? 'bg-slate-800/20 border-slate-800/60 opacity-50'
                  : 'bg-slate-800/40 border-slate-700/30 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                className="shrink-0 mt-0.5 text-brand-400 focus:outline-none"
              >
                {isCompleted ? (
                  <CheckSquare className="h-4.5 w-4.5 fill-brand-500/20" />
                ) : (
                  <Square className="h-4.5 w-4.5" />
                )}
              </button>
              <div className="text-xs leading-relaxed text-slate-300">
                <span className="font-semibold text-slate-400 mr-1.5">Step {task.stepNum}:</span>
                <span className={isCompleted ? 'line-through text-slate-500' : ''}>
                  {task.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
