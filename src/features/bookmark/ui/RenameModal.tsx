import { useEffect } from 'react';
import { PortalModal } from '@/shared/ui';
import { useUncontrolledInput } from '@/shared';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialValue: string;
  onSave: (newValue: string) => void;
};

export const RenameModal = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
}: Props) => {
  const { ref, getValue, focus } = useUncontrolledInput(initialValue);

  useEffect(() => {
    if (isOpen) focus();
  }, [isOpen, focus]);

  const handleSave = () => {
    const value = getValue();
    if (value.trim()) {
      onSave(value);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
  };

  return (
    <PortalModal
      isOpen={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1a1c22] border border-white/10 p-6 rounded-2xl w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
        <h3 className="text-lg font-bold text-white mb-4">지명 변경</h3>

        <input
          type="text"
          autoFocus
          ref={ref}
          defaultValue={initialValue}
          onKeyDown={handleKeyDown}
          className="w-full bg-[#2c2f38] text-white px-4 py-3 rounded-xl outline-none border border-white/10 focus:border-white/40 mb-6"
          placeholder="새로운 이름을 입력하세요"
        />

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg transition cursor-pointer">
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition cursor-pointer">
            저장
          </button>
        </div>
      </div>
    </PortalModal>
  );
};
