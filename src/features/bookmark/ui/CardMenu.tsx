import { useState } from 'react';
import { MoreVertical, Edit2 } from 'lucide-react';
import { Dropdown } from '@/shared/ui';
import { RenameModal } from './RenameModal';
import { useBookmarkStore } from '@/entities/bookmark';
import toast from 'react-hot-toast';

type Props = {
  address: string;
  currentNickname: string;
};

export const CardMenu = ({ address, currentNickname }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateNickname = useBookmarkStore((state) => state.updateNickname);

  const handleSaveNickname = (newNickname: string) => {
    updateNickname(address, newNickname);
    setIsModalOpen(false);
    toast.success(`${currentNickname}이 ${newNickname}로 변경되었어요`);
  };

  return (
    <>
      <Dropdown className="absolute top-4 right-4">
        <Dropdown.Trigger asChild>
          <button className="p-1.5 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors outline-none focus:bg-white/10">
            <MoreVertical size={20} />
          </button>
        </Dropdown.Trigger>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setIsModalOpen(true)}>
            <Edit2 size={14} />
            <span>이름 변경</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <RenameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialValue={currentNickname}
        onSave={handleSaveNickname}
      />
    </>
  );
};
