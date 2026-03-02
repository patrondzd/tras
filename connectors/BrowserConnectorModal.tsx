/**
 * BrowserConnectorModal Component 🌐
 * ===================================
 * 
 * نموذج إعداد موصل المتصفح - مثل Manus تماماً
 * يظهر عندما يحاول المستخدم تفعيل المتصفح وهو غير متصل
 * 
 * الميزات:
 * - شرح واضح لسبب الحاجة للإضافة
 * - زر "+ Connecter" لتثبيت الإضافة
 * - فيديو تعليمي (اختياري)
 * - إغلاق تلقائي عند اكتشاف الاتصال
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor,
  Chrome,
  Download,
  ExternalLink,
  CheckCircle2,
  Loader2,
  X,
  Play,
  Globe,
  Shield,
  Zap,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';

interface BrowserConnectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnected?: () => void;
  browserStatus: 'connected' | 'disconnected' | 'checking';
}

export const BrowserConnectorModal: React.FC<BrowserConnectorModalProps> = ({
  isOpen,
  onClose,
  onConnected,
  browserStatus
}) => {
  const [isWaitingForConnection, setIsWaitingForConnection] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // مسار الإضافة للتحميل اليدوي
  const extensionPath = 'barbaros-browser-extension/dist';
  
  // رابط Chrome Web Store (عند النشر)
  const chromeStoreUrl = '#'; // سيتم تحديثه بعد النشر

  // إغلاق تلقائي عند اكتشاف الاتصال
  useEffect(() => {
    if (browserStatus === 'connected' && isWaitingForConnection) {
      // تأخير بسيط لإظهار رسالة النجاح
      const timer = setTimeout(() => {
        onConnected?.();
        onClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [browserStatus, isWaitingForConnection, onConnected, onClose]);

  const handleConnect = () => {
    setIsWaitingForConnection(true);
    // فتح صفحة الإضافات في Chrome
    window.open('chrome://extensions/', '_blank');
  };

  const copyPath = () => {
    navigator.clipboard.writeText(extensionPath);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[#1e1e1e] rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden"
        >
          {/* Header with gradient */}
          <div className="relative bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-6 py-5 border-b border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Chrome size={28} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">موصل المتصفح</h2>
                  <p className="text-gray-400 text-sm">Browser Connector</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* حالة الاتصال الناجح */}
            {browserStatus === 'connected' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 size={48} className="text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">تم الاتصال بنجاح! ✓</h3>
                <p className="text-gray-400">المتصفح جاهز للتحكم بواسطة Barbaros</p>
              </motion.div>
            ) : isWaitingForConnection ? (
              /* حالة انتظار الاتصال */
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Loader2 size={48} className="text-blue-400 animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">في انتظار الاتصال...</h3>
                <p className="text-gray-400 mb-6">
                  اتبع الخطوات أدناه لتثبيت الإضافة
                </p>
                
                {/* خطوات التثبيت */}
                <div className="bg-[#252525] rounded-xl p-4 text-right space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center flex-shrink-0">1</div>
                    <p className="text-gray-300 text-sm">افتح <code className="bg-gray-700 px-2 py-0.5 rounded">chrome://extensions/</code></p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center flex-shrink-0">2</div>
                    <p className="text-gray-300 text-sm">فعّل "وضع المطور" (Developer mode)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center flex-shrink-0">3</div>
                    <p className="text-gray-300 text-sm">اضغط "Load unpacked" واختر:</p>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-2 mt-2">
                    <code className="text-blue-400 text-xs flex-1 truncate">{extensionPath}</code>
                    <button
                      onClick={copyPath}
                      className="text-gray-400 hover:text-white p-1"
                    >
                      {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                <p className="text-gray-500 text-sm mt-4">
                  سيتم اكتشاف الاتصال تلقائياً...
                </p>
              </div>
            ) : (
              /* الحالة الافتراضية - غير متصل */
              <>
                {/* الوصف */}
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  قم بتثبيت إضافة Barbaros للمتصفح لمساعدة وكيلك
                  في الوصول إلى المواقع التي تتطلب تسجيل الدخول
                  أو تتميز بأمان معزز.
                </p>

                {/* الميزات */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-[#252525] rounded-xl p-3 text-center">
                    <Globe size={24} className="mx-auto mb-2 text-blue-400" />
                    <p className="text-gray-400 text-xs">تصفح أي موقع</p>
                  </div>
                  <div className="bg-[#252525] rounded-xl p-3 text-center">
                    <Shield size={24} className="mx-auto mb-2 text-green-400" />
                    <p className="text-gray-400 text-xs">آمن ومشفر</p>
                  </div>
                  <div className="bg-[#252525] rounded-xl p-3 text-center">
                    <Zap size={24} className="mx-auto mb-2 text-yellow-400" />
                    <p className="text-gray-400 text-xs">تحكم فوري</p>
                  </div>
                </div>

                {/* المتصفحات المدعومة */}
                <p className="text-gray-500 text-sm text-center mb-4">
                  يعمل مع Chrome و Edge و Brave و Arc
                </p>

                {/* زر الاتصال */}
                <button
                  onClick={handleConnect}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Download size={20} />
                  <span>+ تثبيت الإضافة</span>
                </button>

                {/* فيديو تعليمي */}
                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className="w-full mt-3 py-3 text-gray-400 hover:text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <Play size={16} />
                  <span className="text-sm">شاهد فيديو التثبيت</span>
                </button>

                {showVideo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 rounded-xl overflow-hidden bg-black"
                  >
                    {/* Placeholder للفيديو */}
                    <div className="aspect-video bg-gray-800 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Play size={48} className="mx-auto mb-2 opacity-50" />
                        <p className="text-sm">فيديو تعليمي قريباً</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-[#181818] border-t border-gray-700/50">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-gray-500">النوع:</span>
                <span className="text-gray-300">إضافة متصفح</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">المطور:</span>
                <span className="text-gray-300">Barbaros AI</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BrowserConnectorModal;
