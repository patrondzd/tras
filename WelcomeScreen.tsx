// src/components/WelcomeScreen.tsx
// تحديث الجزء الرابع: شاشة ترحيب مخصصة لـ Barbaros

import React, { FC } from 'react';
import { FileText, Image, BarChart2, Plus } from 'lucide-react';
import { TaskInputBar } from './custom/TaskInputBar';
import { PlanBadge } from './custom/PlanBadge';

interface WelcomeScreenProps {
  onCreateWebsite?: () => void;
  onCreateSlides?: () => void;
  onWideResearch?: () => void;
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  showPreview?: boolean;
}

export const WelcomeScreen: FC<WelcomeScreenProps> = ({
  onCreateWebsite,
  onCreateSlides,
  onWideResearch,
  onSendMessage,
  isLoading,
  showPreview = false,
}) => {
  // عندما تكون المعاينة مفتوحة، حقل الإدخال ينزل للأسفل
  // عندما لا توجد معاينة، يبقى في الوسط (شاشة الترحيب الأولى فقط)
  
  if (showPreview) {
    // وضع المعاينة: حقل الإدخال فقط في الأسفل مع فراغ مناسب
    return (
      <div className="flex flex-col h-full justify-end px-4 pb-4">
        <div className="w-full">
          <TaskInputBar 
            onSendMessage={onSendMessage} 
            isLoading={isLoading}
            placeholder="Assign a task or ask a question..."
            showExtras={false}
          />
        </div>
      </div>
    );
  }

  // الوضع العادي: شاشة الترحيب مع حقل الإدخال في الوسط
  return (
    <div className="flex flex-col h-full px-8">
      {/* Plan Badge - يظهر في أعلى الصفحة */}
      {!showPreview && (
        <div className="flex justify-center pt-16">
          <PlanBadge 
            planName="Plan gratuit" 
            showUpgrade={true}
            onUpgrade={() => console.log('Upgrade clicked')}
          />
        </div>
      )}
      
      <div className="flex-1 flex items-center justify-center -mt-16">
      <div className="w-full max-w-4xl mx-auto space-y-8 text-center">

        {/* ================================================================== */}
        {/* --- العنوان المخصص لـ Barbaros - يختفي عند إظهار المعاينة --- */}
        {/* ================================================================== */}
        {!showPreview && (
          <h1 className="text-5xl font-light mb-8">
            <span className="text-white" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' }}>
              Welcome to
            </span>{' '}
            <span className="text-[#60a5fa] font-medium">
              Barbaros
            </span>
          </h1>
        )}
        {/* ================================================================== */}

        {/* حقل الإدخال الجديد - TaskInputBar - يبقى دائماً */}
        <TaskInputBar 
          onSendMessage={onSendMessage} 
          isLoading={isLoading}
          placeholder="Assign a task or ask a question..."
          showExtras={!showPreview}
        />

        {/* أزرار الاقتراحات - تختفي عند إظهار المعاينة */}
        {!showPreview && (
          <div className="flex justify-center gap-3 flex-wrap pt-2">
            <button 
              onClick={onCreateWebsite}
              className="btn-welcome-dark"
            >
              <FileText size={16} /> Créer un site web
            </button>
            <button 
              onClick={onCreateSlides}
              className="btn-welcome-dark"
            >
              <Image size={16} /> Créer des diapositives
            </button>
            <button 
              onClick={onWideResearch}
              className="btn-welcome-dark"
            >
              <BarChart2 size={16} /> Wide Research
            </button>
            <button className="btn-welcome-dark">
              <Plus size={16} /> Plus
            </button>
          </div>
        )}

        {/* البطاقة الترويجية - تختفي عند إظهار المعاينة */}
        {!showPreview && (
          <div className="bg-[#3A3A3A] text-white p-6 rounded-3xl text-left flex items-center gap-6 border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] mt-6">
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-1">Créez votre application web full-stack</h2>
              <p className="text-gray-400 text-sm">Construisez vos premières applications web natives à l'IA et déployez 1 trillion de tokens LLM.</p>
            </div>
            <div className="w-24 h-16 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg flex-shrink-0"></div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};
